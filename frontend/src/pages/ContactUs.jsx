import { useState } from 'react';
import { Mail, User, Send, Zap, ShieldCheck, Lightbulb } from 'lucide-react';
import { useContactUs } from '../hooks/useEmail.js';

const ContactUs = () => {
    const { mutate: sendMessage, isPending: isLoading } = useContactUs();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(formData, {
            onSuccess: () => {
                setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
            }
        });
    };

    return (
        <div className="max-w-[90%] mx-auto py-12 px-6 animate-float-in">
            <div className="grid lg:grid-cols-5 gap-12 items-start">

                {/* Contact Info Sidebar */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                            Contact Us
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tight uppercase">
                            Let's Build <br />
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Something Great</span>
                        </h1>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">
                            Have questions about our APIs, need a limit increase, or just want to say hi? We're here for you.
                        </p>
                    </div>

                    <div className="space-y-6 pt-6">
                        <div className="flex items-start gap-5 group">
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Priority Support</p>
                                <p className="text-slate-600 font-medium text-sm leading-relaxed max-w-[240px]">Get direct access to our core engineers for rapid integration assistance.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5 group">
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Custom Solutions</p>
                                <p className="text-slate-600 font-medium text-sm leading-relaxed max-w-[240px]">Need specific endpoints or higher limits? We build tailored API plans.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5 group">
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                                <Lightbulb className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Roadmap Influence</p>
                                <p className="text-slate-600 font-medium text-sm leading-relaxed max-w-[240px]">Your feedback directly shapes our product development and future APIs.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-10 border border-slate-50/50 relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-900 placeholder:text-slate-300"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-900 placeholder:text-slate-300"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 focus:ring-2 focus:ring-blue-100 transition-all font-bold text-slate-900"
                                >
                                    <option>General Inquiry</option>
                                    <option>API Limit Increase</option>
                                    <option>Bug Report</option>
                                    <option>Feedback</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Message</label>
                                <textarea
                                    required
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us what's on your mind..."
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-900 placeholder:text-slate-300 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending Message...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
