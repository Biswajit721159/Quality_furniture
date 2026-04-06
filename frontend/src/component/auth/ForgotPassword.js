import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../helpers/fromValidationCheckers";
import { toast } from "react-toastify";
import FullpageLoader from "../../common/FullpageLoader";
import { forgotPassword } from "../../utility/userApi";
import { FiMail, FiArrowLeft } from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) { toast.error("Invalid Email"); return; }
    try {
      setLoading(true);
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const response = await forgotPassword({ email, baseUrl });
      toast.success(response?.message);
      setSent(true);
    } catch (e) {
      toast.warn(e?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-brand rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl">🔑</span>
          </div>
          <h1 className="text-3xl font-bold text-stone-900">Forgot Password?</h1>
          <p className="text-stone-500 text-sm mt-1">
            {sent ? "Check your inbox for the reset link" : "Enter your email and we'll send a reset link"}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-stone-100 p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">📬</div>
              <h3 className="text-lg font-bold text-stone-800 mb-2">Email Sent!</h3>
              <p className="text-sm text-stone-500 mb-6">
                We sent a reset link to <strong>{email}</strong>. Check your spam folder if you don't see it.
              </p>
              <Link to="/Signin">
                <button className="px-6 py-2.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-light transition-all shadow-md">
                  Back to Login
                </button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-base pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-white text-base transition-all shadow-md
                  ${loading ? 'bg-stone-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-light hover:shadow-lg active:scale-95'}`}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}

          {!sent && (
            <>
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-stone-200" />
              </div>
              <Link to="/Signin" className="flex items-center justify-center gap-2 text-sm text-stone-500 hover:text-brand font-medium transition-colors">
                <FiArrowLeft size={16} />
                Back to Sign In
              </Link>
            </>
          )}
        </div>
      </div>

      <FullpageLoader open={loading} />
    </div>
  );
};

export default ForgotPassword;
