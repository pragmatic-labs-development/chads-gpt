'use client';

import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';

interface PrintifyProduct {
  id: string;
  title: string;
  images: { src: string; is_default: boolean; position: string }[];
  variants: { id: number; title: string; price: number; cost: number; is_enabled: boolean; is_available: boolean }[];
}

export default function Home() {
  const [products, setProducts] = useState<PrintifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div className="announce-bar">
        Free shipping on orders over $60 &nbsp;·&nbsp; Not affiliated with OpenAI. Not even a little. &nbsp;·&nbsp; New drops every season 🔥
      </div>

      {/* NAV */}
      <Nav />

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-tag">New Drop 🔥</div>
          <h1>Wear Your AI Opinions <span className="hero-accent">Loudly.</span></h1>
          <p className="subhead">
            Funny shirts for people who&apos;ve argued with a chatbot and lost. Also for people who won. You know who you are.
          </p>
          <a className="cta-btn cta-large" href="#shop">Shop the Collection</a>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div className="trust-inner">
          <div className="trust-item">
            <svg className="trust-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <strong>100% Cotton.</strong>
            <span>0% Hallucinations.</span>
          </div>
          <div className="trust-item">
            <svg className="trust-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
            </svg>
            <strong>Designed by a human.</strong>
            <span>Described to an AI. Printed by a robot.</span>
          </div>
          <div className="trust-item">
            <svg className="trust-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
            </svg>
            <strong>Ships in 5–7 business days.</strong>
            <span>Faster than most AI roadmaps.</span>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section className="shop" id="shop">
        <div className="shop-inner">
          <h2>The Collection</h2>
          <p className="section-sub">Six shirts. Infinite regrets. No refunds on irony.</p>
          <ProductGrid products={products} loading={loading} />
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-inner">
          <h2>The Chad&apos;s GPT Origin Story</h2>
          <p>
            Chad built this store after his fourth argument with a chatbot in a single week. The chatbot was wrong every time.
            Chad was also wrong, but with more confidence. <strong>Wear that energy.</strong>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo">
            <img src="/ChadGPT-Logo.png" alt="Chad's GPT" />
          </div>
          <div className="footer-links">
            <a href="#shop">Shop All</a>
            <a href="mailto:chad@chads-gpt.com">Contact</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="footer-payments">
            <svg className="pay-badge" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Visa"><rect width="38" height="24" rx="4" fill="#fff" stroke="#e0e0e0"/><path d="M16 7l-2.5 10h-2L14 7h2zm6.5 6.5c0-1-.6-1.7-1.8-2.3-.8-.4-1.2-.6-1.2-1 0-.3.4-.7 1.2-.7.7 0 1.2.1 1.6.3l.2.1.3-1.9c-.4-.2-1.1-.3-1.9-.3-2.1 0-3.5 1.1-3.5 2.7 0 1.2 1 1.8 1.8 2.2.8.4 1.1.7 1.1 1.1 0 .6-.7.9-1.3.9-.9 0-1.3-.1-2-.4l-.3-.1-.3 2c.5.2 1.4.4 2.3.4 2.2 0 3.6-1.1 3.6-2.8l.2-.2zM28 7h-1.6c-.5 0-.9.1-1.1.6L22.5 17h2.3l.5-1.3h2.8l.3 1.3H30L28 7zm-2.7 6.8l1.2-3.2.7 3.2h-1.9zM14 7l-3.2 7-.3-1.7c-.6-1.9-2.3-4-4.3-5l1.9 9H10.4L15.1 7H14z" fill="#1A1F71"/><path d="M8.2 7H4.1l-.1.2c3.1.8 5.2 2.7 6.1 5L9.1 7.6C9 7.1 8.7 7 8.2 7z" fill="#F7A600"/></svg>
            <svg className="pay-badge" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mastercard"><rect width="38" height="24" rx="4" fill="#fff" stroke="#e0e0e0"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/><path d="M19 6.8a7 7 0 010 10.4A7 7 0 0119 6.8z" fill="#FF5F00"/></svg>
            <svg className="pay-badge" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PayPal"><rect width="38" height="24" rx="4" fill="#fff" stroke="#e0e0e0"/><path d="M15.2 8h3.6c2 0 2.8 1 2.5 2.6-.4 2-1.8 3-3.7 3h-1l-.6 3.4H14l1.2-9zm1.3 4.2h.8c.9 0 1.5-.5 1.6-1.3.1-.6-.2-1-.9-1h-.8l-.7 2.3z" fill="#003087"/><path d="M21.5 8h3.6c2 0 2.8 1 2.5 2.6-.4 2-1.8 3-3.7 3h-1l-.6 3.4h-1.9l1.1-9zm1.3 4.2h.8c.9 0 1.5-.5 1.6-1.3.1-.6-.2-1-.9-1h-.8l-.7 2.3z" fill="#009CDE"/></svg>
            <svg className="pay-badge" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Apple Pay"><rect width="38" height="24" rx="4" fill="#000"/><path d="M12.5 8.5c.4-.5.7-1.2.6-1.9-.6 0-1.3.4-1.7.9-.4.4-.7 1.1-.6 1.8.6.1 1.3-.3 1.7-.8zm.6 1c-.9-.1-1.7.5-2.2.5-.5 0-1.2-.5-2-.5-1 0-2 .6-2.5 1.5-1.1 1.8-.3 4.5.8 6 .5.7 1.1 1.5 1.9 1.5.7 0 1-.5 1.9-.5s1.1.5 1.9.5c.8 0 1.3-.7 1.8-1.5.6-.8.8-1.6.8-1.6s-1.5-.6-1.5-2.3c0-1.4 1.2-2.1 1.2-2.1s-.7-.9-2.1-1zM21 7.5h-2.2L17.5 17h1.4l.5-1.7h2.2l.5 1.7h1.4L21 7.5zm-1.4 6.5l.9-3 .9 3h-1.8zm5.2-3.8c-1.2 0-2.1 1-2.1 2.5 0 1.4.8 2.4 2 2.4.7 0 1.2-.3 1.5-.8v.7h1.2v-6.8H26v2.5c-.3-.3-.8-.5-1.2-.5zm.3 3.9c-.7 0-1.2-.6-1.2-1.5s.5-1.5 1.2-1.5 1.2.6 1.2 1.5-.5 1.5-1.2 1.5zm4.8-3.9c-1.2 0-2 .5-2 1.5 0 .9.6 1.3 1.6 1.5.9.2 1.1.4 1.1.7 0 .4-.4.6-.9.6-.6 0-1.1-.3-1.4-.7l-.7.8c.4.5 1.1.9 2 .9 1.2 0 2.1-.6 2.1-1.7 0-.9-.6-1.3-1.7-1.6-.8-.2-1-.4-1-.7 0-.3.3-.5.8-.5.5 0 .9.2 1.3.6l.7-.8c-.5-.5-1.2-.6-1.9-.6z" fill="#fff"/></svg>
            <svg className="pay-badge" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Google Pay"><rect width="38" height="24" rx="4" fill="#fff" stroke="#e0e0e0"/><path d="M18.4 12v2.3h3.6c-.1.9-.8 2.4-2.6 2.4-1.6 0-2.9-1.3-2.9-2.9s1.3-2.9 2.9-2.9c.9 0 1.5.4 1.8.7l1.3-1.2C21.6 9.6 20.2 9 18.5 9c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c2.8 0 4.7-2 4.7-4.7 0-.3 0-.6-.1-.9h-4.7z" fill="#4285F4"/><path d="M28 12.5h-1v-1h-1v1h-1v1h1v1h1v-1h1z" fill="#34A853"/></svg>
          </div>
          <p className="footer-legal">
            © 2026 Chad&apos;s GPT, a fictional Delaware C-Corp we haven&apos;t actually incorporated yet. &nbsp;·&nbsp; Chad&apos;s GPT is a work of parody and satire protected under the First Amendment of the United States Constitution and, we&apos;re told, several international equivalents Chad read a Medium post about. Chad&apos;s GPT is not affiliated with, endorsed by, sponsored by, tolerated by, or in any way known to OpenAI, Anthropic, Google DeepMind, Microsoft, Meta, Apple, Amazon, or any other organization that has ever retained legal counsel, filed a 10-K, or sent a cease-and-desist to someone who absolutely deserved it. &nbsp;·&nbsp; Chad&apos;s GPT makes no representations or warranties of any kind regarding the fit, feel, shrinkage, or emotional impact of any garment purchased through this site. Results may vary. No GPUs were harmed. Kyle ironed the shirts. For entertainment purposes only. This does not constitute fashion advice, though if it did, the advice would be: buy the shirt.
          </p>
        </div>
      </footer>

      {/* CART DRAWER */}
      <CartDrawer />
    </>
  );
}
