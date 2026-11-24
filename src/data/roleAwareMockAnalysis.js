/**
 * Role-Aware Mock Analysis Generator
 * Generates mock analysis data based on the target job title
 * This is structured mock data for frontend prototyping - NOT real AI analysis
 */

/**
 * Generate mock analysis based on job title
 */
function generateMockAnalysis(jobTitle, resumeName = 'resume.pdf') {
  const jobTitleLower = jobTitle.toLowerCase()

  // Determine job category based on keywords in job title
  const isBackend =
    jobTitleLower.includes('backend') ||
    jobTitleLower.includes('java') ||
    jobTitleLower.includes('spring') ||
    jobTitleLower.includes('server')
  const isFrontend =
    jobTitleLower.includes('frontend') ||
    jobTitleLower.includes('react') ||
    jobTitleLower.includes('vue') ||
    jobTitleLower.includes('angular') ||
    jobTitleLower.includes('ui') ||
    jobTitleLower.includes('ux')
  const isDevOps =
    jobTitleLower.includes('devops') ||
    jobTitleLower.includes('kubernetes') ||
    jobTitleLower.includes('docker') ||
    jobTitleLower.includes('cloud')
  const isDataScience =
    jobTitleLower.includes('data') ||
    jobTitleLower.includes('scientist') ||
    jobTitleLower.includes('machine learning') ||
    jobTitleLower.includes('ml')
  const isQA =
    jobTitleLower.includes('qa') ||
    jobTitleLower.includes('test') ||
    jobTitleLower.includes('quality')

  // Get relevant skills based on job category
  let matchedSkills = ['Git', 'Problem Solving']
  let missingSkills = []

  if (isBackend) {
    matchedSkills.push('Java', 'Spring Boot', 'REST APIs', 'SQL', 'OOP')
    missingSkills = ['Docker', 'AWS', 'Kubernetes', 'Microservices', 'Kafka']
  } else if (isFrontend) {
    matchedSkills.push('React', 'JavaScript', 'HTML/CSS', 'TypeScript', 'State Management')
    missingSkills = ['Next.js', 'Testing Libraries', 'Accessibility', 'Performance Optimization']
  } else if (isDevOps) {
    matchedSkills.push('Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform')
    missingSkills = ['Prometheus', 'ELK Stack', 'ArgoCD', 'Helm Charts']
  } else if (isDataScience) {
    matchedSkills.push('Python', 'SQL', 'Statistics', 'Data Analysis', 'Pandas')
    missingSkills = ['TensorFlow', 'PyTorch', 'Deep Learning', 'NLP']
  } else if (isQA) {
    matchedSkills.push('Test Planning', 'Bug Tracking', 'Test Cases', 'Automation')
    missingSkills = ['Selenium', 'Performance Testing', 'Security Testing']
  } else {
    // Generic Software Developer
    matchedSkills.push('Java', 'Python', 'JavaScript', 'SQL', 'REST APIs', 'OOP')
    missingSkills = ['Docker', 'Kubernetes', 'AWS', 'Cloud Computing']
  }

  // Calculate scores based on matched/missing skills
  const matchedCount = matchedSkills.length
  const totalSkills = matchedCount + missingSkills.length
  const skillMatchScore = Math.min(95, Math.round((matchedCount / totalSkills) * 100))

  // Generate analysis date
  const now = new Date()
  const analysisDate = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Get relevant keywords
  let matchedKeywords = matchedSkills.slice(0, 5)
  let missingKeywords = missingSkills.slice(0, 4)

  // Determine ATS score based on job category and skills
  const baseAtsScore = 70
  const atsScore = Math.min(95, baseAtsScore + Math.round(skillMatchScore / 3))

  // Generate role-specific strengths and suggestions
  const { strengths, suggestions } = generateStrengthsAndSuggestions(jobTitleLower, matchedSkills, missingSkills)

  // Generate section scores
  const sectionScores = generateSectionScores(jobTitleLower)

  // Generate chart data
  const chartData = [
    { name: 'Skills', value: skillMatchScore },
    { name: 'Keywords', value: Math.max(60, skillMatchScore - 5) },
    { name: 'Experience', value: Math.max(65, skillMatchScore - 15) },
    { name: 'Formatting', value: 92 },
    { name: 'Projects', value: Math.max(70, skillMatchScore - 10) },
  ]

  // Generate skill gap data
  const skillGapData = [
    { name: 'Matched', value: matchedCount },
    { name: 'Missing', value: missingSkills.length },
  ]

  return {
    targetJobTitle: jobTitle,
    resumeName,
    analysisDate,
    atsScore,
    status: atsScore >= 80 ? 'Strong Match' : atsScore >= 70 ? 'Good Match' : 'Moderate Match',
    scores: {
      skillMatch: skillMatchScore,
      keywordMatch: Math.max(60, skillMatchScore - 5),
      formatting: 92,
      experience: Math.max(65, skillMatchScore - 15),
    },
    matchedSkills,
    missingSkills,
    keywordCoverage: Math.max(60, skillMatchScore - 5),
    matchedKeywords,
    missingKeywords,
    strengths,
    suggestions,
    sectionScores,
    chartData,
    skillGapData,
  }
}

