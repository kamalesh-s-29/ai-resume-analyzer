const mockAnalysis = {
  targetJobTitle: 'Java Backend Developer',
  resumeName: 'resume.pdf',
  analysisDate: '2026-08-31 10:45 AM',
  atsScore: 82,
  status: 'Good Match',
  scores: {
    skillMatch: 87,
    keywordMatch: 84,
    formatting: 92,
    experience: 76,
  },
  matchedSkills: ['Java', 'Spring Boot', 'REST APIs', 'SQL', 'Git', 'OOP'],
  missingSkills: ['Docker', 'AWS', 'Kubernetes', 'Microservices'],
  keywordCoverage: 84,
  matchedKeywords: ['Java', 'Spring Boot', 'REST', 'SQL', 'Git'],
  missingKeywords: ['Docker', 'AWS', 'Microservices', 'Kubernetes'],
  strengths: [
    'Strong technical foundation in Java and backend architecture.',
    'Relevant project experience with API development and database integration.',
    'Good use of technical keywords aligned to the target role.',
    'Clear education and certifications section.',
    'Consistent resume formatting and readable structure.',
  ],
  suggestions: [
    'Add measurable impact statements to your project descriptions.',
    'Mention Docker and AWS experience if relevant to your background.',
    'Add job-specific keywords naturally in the summary and project bullets.',
    'Strengthen the professional summary with clearer role alignment.',
    'Highlight technologies used in each project with more specific detail.',
  ],
  sectionScores: {
    summary: 78,
    skills: 91,
    projects: 86,
    education: 90,
    experience: 72,
  },
  chartData: [
    { name: 'Skills', value: 87 },
    { name: 'Keywords', value: 84 },
    { name: 'Experience', value: 76 },
    { name: 'Formatting', value: 92 },
    { name: 'Projects', value: 86 },
  ],
  skillGapData: [
    { name: 'Matched', value: 68 },
    { name: 'Missing', value: 32 },
  ],
}

export default mockAnalysis
