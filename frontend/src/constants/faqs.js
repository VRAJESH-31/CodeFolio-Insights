import { Zap, Shield, CreditCard, Code2, MessageSquare, AlertCircle, Info, Database, UserCheck, Gift, Rocket, Lock, CheckCircle, Fingerprint, Activity, BarChart, Globe, RefreshCcw, Share2, Briefcase } from "lucide-react"

const PUBLIC_API_FAQS = [
    {
        question: "What is CodeFolio Public API?",
        answer: "CodeFolio Public API allows developers to programmatically access coding platform data (like LeetCode, GFG, CodeChef) through a unified interface. You can integrate this data into your own portfolios, resumes, or analysis tools without worrying about complex scraping logic, cross origin policy, data cleaning, etc.",
        icon: Zap,
        iconClasses: "w-5 h-5 text-amber-500",
    },
    {
        question: "What data would I get using CodeFolio?",
        answer: "You can scrape public profile information, including solved problems, contest participation, and statistics available on coding platforms like LeetCode, GeeksforGeeks, CodeChef, and more.",
        icon: Database,
        iconClasses: "w-5 h-5 text-cyan-500",
    },
    {
        question: "Is CodeFolio affiliated with coding platforms?",
        answer: "No, CodeFolio is an independent tool and is not affiliated with or endorsed by any coding platform. We provide a bridge to access publicly available data more efficiently.",
        icon: Info,
        iconClasses: "w-5 h-5 text-slate-500",
    },
    {
        question: "How do I get an API Key?",
        answer: "Navigate to the 'Projects' tab in the Public APIs section. Create a new project, and an API key will be generated for you automatically. You can manage multiple keys by creating different projects.",
        icon: Shield,
        iconClasses: "w-5 h-5 text-blue-500",
    },
    {
        question: "Do I need an account to use CodeFolio?",
        answer: "Yes, you need to create an account on CodeFolio Insights to use the service, manage your API keys, and track your usage statistics.",
        icon: UserCheck,
        iconClasses: "w-5 h-5 text-indigo-500",
    },
    {
        question: "What are API Points?",
        answer: "API Points are our internal currency for rate limiting. Each API call consumes a certain number of points. Different endpoints have different costs based on the complexity of the data being fetched. You can see the cost for each endpoint in the Documentation section.",
        icon: CreditCard,
        iconClasses: "w-5 h-5 text-emerald-500",
    },
    {
        question: "Is there a rate limit?",
        answer: "Yes, rate limits are applied per API key. Your available points reset every day at 12 AM. Refer to your project dashboard to see your current usage and remaining quotas.",
        icon: Zap,
        iconClasses: "w-5 h-5 text-purple-500",
    },
    {
        question: "Is CodeFolio free to use?",
        answer: "Yes, CodeFolio is free to use but comes with a daily API Limit to ensure fair usage for all users. Your points are replenished every 24 hours.",
        icon: Gift,
        iconClasses: "w-5 h-5 text-rose-500",
    },
    {
        question: "What if I want to expand the daily API Points Limit?",
        answer: "You can contact us using the contact form, and we will review your request to expand your daily API Points Limit based on your use case.",
        icon: Rocket,
        iconClasses: "w-5 h-5 text-orange-500",
    },
    {
        question: "Can CodeFolio access private or password-protected data?",
        answer: "No, CodeFolio only accesses publicly available data. Private or restricted content, such as locked problems or private profile details, is not accessible through our platform.",
        icon: Lock,
        iconClasses: "w-5 h-5 text-red-500",
    },
    {
        question: "Are there any risks in using CodeFolio?",
        answer: "No, there's no risk at all in using the CodeFolio API. You are interacting with our standardized interface, and all the complex fetching and data processing is handled safely by our backend systems.",
        icon: CheckCircle,
        iconClasses: "w-5 h-5 text-green-500",
    },
    {
        question: "How is my data used by CodeFolio?",
        answer: "Your privacy is our priority. We do not use your data in any capacity other than providing the service. We do not sell or share your personal information or API usage data with third parties.",
        icon: Fingerprint,
        iconClasses: "w-5 h-5 text-teal-500",
    },
    {
        question: "Can I use these APIs for commercial purposes?",
        answer: "Yes, our Public APIs are designed for both personal and commercial use cases. However, please ensure your usage complies with our Terms of Service and the terms of the source platforms.",
        icon: Code2,
        iconClasses: "w-5 h-5 text-pink-500",
    },
    {
        question: "How do I handle API errors?",
        answer: "All our endpoints return standard HTTP status codes. Successful requests return 200 OK. Errors like 401 Unauthorized (missing/invalid key) or 429 Too Many Requests (rate limit exceeded) should be handled gracefully in your application.",
        icon: AlertCircle,
        iconClasses: "w-5 h-5 text-red-600",
    },
    {
        question: "What if a platform changes its structure?",
        answer: "Our backend team continuously monitors all source platforms. If a platform updates its UI or API structure, we update our logic accordingly. Most updates are seamless and don't require changes to your integration.",
        icon: MessageSquare,
        iconClasses: "w-5 h-5 text-blue-400",
    }
];

