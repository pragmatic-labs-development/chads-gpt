import type { Metadata } from 'next';
import { CartProvider } from './CartContext';
import './globals.css';

export const metadata: Metadata = {
  title: "Chad's GPT — Funny AI T-Shirts",
  description:
    "Funny AI-themed t-shirts. Wear your opinions loudly. Ships in 5–7 business days. Faster than most AI roadmaps.",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: "Chad's GPT — Funny AI T-Shirts",
    description: "Wear your AI opinions loudly. Funny shirts for people who've argued with a chatbot.",
    url: 'https://chads-gpt.com/',
    type: 'website',
    images: [{ url: 'https://chads-gpt.com/ChadGPT-Logo.png' }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://chads-gpt.com/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800&family=Barlow:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
