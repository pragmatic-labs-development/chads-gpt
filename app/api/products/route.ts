import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.PRINTIFY_API_KEY;
  const shopId = process.env.PRINTIFY_SHOP_ID;

  if (!apiKey || !shopId) {
    return NextResponse.json([], { status: 200 });
  }

  const res = await fetch(
    `https://api.printify.com/v1/shops/${shopId}/products.json?limit=20`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'User-Agent': "ChadGPT/1.0",
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return NextResponse.json([], { status: 200 });
  }

  const data = await res.json();
  // Printify wraps results in { data: [...] }
  return NextResponse.json(data.data ?? []);
}
