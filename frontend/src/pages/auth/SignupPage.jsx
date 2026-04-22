import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUp, useVerifyOTP } from '../../hooks/useUsers.js';
import conf from '../../config/config.js';
import { OTPInput } from '../../components/export.js';
import { GOOGLE_SVG } from '../../constants/svgConstants.js';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [otp, setOtp] = useState('');
  const [isOTPMode, setIsOTPMode] = useState(false);

  const { mutate: signup, isPending: isSigningUp } = useSignUp();
  const { mutate: verifyOTP, isPending: isVerifying } = useVerifyOTP();
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData, {
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
            {isOTPMode ? 'Verify OTP' : 'Sign up'}
          </h2>
          {!isOTPMode && (
            <p className="mt-2 text-sm text-slate-500">
              Already have an account?{' '}
              <Link
                to="/auth/login"
                className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Login
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
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-600 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
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

              <button
                type="submit"
                disabled={isSigningUp}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {isSigningUp ? 'Creating account...' : 'Sign up'}
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
              <p className="mt-4 text-xs text-center text-slate-400 italic">
                * Check your spam folder if you don&apos;t see the email.
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
              Back to Sign up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
