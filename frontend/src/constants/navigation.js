import { Code, Github, FileUser, BookOpen, FolderDot, HelpCircle, UserRoundPen, Palette, Link, CircleUserRound } from 'lucide-react';

export const ANALYZER_NAV_ITEMS = [
  {
    name: 'LeetCode',
    path: '/analyzer/leetcode',
    Icon: Code,
  },
  {
    name: 'GitHub',
    path: '/analyzer/github',
    Icon: Github,
  },
  {
    name: 'Resume',
    path: '/analyzer/resume',
    Icon: FileUser,
  },
];

export const PUBLIC_APIS_NAV_ITEMS = [
  {
    name: 'Documentation',
    path: '/public-apis/documentation',
    Icon: BookOpen,
  },
  {
    name: 'Projects',
    path: '/public-apis/projects',
    Icon: FolderDot,
  },
  {
    name: 'FAQ',
    path: '/public-apis/faq',
    Icon: HelpCircle,
  },
];

export const SETTINGS_NAV_ITEMS = [
  {
    name: 'Profile Info',
    path: '/settings/profile',
    Icon: UserRoundPen,
  },
  {
    name: 'Appearance',
    path: '/settings/appearance',
    Icon: Palette,
  },
  {
    name: 'Manage Links',
    path: '/settings/links',
    Icon: Link,
  },
  {
    name: 'Account',
    path: '/settings/account',
    Icon: CircleUserRound,
  },
];
