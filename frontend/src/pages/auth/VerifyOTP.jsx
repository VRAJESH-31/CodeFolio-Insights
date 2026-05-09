import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2, ArrowRight } from 'lucide-react';
import { useVerifyOTP } from '@/hooks/useUsers.js';
import { OTPInput } from '@/components/export.js';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // email is passed via navigation state from LoginPage / SignupPage
  const email = location.state?.email ?? '';

  const { mutate: verifyOTP, isPending: isVerifying } = useVerifyOTP();

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
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Two-Step Verification</h1>
        <p className="text-slate-500 text-md">
          We sent a security code to <span className="font-semibold text-slate-900">{email}</span>
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleVerifyOTP}>
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 text-indigo-800 font-semibold mb-4">
            <ShieldCheck size={20} className="text-indigo-600" />
            Security Check
          </div>
          <OTPInput value={otp} onChange={(val) => setOtp(val)} />
          <p className="mt-4 text-xs text-center text-slate-500 font-medium">Didn&apos;t receive it? Check your spam folder.</p>
        </div>

        <button type="submit" disabled={isVerifying || otp.length < 6} className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/20 hover:shadow-slate-900/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          {isVerifying ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify Code'
          )}
        </button>

        <button type="button" onClick={() => navigate('/auth/login')} className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors group">
          <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
