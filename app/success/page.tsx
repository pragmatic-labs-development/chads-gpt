export default function SuccessPage() {
  return (
    <div className="success-page">
      <div className="success-icon">🎉</div>
      <div className="success-tag">Order Confirmed</div>
      <h1>Your Opinion<br />Is Shipping.</h1>
      <p>
        Chad is proud of you. Your shirt is on its way —<br />
        wear it loudly and without apology.<br />
        Check your email for tracking info.
      </p>
      <a href="/" className="cta-btn cta-large">
        Back to Shop
      </a>
    </div>
  );
}
