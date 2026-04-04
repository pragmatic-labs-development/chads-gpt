'use client';

import { useState } from 'react';
import { useCart } from '../CartContext';

export default function Nav() {
  const { items, setIsOpen } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav>
        <a href="#" className="nav-logo">
          <img src="/ChadGPT-Logo.png" alt="Chad's GPT" />
        </a>
        <div className="nav-center">
          <a href="#shop" className="nav-link">Shop All</a>
          <a href="#shop" className="nav-link">New Arrivals</a>
          <a href="#about" className="nav-link">About</a>
        </div>
        <div className="nav-right">
          <button
            className="nav-hamburger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span />
            <span />
            <span />
          </button>
          <button
            className="nav-icon-btn"
            aria-label={`Cart${count > 0 ? ` (${count} items)` : ''}`}
            onClick={() => setIsOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {count > 0 && <span className="cart-count">{count}</span>}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#shop" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Shop All</a>
          <a href="#shop" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>New Arrivals</a>
          <a href="#about" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>About</a>
        </div>
      )}
    </>
  );
}
