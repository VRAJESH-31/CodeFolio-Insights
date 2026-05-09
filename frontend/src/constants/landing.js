import { Github, Code2, FileText, Sparkles, UserPlus, Database, LineChart, LogInIcon, Code, Webhook, Layers, Trophy, Bell } from 'lucide-react';

export const DEFAULT_USERS = [
  {
    name: 'Alex',
    profile: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100',
  },
  {
    name: 'Sarah',
    profile: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
  {
    name: 'James',
    profile: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=100',
  },
];

export const LANDING_FEATURES = [
  {
    icon: Github,
    title: 'GitHub Analysis',
    description: 'Analyze your repository contributions, work consistency and project diversity to showcase your development expertise.',
    items: ['Contribution patterns', 'Language proficiency', 'Performance score'],
  },
  {
    icon: Code2,
    title: 'Centralized Dashboard',
    description: 'Track your problem-solving progress across LeetCode, GeeksForGeeks, and other competitive programming platforms in a single place.',
    items: ['Problem-solving patterns', 'Difficulty progression', 'Shareable public link'],
  },
  {
    icon: FileText,
    title: 'Resume Analysis',
    description: 'Get detailed feedback on your resume with keyword optimization, ATS compatibility, and content suggestions.',
    items: ['ATS score and optimization', 'Industry-specific improvements', 'Impact statement enhancement'],
  },
  {
    icon: Sparkles,
    title: 'Customizable themes',
    description: 'Customize the theme for this application so that it matches your personality and preferences.',
    items: ['Theme customization', 'Color scheme options', 'Dark/Light mode'],
  },
  {
    icon: Webhook,
    title: 'Public APIs',
    description: 'Use Codefolio public APIs to get your coding data in your own applications.',
    items: ['Coding data availability', 'Daily 100 API Points per project', 'Easy Integration using API Key'],
  },
  {
    icon: Code,
    title: 'LeetCode Analysis',
    description: 'Analyze your leetcode profile, and get detailed feedback on your problem-solving skills.',
    items: ['Problem-solving patterns', 'Difficulty progression', 'Performance score'],
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    icon: LogInIcon,
    title: 'Authentication',
    description: 'Create an account or login in out platform.',
  },
  {
    icon: UserPlus,
    title: 'Connect Profiles',
    description: 'Go to links section and enter your usernames for GitHub, LeetCode, HackerRank, GeeksforGeeks and other major platforms.',
  },
  {
    icon: Database,
    title: 'We Analyze Data',
    description: 'Our secure engine fetches, aggregates, and processes your publicly available coding statistics.',
  },
  {
    icon: LineChart,
    title: 'Get Insights',
    description: 'View your unified dashboard, and share it using a public link.',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Ashok Bhatt',
    role: 'Aspiring Software Engineer',
    avatar: '/Images/Testimonials/Ashok_Bhatt.png',
    quote: 'CodeFolio is a great platforms, I really loved especially that centralized coding dashboard with public link. I can share my profile with anyone using this.',
    rating: 5,
  },
  {
    name: 'Vrajesh Pandya',
    role: 'Full Stack AI Engineer',
    avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100',
    quote: 'The analyzers in CodeFolio are very accurate. I reguarly see the analytics for my GitHub profile and Resume. It helps me to improve my profile and get more opportunities.',
    rating: 5,
  },
  {
    name: 'Shivam Patel',
    role: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100',
    quote: 'The personalized AI recommendations actually suggested the exact skill gap I needed to fill to land my current role. Highly recommended starting point! The only thing I would like to suggest is to add more platforms to the list.',
    rating: 4,
  },
  {
    name: 'Kartik Varia',
    role: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100',
    quote: 'Having my GitHub contributions and LeetCode stats tracked in one beautiful dashboard makes it so simple to share my overall progress with recruiters. However, it would have been great if the statistics for Codeforces was added too.',
    rating: 4,
  },
  {
    name: 'Priyansh Dabhi',
    role: 'Mobile Application Developer',
    avatar: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=100',
    quote: 'Great platform, excellent user interface and features. I really liked the centralized coding dashboard with public link.',
    rating: 5,
  },
];

export const ROADMAP_ITEMS = [
  {
    icon: Layers,
    title: 'New Platforms',
    description: 'We are expanding our data engine to include more competitive programming environments.',
    items: ['Codeforces & Atcoder', 'HackerEarth & TopCoder', 'Kaggle Integration'],
  },
  {
    icon: Trophy,
    title: 'Global Board',
    description: 'Compete with the best developers worldwide on our unified public leaderboard.',
    items: ['Cross-platform Ranking', 'Skills Verification', 'Community Badges'],
  },
  {
    icon: Bell,
    title: 'Contest Hub',
    description: 'Never miss a competition again with our centralized notification center.',
    items: ['Real-time Alerts', 'Platform Subscriptions', 'Calendar Sync'],
  },
];

export const LANDING_PAGE_NAVBAR_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'Upcoming Changes', href: '#upcoming-changes' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];
