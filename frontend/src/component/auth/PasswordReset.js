import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkTokenData, savePassword } from "../../utility/userApi";
import FullpageLoader from "../../common/FullpageLoader";
import { validatePassword } from "../../helpers/fromValidationCheckers";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const PasswordReset = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState();

  const fetchTokenData = async () => {
    try {
      setLoading(true);
      const response = await checkTokenData(token);
      setUser(response.data);
    } catch (e) {
      toast.warn(e?.message);
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTokenData(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) { toast.error("Invalid Password"); return; }
    if (password !== confirmPassword) { toast.error("Passwords do not match"); return; }
    try {
      setLoading(true);
      const response = await savePassword({ email: user.email, password, token });
      toast.success(response.message);
      navigate("/Signin");
    } catch (e) {
      toast.warn(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-brand rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl">🔐</span>
          </div>
          <h1 className="text-3xl font-bold text-stone-900">Reset Password</h1>
          <p className="text-stone-500 text-sm mt-1">Enter your new password below</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-stone-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">New Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="input-base pl-10 pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors">
                  {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="input-base pl-10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-white text-base transition-all shadow-md
                ${loading ? 'bg-stone-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-light hover:shadow-lg active:scale-95'}`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>

      <FullpageLoader open={loading} />
    </div>
  );
};

export default PasswordReset;
