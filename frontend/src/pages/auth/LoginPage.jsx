import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import conf from '../../config/config.js';
import { useLogin, useVerifyOTP } from '../../hooks/useUsers.js';
import OTPInput from '../../components/OTPInput.jsx';
import { GOOGLE_SVG } from '../../constants/svgConstants.js';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [isOTPMode, setIsOTPMode] = useState(false);

  const { mutate: login, isPending: isLoggingIn } = useLogin();
  const { mutate: verifyOTP, isPending: isVerifying } = useVerifyOTP();
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData, {
      onSuccess: (data) => {
        if (data.requires2FA) {
          setIsOTPMode(true);
        } else {
          navigate(`/dashboard/${data.user.displayName}`);
        }
      },
    });
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    verifyOTP(
      { otp },
      {
        onSuccess: (data) => {
          navigate(`/dashboard/${data.user.displayName}`);
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 px-4">
      <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            {isOTPMode ? 'Verify OTP' : 'Login'}
          </h2>
          {!isOTPMode && (
            <p className="mt-2 text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <Link
                to="/auth/signup"
                className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Sign up
              </Link>
            </p>
          )}
          {isOTPMode && (
            <p className="mt-2 text-sm text-slate-500">
              Enter the 6-digit code sent to {email}
            </p>
          )}
        </div>

        {!isOTPMode ? (
          <>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-600 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-600 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 bg-white border-slate-200 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Remember me</span>
                </label>
                <Link
                  to="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {isLoggingIn ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                (window.location.href = `${conf.SERVER_BASE_URL}/api/auth/google`)
              }
              className="w-full flex items-center justify-center py-3 px-4 bg-white hover:bg-slate-50 border-2 border-slate-50 rounded-xl text-sm font-bold text-slate-700 transition-all transform hover:scale-[1.02] shadow-sm"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d={GOOGLE_SVG} />
              </svg>
              Google
            </button>
          </>
        ) : (
          <form className="space-y-6" onSubmit={handleVerifyOTP}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 text-center">
                Verification Code
              </label>
              <OTPInput value={otp} onChange={(val) => setOtp(val)} />
              <p className="mt-4 text-xs text-center text-slate-400 italic text-slate-400 font-medium">
                * Don&apos;t forget to check your spam folder!
              </p>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {isVerifying ? 'Verifying...' : 'Verify Code'}
            </button>

            <button
              type="button"
              onClick={() => setIsOTPMode(false)}
              className="w-full text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