const LANDING_FAQS = [
    {
        question: "What is CodeFolio Insights?",
        answer: "CodeFolio Insights is a unified platform that aggregates your diverse developer profiles (LeetCode, GitHub, GeeksforGeeks, CodeChef, etc.) to provide comprehensive analysis and actionable insights to boost your career.",
        icon: Globe,
        iconClasses: "w-5 h-5 text-blue-500",
    },
    {
        question: "Which coding platforms are currently supported?",
        answer: "We currently support major coding platforms including LeetCode, GitHub, GeeksforGeeks, CodeChef, InterviewBit, Code360, and HackerRank. We are continuously working on adding more platforms to our integrations list.",
        icon: Database,
        iconClasses: "w-5 h-5 text-indigo-500",
    },
    {
        question: "How is my profile data collected?",
        answer: "We securely access publicly available data from your coding profiles to generate detailed analytics, topic-wise strengths, and performance trends—without ever needing your platform passwords.",
        icon: Shield,
        iconClasses: "w-5 h-5 text-emerald-500",
    },
    {
        question: "Is CodeFolio Insights free to use?",
        answer: "Yes, the core profile aggregation and analysis features are completely free for developers to use, track their progress, and improve their coding skills.",
        icon: Gift,
        iconClasses: "w-5 h-5 text-rose-500",
    },
    {
        question: "Can I use CodeFolio Insights to build my resume?",
        answer: "Absolutely. We provide AI-powered resume analysis and let you seamlessly showcase your best coding achievements and projects all in one place, making it easier to present to recruiters.",
        icon: Briefcase,
        iconClasses: "w-5 h-5 text-amber-500",
    },
    {
        question: "How frequently is my profile data updated?",
        answer: "Your profile stats are updated practically in real-time when you refresh your dashboard, ensuring that your recent contest ratings and problem counts are always perfectly in sync.",
        icon: RefreshCcw,
        iconClasses: "w-5 h-5 text-purple-500",
    },
    {
        question: "Is my personal data secure?",
        answer: "We only access your public profile data required to build the analytics dashboard. We do not store sensitive information like passwords or your private repository code. Your data privacy is fully guaranteed.",
        icon: Lock,
        iconClasses: "w-5 h-5 text-red-500",
    },
    {
        question: "Can I share my unified profile with recruiters?",
        answer: "Yes, you can easily generate a public, shareable link of your unified developer profile. This serves as a comprehensive portfolio that makes it easier for recruiters to instantly evaluate your skills.",
        icon: Share2,
        iconClasses: "w-5 h-5 text-teal-500",
    },
    {
        question: "Does CodeFolio Insights offer an API for developers?",
        answer: "Yes, we also offer a powerful Public API that allows developers to programmatically fetch curated, scraped data from coding platforms for their own side projects or portfolios.",
        icon: Activity,
        iconClasses: "w-5 h-5 text-pink-500",
    }
];

export {
    PUBLIC_API_FAQS,
    LANDING_FAQS
}