/**
 * Generate role-specific strengths and suggestions
 */
function generateStrengthsAndSuggestions(jobTitleLower, matchedSkills, missingSkills) {
  let baseStrengths = [
    'Clear resume structure and formatting.',
    'Good use of technical keywords aligned to the target role.',
    'Consistent formatting and readable structure.',
  ]

  let baseSuggestions = [
    'Add measurable impact statements to your project descriptions.',
    'Strengthen the professional summary with clearer role alignment.',
    'Highlight technologies used in each project with more specific detail.',
  ]

  // Add role-specific content
  if (jobTitleLower.includes('backend') || jobTitleLower.includes('java')) {
    baseStrengths.unshift('Strong technical foundation in backend architecture.')
    baseSuggestions.unshift(`Add Docker/Kubernetes experience if relevant to your background.`)
  } else if (jobTitleLower.includes('frontend') || jobTitleLower.includes('react')) {
    baseStrengths.unshift('Relevant project experience with UI/UX implementation.')
    baseSuggestions.unshift('Emphasize responsive design and browser compatibility experience.')
  } else if (jobTitleLower.includes('devops') || jobTitleLower.includes('cloud')) {
    baseStrengths.unshift('Experience with infrastructure and deployment practices.')
    baseSuggestions.unshift('Specify cloud platforms and orchestration tools you have worked with.')
  } else if (jobTitleLower.includes('data') || jobTitleLower.includes('ml')) {
    baseStrengths.unshift('Strong foundation in data analysis and modeling.')
    baseSuggestions.unshift('Include specific datasets and analysis methodologies used.')
  }

  // Add missing skills suggestion
  if (missingSkills.length > 0) {
    baseSuggestions.push(`Consider adding ${missingSkills.slice(0, 2).join(' and ')} if you have experience with them.`)
  }

  return {
    strengths: baseStrengths.slice(0, 5),
    suggestions: baseSuggestions.slice(0, 5),
  }
}

/**
 * Generate section scores based on job category
 */
function generateSectionScores(jobTitleLower) {
  const baseScores = {
    summary: 78,
    skills: 91,
    projects: 86,
    education: 90,
    experience: 72,
  }

  // Adjust based on job category
  if (jobTitleLower.includes('senior') || jobTitleLower.includes('lead')) {
    baseScores.experience = 85
    baseScores.projects = 89
  }

  if (jobTitleLower.includes('entry') || jobTitleLower.includes('junior')) {
    baseScores.experience = 65
    baseScores.education = 95
  }

  return baseScores
}

export { generateMockAnalysis }
