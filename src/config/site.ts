export const SITE_CONFIG = {
  name: 'Ben Salcie',
  title: 'Ben Salcie — Full-Stack Developer',
  description:
    'Full-stack developer based in Tauranga, NZ. CS + Marketing dual-degree. Building fast, considered web experiences with Astro, React, and TypeScript.',
  url: 'https://bensalcie.dev',
  author: 'Ben Salcie',
  jobTitle: 'Full-Stack Developer',
  location: 'Tauranga, New Zealand',
  email: 'hello@bensalcie.dev',
  availability: 'Open to NZ-wide remote',
  university: 'University of Waikato',
  graduationYear: 2027,
  degree: 'CS + Marketing dual degree',
  currentRole: 'Full-stack developer at a medical practice software company',
  stack: 'PHP, Laravel, Vue.js',
} as const;

export const NAV_LINKS = [
  { label: 'Work', href: '#work', isCta: false },
  { label: 'About', href: '#about', isCta: false },
  { label: 'Contact', href: '#contact', isCta: true },
] as const;

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/bensalcie', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/bensalcie',
    icon: 'linkedin',
  },
] as const;
