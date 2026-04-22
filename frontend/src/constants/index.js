import { Github, Code2, FileText, Sparkles, UserPlus, Database, LineChart, LogInIcon, Code, Webhook, Layers, Trophy, Bell } from "lucide-react";

const LOGO_URL = "/Images/logo.png";

const LANGUAGE_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#6366f1', '#ef4444', '#a21caf', '#14b8a6', '#eab308', '#64748b', '#db2777', '#0ea5e9', '#22d3ee'];

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PLATFORMS_CONFIG = [
    { value: 'leetcode', label: 'LeetCode', color: 'from-orange-500 to-orange-600', placeholder: 'leetcode_username' },
    { value: 'github', label: 'GitHub', color: 'from-gray-700 to-gray-900', placeholder: 'github_username' },
    { value: 'gfg', label: 'GeeksForGeeks', color: 'from-green-500 to-green-600', placeholder: 'geeksforgeeks_username' },
    { value: 'hackerrank', label: 'HackerRank', color: 'from-green-400 to-green-500', placeholder: 'hackerrank_username' },
    { value: 'codechef', label: 'CodeChef', color: 'from-yellow-600 to-yellow-700', placeholder: 'codechef_username' },
    { value: 'code360', label: 'Code360', color: 'from-blue-700 to-blue-900', placeholder: 'code360_username' },
    { value: 'interviewbit', label: 'InterviewBit', color: 'from-blue-700 to-blue-900', placeholder: 'interviewbit_username' },
];

