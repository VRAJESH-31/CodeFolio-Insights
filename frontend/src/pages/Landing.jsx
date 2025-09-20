import React, { useState, useEffect, useRef } from "react";

// Helper component for SVG icons to keep the main component cleaner
const Icon = ({ name, className }) => {
    const icons = {
        github: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        ),
        linkedin: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        ),
        // Add other icons here if needed
    };
    return icons[name] || null;
};


// Custom hook to detect if an element is in the viewport
const useOnScreen = (options) => {
    const ref = useRef();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};

// Animated component wrapper
const Animated = ({ children, className = '', delay = 0 }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};


export default function App() {
    return (
        <div id="webcrumbs">
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white min-h-screen font-sans">
                {/* Header Section */}
                <header className="container mx-auto px-4 py-8">
                    <nav className="flex justify-between items-center mb-16">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <span className="material-symbols-outlined text-3xl text-indigo-400">insights</span>
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-600">
                                CodeFolio Insights
                            </h1>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
                            <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How it works</a>
                            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
                            <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="px-4 py-2 rounded-full border border-indigo-500 hover:bg-indigo-500/10 transition-all transform hover:scale-105">
                                Login
                            </button>
                            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-indigo-600/30">
                                Sign Up
                            </button>
                        </div>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <Animated>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    Unified Developer{" "}
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                        Profile Analysis
                                    </span>
                                </h2>
                            </Animated>
                            <Animated delay={100}>
                                <p className="text-lg text-gray-300">
                                    Enhance your tech career with comprehensive insights from all your coding profiles. Get AI-powered recommendations and visualize your growth journey.
                                </p>
                            </Animated>
                            <Animated delay={200}>
                                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                                    <button className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transform hover:-translate-y-1">
                                        <span>Start Free Analysis</span>
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                    <button className="px-6 py-3 rounded-full border border-gray-400 hover:bg-white/10 transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-1">
                                        <span className="material-symbols-outlined">play_circle</span>
                                        <span>Watch Demo</span>
                                    </button>
                                </div>
                            </Animated>
                            <Animated delay={300}>
                                <div className="flex items-center space-x-6 pt-6">
                                    <div className="flex -space-x-2">
                                        <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100" alt="User 1" className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" />
                                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="User 2" className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" />
                                        <img src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=100" alt="User 3" className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" />
                                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center border-2 border-slate-900">
                                            <span className="text-xs font-medium">500+</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-300">Trusted by developers worldwide</p>
                                </div>
                            </Animated>
                        </div>

                        <Animated className="relative" delay={200}>
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full filter blur-3xl animate-blob"></div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
                            <div className="relative bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 shadow-xl transform hover:-translate-y-2 transition-all duration-300 hover:shadow-indigo-500/20">
                                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 shadow-inner">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-semibold">Developer Dashboard</h3>
                                        <div className="flex space-x-2">
                                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 hover:bg-indigo-500 transition-colors"><span className="material-symbols-outlined text-sm">refresh</span></button>
                                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 hover:bg-indigo-500 transition-colors"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-slate-700/50 p-4 rounded-lg">
                                            <div className="flex items-center space-x-2 mb-2"><Icon name="github" className="w-5 h-5" /><span className="font-medium">GitHub</span></div>
                                            <div className="flex justify-between items-end">
                                                <div><span className="text-3xl font-bold">342</span><p className="text-xs text-gray-400">Contributions</p></div>
                                                <div className="h-10 flex items-end space-x-1">
                                                    <div className="w-2 h-3 bg-indigo-400 rounded-sm"></div>
                                                    <div className="w-2 h-5 bg-indigo-500 rounded-sm"></div>
                                                    <div className="w-2 h-7 bg-indigo-600 rounded-sm"></div>
                                                    <div className="w-2 h-4 bg-indigo-500 rounded-sm"></div>
                                                    <div className="w-2 h-9 bg-indigo-700 rounded-sm"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-700/50 p-4 rounded-lg">
                                            <div className="flex items-center space-x-2 mb-2"><Icon name="linkedin" className="w-5 h-5" /><span className="font-medium">LinkedIn</span></div>
                                            <div><span className="text-3xl font-bold">86%</span><p className="text-xs text-gray-400">Profile strength</p>
                                                <div className="w-full h-2 bg-slate-600 rounded-full mt-2">
                                                    <div className="w-[86%] h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-700/30 p-4 rounded-lg mb-6">
                                        <div className="flex items-center space-x-2 mb-3"><span className="material-symbols-outlined">code</span><span className="font-medium">Coding Performance</span></div>
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div><div className="text-xl font-bold">142</div><p className="text-xs text-gray-400">LeetCode</p></div>
                                            <div><div className="text-xl font-bold">89</div><p className="text-xs text-gray-400">GFG</p></div>
                                            <div><div className="text-xl font-bold">4.8<span className="text-xs">/5</span></div><p className="text-xs text-gray-400">HackerRank</p></div>
                                        </div>
                                    </div>
                                    <div className="bg-indigo-900/50 border border-indigo-700/50 p-4 rounded-lg">
                                        <div className="flex items-start space-x-3">
                                            <span className="material-symbols-outlined bg-indigo-600/30 p-2 rounded-lg">smart_toy</span>
                                            <div><h4 className="font-medium mb-1">AI Recommendation</h4><p className="text-sm text-gray-300">Focus on contributing to open-source React projects to strengthen your frontend expertise. Your problem-solving skills are excellent!</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Animated>
                    </div>
                </header>

                {/* Features Section */}
                <section id="features" className="py-20 bg-slate-900/50">
                    <div className="container mx-auto px-4">
                        <Animated className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Profile Analysis</h2>
                            <p className="text-gray-300 max-w-2xl mx-auto">Connect all your professional profiles in one place and get actionable insights to boost your tech career.</p>
                        </Animated>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: <Icon name="github" className="w-7 h-7 text-indigo-400" />, title: "GitHub Analysis", description: "Analyze your repository contributions, code quality, and project diversity to showcase your development expertise.", items: ["Contribution patterns", "Language proficiency", "Project impact assessment"] },
                                { icon: <Icon name="linkedin" className="w-7 h-7 text-indigo-400" />, title: "LinkedIn Optimization", description: "Enhance your professional profile with insights on network growth, engagement metrics, and keyword optimization.", items: ["Profile completeness score", "Network quality analysis", "Skill endorsement strategy"] },
                                { icon: <span className="material-symbols-outlined text-3xl text-indigo-400">code</span>, title: "Coding Platforms", description: "Track your problem-solving progress across LeetCode, GeeksForGeeks, and other competitive programming platforms.", items: ["Problem-solving patterns", "Difficulty progression", "Skill gap identification"] },
                                { icon: <span className="material-symbols-outlined text-3xl text-indigo-400">description</span>, title: "Resume Analysis", description: "Get detailed feedback on your resume with keyword optimization, ATS compatibility, and content suggestions.", items: ["ATS score and optimization", "Industry-specific improvements", "Impact statement enhancement"] },
                                { icon: <span className="material-symbols-outlined text-3xl text-indigo-400">dashboard</span>, title: "Unified Dashboard", description: "Access all your profile metrics in one comprehensive dashboard with progress tracking and goal setting.", items: ["Cross-platform analytics", "Progress visualization", "Customizable widgets"] },
                                { icon: <span className="material-symbols-outlined text-3xl text-indigo-400">smart_toy</span>, title: "AI-Powered Recommendations", description: "Receive personalized career advice and skill development recommendations based on your complete profile analysis.", items: ["Skill gap analysis", "Career path suggestions", "Learning resource curation"] },
                            ].map((feature, index) => (
                                <Animated key={feature.title} delay={index * 100}>
                                    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all hover:shadow-lg hover:shadow-indigo-500/10 group h-full flex flex-col transform hover:-translate-y-2">
                                        <div className="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-500/30 transition-all">{feature.icon}</div>
                                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-gray-300 mb-4 flex-grow">{feature.description}</p>
                                        <ul className="space-y-2 text-sm text-gray-400">
                                            {feature.items.map(item => (
                                                <li key={item} className="flex items-center space-x-2">
                                                    <span className="material-symbols-outlined text-indigo-500 text-sm">check_circle</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Animated>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-20">
                    <div className="container mx-auto px-4">
                        <Animated className="text-center mb-20">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in 3 Easy Steps</h2>
                            <p className="text-gray-300 max-w-2xl mx-auto">Get started with CodeFolio Insights in just a few simple steps.</p>
                        </Animated>
                        <div className="relative">
                            {/* Dotted line for desktop */}
                            <div className="hidden md:block absolute top-6 left-0 w-full h-1 border-t-2 border-dashed border-slate-600"></div>

                            <div className="relative grid md:grid-cols-3 gap-x-12">
                                {/* Vertical line for mobile */}
                                <div className="md:hidden absolute top-0 left-6 w-1 h-full bg-slate-700"></div>

                                <Animated className="relative mb-12 md:mb-0">
                                    <div className="absolute -top-1 left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-indigo-500 flex items-center justify-center font-bold text-xl z-10 shadow-lg shadow-indigo-500/20">1</div>
                                    <div className="md:hidden absolute top-6 left-6 w-1 h-full bg-indigo-500/30"></div>
                                    <div className="pt-20 pl-12 md:pl-0 md:text-center">
                                        <h3 className="text-xl font-semibold mb-3">Connect Your Profiles</h3>
                                        <p className="text-gray-300">Link your GitHub, LinkedIn, and coding profiles. Upload your resume to our secure platform.</p>
                                    </div>
                                </Animated>

                                <Animated className="relative mb-12 md:mb-0" delay={150}>
                                    <div className="absolute -top-1 left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-indigo-500 flex items-center justify-center font-bold text-xl z-10 shadow-lg shadow-indigo-500/20">2</div>
                                    <div className="md:hidden absolute top-6 left-6 w-1 h-full bg-indigo-500/30"></div>
                                    <div className="pt-20 pl-12 md:pl-0 md:text-center">
                                        <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
                                        <p className="text-gray-300">Our advanced AI analyzes your profiles, identifying strengths, weaknesses, and opportunities.</p>
                                    </div>
                                </Animated>

                                <Animated className="relative" delay={300}>
                                    <div className="absolute -top-1 left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-indigo-500 flex items-center justify-center font-bold text-xl z-10 shadow-lg shadow-indigo-500/20">3</div>
                                    <div className="pt-20 pl-12 md:pl-0 md:text-center">
                                        <h3 className="text-xl font-semibold mb-3">Get Actionable Insights</h3>
                                        <p className="text-gray-300">Access your personalized dashboard with detailed insights and recommendations for growth.</p>
                                    </div>
                                </Animated>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-20 bg-slate-900/50">
                    <div className="container mx-auto px-4">
                        <Animated className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Developers Say</h2>
                            <p className="text-gray-300 max-w-2xl mx-auto">Join thousands of developers who have transformed their career with CodeFolio Insights</p>
                        </Animated>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { name: 'Sarah Johnson', role: 'Senior Software Engineer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', text: "CodeFolio Insights helped me identify gaps in my GitHub portfolio and optimize my LeetCode strategy. After implementing the AI recommendations, I landed my dream job at a FAANG company." },
                                { name: 'Michael Chen', role: 'Full Stack Developer', image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100', text: "The resume analysis was incredibly detailed, pointing out specific improvements that made my profile stand out. The unified dashboard makes tracking my progress across platforms effortless." },
                                { name: 'Priya Sharma', role: 'Frontend Engineer', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', text: "As a self-taught developer, CodeFolio Insights helped me understand exactly what I needed to focus on. The AI recommendations were spot-on and helped me build a compelling portfolio." },
                            ].map((testimonial, index) => (
                                <Animated key={testimonial.name} delay={index * 100}>
                                    <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all hover:-translate-y-2 h-full flex flex-col">
                                        <div className="flex items-center space-x-2 mb-4">
                                            <span className="text-indigo-500">★★★★★</span>
                                            <span className="text-sm text-gray-400">5.0 rating</span>
                                        </div>
                                        <p className="text-gray-300 mb-6 flex-grow">"{testimonial.text}"</p>
                                        <div className="flex items-center space-x-3">
                                            <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                                            <div>
                                                <h4 className="font-medium">{testimonial.name}</h4>
                                                <p className="text-sm text-gray-400">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Animated>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer className="bg-slate-900/50 border-t border-slate-800 mt-20">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                            <div className="mb-4 md:mb-0">
                                <div className="flex items-center justify-center md:justify-start space-x-2">
                                    <span className="material-symbols-outlined text-2xl text-indigo-400">insights</span>
                                    <h1 className="text-xl font-bold">CodeFolio Insights</h1>
                                </div>
                                <p className="text-gray-400 mt-2 text-sm">Unified Developer Profile Analysis.</p>
                            </div>
                            <div className="flex space-x-6">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Icon name="github" className="w-6 h-6" /></a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Icon name="linkedin" className="w-6 h-6" /></a>
                            </div>
                        </div>
                        <div className="text-center text-gray-500 text-sm mt-8 pt-8 border-t border-slate-800">
                            © {new Date().getFullYear()} CodeFolio Insights. All rights reserved.
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
}
