import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PlayCircle,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  Globe,
  Code,
  FileText,
  Zap,
  Users,
  Key,
} from 'lucide-react';
import {
  DEFAULT_USERS,
  LANDING_FEATURES,
  HOW_IT_WORKS_STEPS,
  TESTIMONIALS,
  ROADMAP_ITEMS,
} from '../constants/index.js';
import { LANDING_FAQS } from '../constants/faqs.js';
import { AnimatedLayout } from '../layouts/export.js';
import {
  DashboardPreview,
  LandingNavbar,
  StepTimeline,
} from '../components/export.js';
import {
  FeatureCard,
  FaqCard,
  TestimonialCard,
} from '../components/card/export.js';
import { useHighlights } from '../hooks/useHighlights.js';
import { LOGO_URL } from '../constants/index.js';

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 },
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const currentCount = Math.min(
        Math.floor((progress / duration) * end),
        end,
      );

      setCount(currentCount);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return <span ref={countRef}>{count.toLocaleString()}</span>;
};

export default function App() {
  const { highlights } = useHighlights();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const PLATFORM_STATS = [
    {
      label: 'Total Users',
      value: highlights.totalUsers,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      label: 'GitHub Profiles Analyzed',
      value: highlights.totalGithubProfiles,
      icon: Github,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
    },
    {
      label: 'LeetCode Profiles Analyzed',
      value: highlights.totalLeetcodeProfiles,
      icon: Code,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
    },
    {
      label: 'Resumes Scanned',
      value: highlights.totalResumes,
      icon: FileText,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
    },
    {
      label: 'API Keys Issued',
      value: highlights.totalApiKeys,
      icon: Key,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      label: 'Public API Requests Made',
      value: highlights.totalPublicApiCalls,
      icon: Zap,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
  ];

  return (
    <div id="webcrumbs">
      <div className="bg-gradient-to-br from-slate-50 to-indigo-100 text-slate-800 min-h-screen font-sans overflow-x-hidden">
        <LandingNavbar />

        <main className="px-12">
          {/* Header Section */}
          <header
            id="introduction"
            className="container mx-auto px-4 pt-32 pb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <AnimatedLayout>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight flex items-center gap-4">
                    <img
                      src={LOGO_URL}
                      alt="CodeFolio Logo"
                      className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                    />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                      CodeFolio
                    </span>
                  </h2>
                </AnimatedLayout>
                <AnimatedLayout delay={100}>
                  <p className="text-lg text-slate-600 font-medium leading-relaxed">
                    Enhance your tech career with comprehensive insights from
                    all your coding profiles. Get AI-powered recommendations and
                    visualize your growth journey.
                  </p>
                </AnimatedLayout>
                <AnimatedLayout delay={200}>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                    <Link to="/analyzer">
                      <button className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-xs uppercase tracking-widest hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-3 shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-1">
                        <span>Start Free Analysis</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                    <button className="px-8 py-4 rounded-full border-2 border-slate-200 text-slate-600 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center space-x-3 transform hover:-translate-y-1">
                      <PlayCircle className="w-4 h-4" />
                      <span>Watch Demo</span>
                    </button>
                  </div>
                </AnimatedLayout>
                <AnimatedLayout delay={300}>
                  <div className="flex items-center space-x-6 pt-6">
                    <div className="flex -space-x-2">
                      {(highlights.sampleUsers.length > 0
                        ? highlights.sampleUsers
                        : DEFAULT_USERS
                      ).map((user, idx) => (
                        <img
                          key={idx}
                          src={user.profile || '/Images/Default/user.png'}
                          alt={user.name}
                          className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md"
                        />
                      ))}
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center border-2 border-white text-white shadow-md">
                        <span className="text-[10px] font-black">
                          {highlights.totalUsers > 0
                            ? `${highlights.totalUsers}+`
                            : '5+'}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Trusted by developers worldwide
                    </p>
                  </div>
                </AnimatedLayout>
              </div>

              {/* Dashboard Preview */}
              <AnimatedLayout className="relative overflow-hidden" delay={200}>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full filter blur-3xl animate-blob"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
                <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-2xl transform hover:-translate-y-2 transition-all duration-500 hover:shadow-indigo-500/10">
                  <DashboardPreview />
                </div>
              </AnimatedLayout>
            </div>
          </header>

          {/* Metrics Section */}
          <section id="metrics" className="container mx-auto py-12">
            <AnimatedLayout className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-6">
                Our Growing Tech Ecosystem
              </h2>
              <p className="text-slate-500 font-bold max-w-2xl mx-auto uppercase tracking-widest text-xs">
                Real-time insights into how developers are using CodeFolio to
                analyze profiles and power their technical growth.
              </p>
            </AnimatedLayout>
            <AnimatedLayout delay={400}>
              <div className="backdrop-blur-sm p-10 rounded-[3rem] shadow-xl shadow-slate-100/50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                  {PLATFORM_STATS.map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-6 group cursor-default"
                    >
                      <div
                        className={`w-16 h-16 rounded-3xl ${stat.bg} ${stat.border} border flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm`}
                      >
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                          <span
                            className={`text-4xl font-black text-slate-800 tracking-tight`}
                          >
                            <CountUp end={stat.value || 0} />
                          </span>
                          <span
                            className={`text-4xl   font-bold ${stat.color}`}
                          >
                            +
                          </span>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedLayout>
          </section>

          {/* Features Section */}
          <section id="features" className="py-24">
            <div className="container mx-auto px-4">
              <AnimatedLayout className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-6">
                  Comprehensive Profile Analysis
                </h2>
                <p className="text-slate-500 font-bold max-w-2xl mx-auto uppercase tracking-widest text-xs">
                  Connect all your professional profiles in one place and get
                  actionable insights to boost your tech career.
                </p>
              </AnimatedLayout>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {LANDING_FEATURES.map((feature, index) => (
                  <AnimatedLayout key={feature.title} delay={index * 100}>
                    <FeatureCard {...feature} />
                  </AnimatedLayout>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <AnimatedLayout className="text-center mb-24">
                <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-6">
                  How CodeFolio Works
                </h2>
                <p className="text-slate-500 font-bold max-w-2xl mx-auto uppercase tracking-widest text-xs">
                  Get started in less than 2 minutes. No complex setups
                  required.
                </p>
              </AnimatedLayout>

              <StepTimeline steps={HOW_IT_WORKS_STEPS} />
            </div>
          </section>

          {/* Upcoming Changes Section */}
          <section
            id="upcoming-changes"
            className="py-24 relative overflow-hidden"
          >
            {/* Subtle background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-12 relative z-10">
              <AnimatedLayout className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-6">
                  Upcoming Changes
                </h2>
                <p className="text-slate-500 font-bold max-w-2xl mx-auto uppercase tracking-widest text-xs">
                  What our team is building more features to make your insights
                  even deeper and more actionable.
                </p>
              </AnimatedLayout>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ROADMAP_ITEMS.map((item, index) => (
                  <AnimatedLayout key={item.title} delay={index * 100}>
                    <FeatureCard {...item} />
                  </AnimatedLayout>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-24">
            <div className="container mx-auto px-4">
              <AnimatedLayout className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-6">
                  Testimonials
                </h2>
                <p className="text-slate-500 font-bold max-w-2xl mx-auto uppercase tracking-widest text-xs">
                  See how our comprehensive analysis is helping others land
                  roles and grow.
                </p>
              </AnimatedLayout>
              {/* CSS Marquee Styles */}
              <style>{`
                            @keyframes marquee {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-50%); }
                            }
                            .animate-marquee {
                                /* 40 seconds to make it pleasantly readable */
                                animation: marquee 40s linear infinite;
                            }
                            .group:hover .animate-marquee {
                                animation-play-state: paused;
                            }
                        `}</style>

              <div className="relative w-full overflow-hidden group pb-4">
                {/* Blur gradients to mask edges for the marquee */}
                <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-max animate-marquee gap-8 py-4 items-stretch">
                  {/* By duplicating an even number of robust datasets, translateX(-50%) will loop seamlessly. */}
                  {[...Array(6)].map((_, i) => (
                    <React.Fragment key={i}>
                      {TESTIMONIALS.map((t, idx) => (
                        <TestimonialCard key={`${i}-${idx}`} {...t} />
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-24">
            <div className="container mx-auto px-4">
              <AnimatedLayout className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-slate-500 font-bold max-w-2xl mx-auto uppercase tracking-widest text-xs">
                  Got questions? We&apos;ve got answers. Learn more about how
                  CodeFolio can supercharge your career.
                </p>
              </AnimatedLayout>
              <div className="space-y-4">
                {LANDING_FAQS.map((faq, index) => (
                  <AnimatedLayout key={index} delay={index * 50}>
                    <FaqCard
                      {...faq}
                      isOpen={openFaqIndex === index}
                      onClick={() =>
                        setOpenFaqIndex(openFaqIndex === index ? -1 : index)
                      }
                    />
                  </AnimatedLayout>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer Section */}
        <footer className="bg-white text-slate-800 pt-24 pb-12 relative overflow-hidden border-t border-slate-100">
          {/* Decorative Blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto px-12 relative z-10">
            {/* Top Section: Branding & Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-slate-100">
              {/* Brand Column */}
              <div className="space-y-8 text-center md:text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start space-x-3">
                    <img src={LOGO_URL} alt="Logo" className="w-12 h-12" />
                    <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                      CodeFolio
                    </h2>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
                    The ultimate platform for developers to visualize their
                    journey, analyze profiles, and skyrocket their career with
                    AI-driven insights.
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <a
                    target="_blank"
                    href="https://github.com/VRAJESH-31/CodeFolio-Insights"
                    className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all transform hover:-translate-y-1 border border-slate-200 group"
                    rel="noreferrer"
                  >
                    <Github className="w-5 h-5 text-slate-600 group-hover:text-white" />
                  </a>
                  <a
                    target="_blank"
                    href="https://x.com/AshokBhatt619"
                    className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-sky-500 transition-all transform hover:-translate-y-1 border border-slate-200 group"
                    rel="noreferrer"
                  >
                    <Twitter className="w-5 h-5 text-slate-600 group-hover:text-white" />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/ashokbhatt2048/"
                    className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all transform hover:-translate-y-1 border border-slate-200 group"
                    rel="noreferrer"
                  >
                    <Linkedin className="w-5 h-5 text-slate-600 group-hover:text-white" />
                  </a>
                </div>
              </div>

              {/* Analyzers Column */}
              <div className="space-y-8 text-center md:text-left">
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600">
                  Analyzers
                </h3>
                <ul className="space-y-5">
                  <li>
                    <Link
                      to="/analyzer/github"
                      className="text-slate-500 hover:text-indigo-600 font-bold transition-all flex items-center justify-center md:justify-start gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-indigo-500 transition-all"></span>{' '}
                      GitHub Analysis
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/analyzer/leetcode"
                      className="text-slate-500 hover:text-indigo-600 font-bold transition-all flex items-center justify-center md:justify-start gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-purple-500 transition-all"></span>{' '}
                      LeetCode Analysis
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/analyzer/resume"
                      className="text-slate-500 hover:text-indigo-600 font-bold transition-all flex items-center justify-center md:justify-start gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-pink-500 transition-all"></span>{' '}
                      AI Resume Scanner
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Product Column */}
              <div className="space-y-8 text-center md:text-left">
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-purple-600">
                  Resources
                </h3>
                <ul className="space-y-5">
                  <li>
                    <a
                      href="#"
                      className="text-slate-500 hover:text-purple-600 font-bold transition-all flex items-center justify-center md:justify-start gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-indigo-500 transition-all"></span>{' '}
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-500 hover:text-purple-600 font-bold transition-all flex items-center justify-center md:justify-start gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-purple-500 transition-all"></span>{' '}
                      Release Notes
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-500 hover:text-purple-600 font-bold transition-all flex items-center justify-center md:justify-start gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-pink-500 transition-all"></span>{' '}
                      Community
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Column */}
              <div className="space-y-8 text-center md:text-left">
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-pink-600">
                  Contact Us
                </h3>
                <ul className="space-y-6">
                  <li>
                    <a
                      href="mailto:support@codefolio.ai"
                      className="group flex items-center justify-center md:justify-start gap-4"
                    >
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-100 transition-all">
                        <Mail className="w-4 h-4 text-slate-400 group-hover:text-pink-600" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Email us at
                        </span>
                        <span className="text-sm font-bold text-slate-600 group-hover:text-pink-600 transition-colors">
                          ashokbhatt2048@gmail.com
                        </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <div className="group flex items-center justify-center md:justify-start gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all">
                        <Globe className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Location
                        </span>
                        <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">
                          Vadodara, Gujarat, India
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <a href="#" className="hover:text-indigo-600 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-indigo-600 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-indigo-600 transition-colors">
                  Cookie Policy
                </a>
              </div>
              <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50 px-6 py-3 rounded-full border border-slate-200">
                <span>© {new Date().getFullYear()} CodeFolio</span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  Built with{' '}
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />{' '}
                  by developers
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
