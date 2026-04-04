import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

interface CartItem {
  productId: string;
  variantId: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    let cart: CartItem[] = [];
    try {
      cart = JSON.parse(session.metadata?.cart || '[]');
    } catch {
      return NextResponse.json({ error: 'Invalid cart metadata' }, { status: 400 });
    }

    const shipping = session.shipping_details;
    if (cart.length === 0 || !shipping?.address) {
      return NextResponse.json({ received: true });
    }

    const address = shipping.address;
    const nameParts = (shipping.name || '').split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || firstName;

    await fetch(
      `https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/orders.json`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
          'Content-Type': 'application/json',
          'User-Agent': 'ChadGPT/1.0',
        },
        body: JSON.stringify({
          external_id: session.id,
          line_items: cart.map(item => ({
            product_id: item.productId,
            variant_id: item.variantId,
            quantity: item.quantity,
          })),
          shipping_method: 1, // Standard shipping
          send_shipping_notification: true,
          address_to: {
            first_name: firstName,
            last_name: lastName,
            email: session.customer_details?.email || '',
            phone: session.customer_details?.phone || '',
            country: address.country || '',
            region: address.state || '',
            address1: address.line1 || '',
            address2: address.line2 || '',
            city: address.city || '',
            zip: address.postal_code || '',
          },
        }),
      }
    );
  }

  return NextResponse.json({ received: true });
}
