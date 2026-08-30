export const APP_NAME = 'AI Resume Analyzer'

export const APP_TAGLINE =
  'Match your resume to a target job description and review a structured analysis.'

export const ROUTES = {
  home: '/',
  analyze: '/analyze',
  dashboard: '/dashboard',
  history: '/history',
}

export const NAV_LINKS = [
  { label: 'Home', to: ROUTES.home, end: true },
  { label: 'Analyze', to: ROUTES.analyze, end: false },
  { label: 'Dashboard', to: ROUTES.dashboard, end: false },
  { label: 'History', to: ROUTES.history, end: false },
]

export const PAGE_PLACEHOLDERS = {
  home: {
    title: 'Home',
    description:
      'Landing-page content will be added in a later module. This screen only confirms the Home route is wired.',
  },
  analyze: {
    title: 'Analyze',
    description:
      'Resume upload and job-description input will be added later. This screen only confirms the Analyze route is wired.',
  },
  dashboard: {
    title: 'Dashboard',
    description:
      'Analysis charts and insights will be added later. This screen only confirms the Dashboard route is wired.',
  },
  history: {
    title: 'History',
    description:
      'Past analyses will be listed here in a later module. This screen only confirms the History route is wired.',
  },
}
