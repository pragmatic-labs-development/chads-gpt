export default function SuccessPage() {
  return (
    <div style={{ textAlign: 'center', padding: '8rem 2rem', fontFamily: 'Barlow, sans-serif' }}>
      <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '2.5rem', color: '#003087', textTransform: 'uppercase', marginBottom: '1rem' }}>
        Order Confirmed!
      </h1>
      <p style={{ color: '#5a5a6a', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Chad appreciates your confidence in wearing AI opinions loudly.<br />
        Your shirt is on its way. Check your email for confirmation.
      </p>
      <a
        href="/"
        style={{
          display: 'inline-block',
          background: '#003087',
          color: '#fff',
          fontFamily: 'Barlow Condensed, sans-serif',
          fontWeight: 800,
          fontSize: '1rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          padding: '0.8rem 2rem',
          borderRadius: '6px',
          textDecoration: 'none',
        }}
      >
        Back to Shop
      </a>
    </div>
  );
}
