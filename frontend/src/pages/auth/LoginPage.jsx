import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { useLogin } from '@/hooks/useUsers.js';
import { GoogleLoginButton } from '@/components/buttons/export.js';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending: isLoggingIn } = useLogin();
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData, {
      onSuccess: (data) => {
        if (data.requires2FA) {
          navigate('/auth/verify-otp', { state: { email } });
        } else {
          navigate(`/dashboard/${data.user.displayName}`);
        }
      },
    });
  };

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome back</h1>
        <p className="text-slate-500 text-md">Enter your credentials to access your account.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1 relative">
          <label htmlFor="email" className={`block text-sm font-bold transition-colors ${focusedInput === 'email' ? 'text-indigo-600' : 'text-slate-700'}`}>
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail size={18} className={`transition-colors ${focusedInput === 'email' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-500'}`} />
            </div>
            <input id="email" name="email" type="email" value={email} onChange={handleChange} onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)} required className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 font-medium" placeholder="name@company.com" />
          </div>
        </div>

        <div className="space-y-1 relative">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className={`block text-sm font-bold transition-colors ${focusedInput === 'password' ? 'text-indigo-600' : 'text-slate-700'}`}>
              Password
            </label>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={18} className={`transition-colors ${focusedInput === 'password' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-500'}`} />
            </div>
            <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={handleChange} onFocus={() => setFocusedInput('password')} onBlur={() => setFocusedInput(null)} required className="w-full pl-11 pr-12 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 font-medium" placeholder="••••••••" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={isLoggingIn || !email || !password} className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/20 hover:shadow-slate-900/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          {isLoggingIn ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-slate-400 font-bold uppercase tracking-wider text-[11px]">Or continue with</span>
        </div>
      </div>

      <GoogleLoginButton />

      <p className="mt-6 text-center text-sm text-slate-600 font-medium">
        Don&apos;t have an account?{' '}
        <Link to="/auth/signup" className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline transition-all">
          Sign up for free
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
