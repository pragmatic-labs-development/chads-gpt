'use client';

import { useState } from 'react';
import { useCart } from '../CartContext';

interface PrintifyVariant {
  id: number;
  title: string;
  price: number; // cents
  cost: number;  // cents (production cost — not used client-side)
  is_enabled: boolean;
  is_available: boolean;
}

interface PrintifyProduct {
  id: string;
  title: string;
  images: { src: string; is_default: boolean; position: string }[];
  variants: PrintifyVariant[];
}

interface Props {
  products: PrintifyProduct[];
  loading: boolean;
}

function ProductCard({ product }: { product: PrintifyProduct }) {
  const { addItem, setIsOpen } = useCart();
  const available = product.variants.filter(v => v.is_enabled && v.is_available);
  const [selectedVariantId, setSelectedVariantId] = useState(available[0]?.id ?? 0);

  const selectedVariant = available.find(v => v.id === selectedVariantId) ?? available[0];
  const image =
    product.images.find(i => i.is_default)?.src ||
    product.images.find(i => i.position === 'front')?.src ||
    product.images[0]?.src;

  const handleAdd = () => {
    if (!selectedVariant) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      productTitle: product.title,
      price: selectedVariant.price,
      quantity: 1,
      image: image ?? '',
    });
    setIsOpen(true);
  };

  return (
    <div className="product-card">
      <div className="product-img-link">
        {image ? (
          <img src={image} alt={product.title} className="product-img" />
        ) : (
          <div className="img-placeholder" />
        )}
      </div>
      <div className="product-info">
        <h3>{product.title}</h3>
        <div className="product-price">
          {selectedVariant ? `$${(selectedVariant.price / 100).toFixed(2)}` : '—'}
        </div>
        {available.length > 1 && (
          <select
            className="variant-select"
            value={selectedVariantId}
            onChange={e => setSelectedVariantId(Number(e.target.value))}
            aria-label="Select size"
          >
            {available.map(v => (
              <option key={v.id} value={v.id}>{v.title}</option>
            ))}
          </select>
        )}
        <button
          className="add-to-cart-btn"
          onClick={handleAdd}
          disabled={!selectedVariant}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="product-card">
      <div className="img-placeholder skeleton" />
      <div className="product-info">
        <div className="skeleton" style={{ height: '0.9rem', width: '70%', borderRadius: 4 }} />
        <div className="skeleton" style={{ height: '0.85rem', width: '30%', borderRadius: 4, marginTop: 4 }} />
      </div>
    </div>
  );
}

export default function ProductGrid({ products, loading }: Props) {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
        Products coming soon. Check back shortly.
      </p>
    );
  }

  return (
    <div className="product-grid">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
