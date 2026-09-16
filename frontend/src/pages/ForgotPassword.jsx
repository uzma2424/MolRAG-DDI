import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound } from "lucide-react";
import BackArrow from "../components/BackArrow";

// 3-step flow: request OTP -> verify OTP -> set new password.
// IMPORTANT: no OTP is actually generated or emailed — that needs a real
// backend endpoint + an email service (e.g. SendGrid/SES). See the inline notes.
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  function requestOtp(e) {
    e.preventDefault();
    if (!email) return setError("Please enter your registered email.");
    setError("");
    // TODO: call a backend endpoint that generates an OTP, stores it with
    // an expiry, and emails it. Nothing is actually sent right now.
    setNote("Backend not connected yet — no OTP has actually been emailed.");
    setStep(2);
  }

  function verifyOtp(e) {
    e.preventDefault();
    if (!otp) return setError("Please enter the OTP.");
    setError("");
    // TODO: verify OTP + expiry against the backend.
    setStep(3);
  }

  function resetPassword(e) {
    e.preventDefault();
    if (!newPass || newPass !== confirmPass) {
      setError("Passwords must match and not be empty.");
      return;
    }
    // TODO: send the new password to the backend to update it securely (hashed).
    setError("");
    navigate("/login");
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <BackArrow />
      <h1 className="font-display text-3xl font-semibold text-clinical-navy mb-8">
        Reset Password
      </h1>

      <div className="card p-8 space-y-5">
        {note && <p className="text-xs text-severity-moderate">{note}</p>}

        {step === 1 && (
          <form onSubmit={requestOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-clinical-text mb-2">
                Registered Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-clinical-border
                           focus:outline-none focus:ring-2 focus:ring-clinical-teal text-sm"
              />
            </div>
            {error && <p className="text-sm text-severity-severe">{error}</p>}
            <button type="submit" className="btn-primary w-full justify-center">
              Send OTP <KeyRound className="w-4 h-4" />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={verifyOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-clinical-text mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-clinical-border
                           focus:outline-none focus:ring-2 focus:ring-clinical-teal text-sm font-mono"
              />
            </div>
            <button
              type="button"
              onClick={() => setNote("Resend not wired up yet — needs the same backend OTP endpoint.")}
              className="text-xs text-clinical-teal font-medium"
            >
              Resend OTP
            </button>
            {error && <p className="text-sm text-severity-severe">{error}</p>}
            <button type="submit" className="btn-primary w-full justify-center">
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={resetPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-clinical-text mb-2">New Password</label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-clinical-border
                           focus:outline-none focus:ring-2 focus:ring-clinical-teal text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-clinical-text mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-clinical-border
                           focus:outline-none focus:ring-2 focus:ring-clinical-teal text-sm"
              />
            </div>
            {error && <p className="text-sm text-severity-severe">{error}</p>}
            <button type="submit" className="btn-primary w-full justify-center">
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
