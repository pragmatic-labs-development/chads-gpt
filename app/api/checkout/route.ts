import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

interface CartItemRequest {
  productId: string;
  variantId: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { items } = (await req.json()) as { items: CartItemRequest[] };

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const apiKey = process.env.PRINTIFY_API_KEY;
  const shopId = process.env.PRINTIFY_SHOP_ID;
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://chads-gpt.com';

  // Verify prices server-side — never trust client-sent prices
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const item of items) {
    const res = await fetch(
      `https://api.printify.com/v1/shops/${shopId}/products/${item.productId}.json`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'User-Agent': 'ChadGPT/1.0',
        },
      }
    );
    if (!res.ok) continue;

    const product = await res.json();
    const variant = product.variants.find(
      (v: { id: number; is_enabled: boolean; is_available: boolean }) =>
        v.id === item.variantId && v.is_enabled && v.is_available
    );
    if (!variant) continue;

    const image =
      product.images.find((i: { is_default: boolean }) => i.is_default)?.src ||
      product.images[0]?.src;

    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${product.title} — ${variant.title}`,
          ...(image ? { images: [image] } : {}),
        },
        unit_amount: variant.price, // Printify prices are already in cents
      },
      quantity: item.quantity,
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json({ error: 'No valid items in cart' }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'NL', 'SE', 'NO'],
    },
    metadata: {
      cart: JSON.stringify(items),
    },
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/#shop`,
  });

  return NextResponse.json({ url: session.url });
}
