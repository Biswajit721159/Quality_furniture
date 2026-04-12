import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  validateFullAddress,
  validateEmail,
  validateFullName,
  validatePassword,
  checkotp,
} from "../../helpers/fromValidationCheckers";
import { sendOTP, verifyOTP } from "../../utility/userApi";
import FullpageLoader from "../../common/FullpageLoader";
import { useSelector } from "react-redux";
import { FiUser, FiMail, FiLock, FiMapPin, FiEye, FiEyeOff, FiX } from "react-icons/fi";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [resentLoading, setResentLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendTimeout, setResendTimeout] = useState(0);
  const [open, setOpen] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(true);

  useEffect(() => {
    if (user) navigate("/");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword, address } = formData;
    if (!validateFullName(fullName) || !validateEmail(email) || !validatePassword(password) || !validateFullAddress(address)) return;
    if (password !== confirmPassword) { toast.error("Passwords do not match"); return; }
    try {
      setLoading(true);
      const response = await sendOTP(email);
      toast.success(response.message);
      setOpen(true);
      setResendTimeout(60);
      setResendEnabled(false);
    } catch (e) {
      toast.warn(e?.message);
    } finally {
      setLoading(false);
    }
  };

  async function reSendOTP() {
    try {
      setResentLoading(true);
      const response = await sendOTP(formData.email);
      toast.success(response.message);
      setResendTimeout(60);
      setResendEnabled(false);
    } catch (error) {
      toast.warn(error?.message);
    } finally {
      setResentLoading(false);
    }
  }

  async function OTPVerified(e) {
    e.preventDefault();
    try {
      if (!checkotp(otp)) return;
      setSubmitLoading(true);
      const response = await verifyOTP({ ...formData, otp });
      toast.success(response.message);
      navigate("/Signin");
    } catch (error) {
      toast.warn(error?.message);
    } finally {
      setSubmitLoading(false);
    }
  }

  useEffect(() => {
    if (resendTimeout > 0) {
      const timer = setTimeout(() => setResendTimeout(resendTimeout - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendEnabled(true);
    }
  }, [resendTimeout]);

  const inputField = (label, name, type, icon, placeholder, extra = {}) => (
    <div>
      <label className="block text-sm font-semibold text-stone-700 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">{icon}</span>
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="input-base pl-10"
          spellCheck={false}
          {...extra}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-brand rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl">🪑</span>
          </div>
          <h1 className="text-3xl font-bold text-stone-900">Create Account</h1>
          <p className="text-stone-500 text-sm mt-1">Join QUFurniture — it's free</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-card border border-stone-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            {inputField("Full Name", "fullName", "text", <FiUser size={17} />, "John Doe")}
            {inputField("Email Address", "email", "email", <FiMail size={17} />, "you@example.com")}

            {/* Password with toggle */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="input-base pl-10 pr-10"
                  spellCheck={false}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700">
                  {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                </button>
              </div>
            </div>

            {inputField("Confirm Password", "confirmPassword", "password", <FiLock size={17} />, "Re-enter password")}

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Delivery Address</label>
              <div className="relative">
                <FiMapPin className="absolute left-3.5 top-3 text-stone-400" size={17} />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full delivery address"
                  className="input-base pl-10 resize-none h-20"
                  spellCheck={false}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-white text-base transition-all shadow-md mt-2
                ${loading ? 'bg-stone-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-light hover:shadow-lg active:scale-95'}`}
            >
              {loading ? "Sending OTP..." : "Create Account"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400 font-medium">Already have an account?</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <Link to="/Signin" className="block text-center text-sm font-bold text-brand hover:text-brand-light hover:underline transition-colors">
            Sign In here →
          </Link>
        </div>
      </div>

      <FullpageLoader open={loading} />

      {/* OTP Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative animate-fade-in">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-all"
            >
              <FiX size={18} />
            </button>

            <div className="text-center mb-6">
              <div className="text-4xl mb-3">📩</div>
              <h2 className="text-xl font-bold text-stone-900">Verify Your Email</h2>
              <p className="text-sm text-stone-500 mt-1">
                We sent a 6-digit OTP to <strong>{formData.email}</strong>
              </p>
            </div>

            <form onSubmit={OTPVerified} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">Enter OTP</label>
                <input
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="6-digit code"
                  className="input-base text-center text-xl tracking-[0.5em] font-bold"
                />
              </div>

              <button
                type="submit"
                disabled={submitLoading || resentLoading}
                onClick={OTPVerified}
                className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md
                  ${submitLoading ? 'bg-stone-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-light active:scale-95'}`}
              >
                {submitLoading ? "Verifying..." : "Verify & Register"}
              </button>

              <div className="text-center">
                {!resendEnabled && !loading ? (
                  <p className="text-sm text-stone-500">
                    Resend OTP in <strong className="text-brand">{resendTimeout}s</strong>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={reSendOTP}
                    disabled={submitLoading || resentLoading}
                    className="text-sm text-brand font-semibold hover:underline disabled:opacity-50 transition-all"
                  >
                    {resentLoading ? "Resending..." : "Resend OTP"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
