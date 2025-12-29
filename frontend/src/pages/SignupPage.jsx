import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/export.js';
import { useSignUp } from '../hooks/useUsers.js';
import conf from '../config/config.js';

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();
    const signupMutation = useSignUp();

    const { name, email, password } = formData;

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signupMutation.mutateAsync(formData);
            useAuthStore.setState({ user: data.user, token: data.token });
            navigate("/dashboard");
        } catch (err) {
            // Error handled
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 px-4">
            <div className="w-full max-w-md p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Sign up</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-500 transition-colors">Login</Link>
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                        <input
                            id="name" name="name" type="text" value={name} onChange={handleChange} required
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email address</label>
                        <input
                            id="email" name="email" type="email" value={email} onChange={handleChange} required
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input
                            id="password" name="password" type="password" value={password} onChange={handleChange} required
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all">
                        Sign up
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700" /></div>
                    <div className="relative flex justify-center text-sm"><span className="px-4 bg-slate-800 text-gray-400">Or continue with</span></div>
                </div>

                <button
                    onClick={() => window.location.href = `${conf.SERVER_BASE_URL}/auth/google`}
                    className="w-full flex items-center justify-center py-3 px-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-xl text-sm font-medium text-white transition-all transform hover:scale-[1.02]"
                >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" /></svg>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SignupPage;