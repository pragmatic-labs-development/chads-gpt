'use client';

import { useState } from 'react';
import { useCart } from '../CartContext';

export default function CartDrawer() {
  const { items, removeItem, isOpen, setIsOpen, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            productId: i.productId,
            variantId: i.variantId,
            quantity: i.quantity,
          })),
        }),
      });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (err) {
      setError('Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsOpen(false)} />
      <div className="cart-drawer" role="dialog" aria-label="Shopping cart">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={() => setIsOpen(false)} aria-label="Close cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            items.map(item => (
              <div key={`${item.productId}-${item.variantId}`} className="cart-item">
                {item.image ? (
                  <img src={item.image} alt={item.productTitle} className="cart-item-img" />
                ) : (
                  <div className="cart-item-img" />
                )}
                <div className="cart-item-details">
                  <div className="cart-item-title">{item.productTitle}</div>
                  <div className="cart-item-variant">{item.variantTitle} · Qty {item.quantity}</div>
                  <div className="cart-item-price">${((item.price * item.quantity) / 100).toFixed(2)}</div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.productId, item.variantId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            {error && <div className="cart-error">{error}</div>}
            <div className="cart-total">
              <span>Subtotal</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
            <button
              className="cta-btn checkout-btn"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? (
                <><span className="spinner" />Taking you to checkout…</>
              ) : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
