import "./Success.css";

export default function Success() {
  return (
    <div className="success-page">
      <h1>Thank you for your purchase! 🎉</h1>
      <p>Your payment was successful.</p>

      <a href="/" className="back-home">Return to home</a>
    </div>
  );
}
