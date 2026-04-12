import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../helpers/fromValidationCheckers";
import { toast } from "react-toastify";
import { login } from "../../utility/userApi";
import FullpageLoader from "../../common/FullpageLoader";
import { useDispatch, useSelector } from "react-redux";
import { usermethod } from "../../redux/UserSlice";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) navigate("/");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!validateEmail(email)) { toast.error("Invalid Email"); return; }
    if (!validatePassword(password)) { toast.error("Invalid Password"); return; }
    try {
      setLoading(true);
      const response = await login(formData);
      dispatch(usermethod.Add_User(response.data));
      navigate(-1);
      toast.success(response?.message);
    } catch (e) {
      toast.warn(e?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-brand rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl">🪑</span>
          </div>
          <h1 className="text-3xl font-bold text-stone-900">Welcome Back</h1>
          <p className="text-stone-500 text-sm mt-1">Sign in to your QUFurniture account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-card border border-stone-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input-base pl-10"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input-base pl-10 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded accent-brand cursor-pointer"
                />
                <span className="text-sm text-stone-600">Remember me</span>
              </label>
              <Link to="/ForgotPassword" className="text-sm text-brand hover:text-brand-light font-semibold hover:underline transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-white text-base transition-all shadow-md
                ${loading ? 'bg-stone-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-light hover:shadow-lg active:scale-95'}`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-stone-500">
            Don't have an account?{" "}
            <Link to="/Register" className="text-brand font-bold hover:text-brand-light hover:underline transition-colors">
              Create one free
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          By signing in, you agree to our Terms & Privacy Policy
        </p>
      </div>

      <FullpageLoader open={loading} />
    </div>
  );
};

export default Login;