const DEFAULT_USERS = [
    { name: "Alex", profile: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100" },
    { name: "Sarah", profile: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    { name: "James", profile: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=100" }
];

const LANDING_FEATURES = [
    {
        icon: Github,
        title: "GitHub Analysis",
        description:
            "Analyze your repository contributions, work consistency and project diversity to showcase your development expertise.",
        items: [
            "Contribution patterns",
            "Language proficiency",
            "Performance score",
        ],
    },
    {
        icon: Code2,
        title: "Centralized Dashboard",
        description:
            "Track your problem-solving progress across LeetCode, GeeksForGeeks, and other competitive programming platforms in a single place.",
        items: [
            "Problem-solving patterns",
            "Difficulty progression",
            "Shareable public link",
        ],
    },
    {
        icon: FileText,
        title: "Resume Analysis",
        description:
            "Get detailed feedback on your resume with keyword optimization, ATS compatibility, and content suggestions.",
        items: [
            "ATS score and optimization",
            "Industry-specific improvements",
            "Impact statement enhancement",
        ],
    },
    {
        icon: Sparkles,
        title: "Customizable themes",
        description:
            "Customize the theme for this application so that it matches your personality and preferences.",
        items: [
            "Theme customization",
            "Color scheme options",
            "Dark/Light mode",
        ],
    },
    {
        icon: Webhook,
        title: "Public APIs",
        description: "Use Codefolio public APIs to get your coding data in your own applications.",
        items: [
            "Coding data availability",
            "Daily 100 API Points per project",
            "Easy Integration using API Key",
        ],
    },
    {
        icon: Code,
        title: "LeetCode Analysis",
        description: "Analyze your leetcode profile, and get detailed feedback on your problem-solving skills.",
        items: [
            "Problem-solving patterns",
            "Difficulty progression",
            "Performance score",
        ],
    }
];

const HACKERRANK_ICONS = {
    "Problem Solving": "https://hrcdn.net/fcore/assets/badges/problem-solving-ecaf59a612.svg",
    "C++": "https://hrcdn.net/fcore/assets/badges/cpp-739b350881.svg",
    "Java": "https://hrcdn.net/fcore/assets/badges/java-9d05b1f559.svg",
    "Python": "https://hrcdn.net/fcore/assets/badges/python-f70befd824.svg",
    "30 Days of Code": "https://hrcdn.net/fcore/assets/badges/30-days-of-code-a772ae4c2f.svg",
    "10 Days of JS": "https://hrcdn.net/fcore/assets/badges/10-days-of-javascript-94ff22d1c9.svg",
    "10 Days of Statistics": "https://hrcdn.net/fcore/assets/badges/10-days-of-statistics-94ff22d1c9.svg",
    "Sql": "https://hrcdn.net/fcore/assets/badges/sql-89e76e7082.svg",
    "C": "https://hrcdn.net/fcore/assets/badges/c-d1985901e6.svg",
    "Ruby": "https://hrcdn.net/fcore/assets/badges/ruby-b2c8eababe.svg",
    "default": "/Images/Default/badge.png",
}

const HOW_IT_WORKS_STEPS = [
    {
        icon: LogInIcon,
        title: "Authentication",
        description: "Create an account or login in out platform."
    },
    {
        icon: UserPlus,
        title: "Connect Profiles",
        description: "Go to links section and enter your usernames for GitHub, LeetCode, HackerRank, GeeksforGeeks and other major platforms."
    },
    {
        icon: Database,
        title: "We Analyze Data",
        description: "Our secure engine fetches, aggregates, and processes your publicly available coding statistics."
    },
    {
        icon: LineChart,
        title: "Get Insights",
        description: "View your unified dashboard, and share it using a public link."
    }
];

const TESTIMONIALS = [
    {
        name: "Ashok Bhatt",
        role: "Aspiring Software Engineer",
        avatar: "/Images/Testimonials/Ashok_Bhatt.png",
        quote: "CodeFolio is a great platforms, I really loved especially that centralized coding dashboard with public link. I can share my profile with anyone using this.",
        rating: 5,
    },
    {
        name: "Vrajesh Pandya",
        role: "Full Stack AI Engineer",
        avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100",
        quote: "The analyzers in CodeFolio are very accurate. I reguarly see the analytics for my GitHub profile and Resume. It helps me to improve my profile and get more opportunities.",
        rating: 5,
    },
    {
        name: "Shivam Patel",
        role: "Software Engineer",
        avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100",
        quote: "The personalized AI recommendations actually suggested the exact skill gap I needed to fill to land my current role. Highly recommended starting point! The only thing I would like to suggest is to add more platforms to the list.",
        rating: 4,
    },
    {
        name: "Kartik Varia",
        role: "Software Engineer",
        avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100",
        quote: "Having my GitHub contributions and LeetCode stats tracked in one beautiful dashboard makes it so simple to share my overall progress with recruiters. However, it would have been great if the statistics for Codeforces was added too.",
        rating: 4,
    },
    {
        name: "Priyansh Dabhi",
        role: "Mobile Application Developer",
        avatar: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=100",
        quote: "Great platform, excellent user interface and features. I really liked the centralized coding dashboard with public link.",
        rating: 5,
    },
];

const ROADMAP_ITEMS = [
    {
        icon: Layers,
        title: "New Platforms",
        description: "We are expanding our data engine to include more competitive programming environments.",
        items: ["Codeforces & Atcoder", "HackerEarth & TopCoder", "Kaggle Integration"]
    },
    {
        icon: Trophy,
        title: "Global Board",
        description: "Compete with the best developers worldwide on our unified public leaderboard.",
        items: ["Cross-platform Ranking", "Skills Verification", "Community Badges"]
    },
    {
        icon: Bell,
        title: "Contest Hub",
        description: "Never miss a competition again with our centralized notification center.",
        items: ["Real-time Alerts", "Platform Subscriptions", "Calendar Sync"]
    }
];

const LANDING_PAGE_NAVBAR_ITEMS = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Upcoming Changes", href: "#upcoming-changes" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
];

export {
    LANGUAGE_COLORS,
    MONTH_NAMES,
    PLATFORMS_CONFIG,
    DEFAULT_USERS,
    LANDING_FEATURES,
    HACKERRANK_ICONS,
    HOW_IT_WORKS_STEPS,
    TESTIMONIALS,
    ROADMAP_ITEMS,
    LOGO_URL,
    LANDING_PAGE_NAVBAR_ITEMS
};