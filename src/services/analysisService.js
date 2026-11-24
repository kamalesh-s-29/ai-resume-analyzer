const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
const ACCEPTED_FILE_TYPES = new Set(['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])

const MIN_JOB_DESCRIPTION_LENGTH = 80
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.PROD ? '' : 'http://localhost:3001')

function validateResumeFile(file) {
  if (!file) {
    return 'Please upload a resume file.'
  }

  const mimeType = file.type || ''
  const extension = file.name.split('.').pop()?.toLowerCase()
  const isSupportedExtension = extension === 'pdf' || extension === 'docx'

  if (!isSupportedExtension && !ACCEPTED_FILE_TYPES.has(mimeType)) {
    return 'Unsupported file type. Please upload a PDF or DOCX resume.'
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return 'Resume file is too large. Please upload a file smaller than 5 MB.'
  }

  return ''
}

function validateJobTitle(jobTitle) {
  if (!jobTitle.trim()) {
    return 'Please enter a target job title.'
  }

  return ''
}

function validateJobDescription(jobDescription) {
  if (!jobDescription.trim()) {
    return ''
  }

  if (jobDescription.trim().length < MIN_JOB_DESCRIPTION_LENGTH) {
    return 'Job description is too short. Please add more detail.'
  }

  return ''
}

function validateAnalysisForm({ selectedFile, jobTitle, jobDescription }) {
  const errors = {
    resume: validateResumeFile(selectedFile),
    jobTitle: validateJobTitle(jobTitle),
    jobDescription: validateJobDescription(jobDescription),
  }

  return {
    errors,
    isValid: !Object.values(errors).some(Boolean),
  }
}

async function analyzeResume({ selectedFile, jobTitle, jobDescription }) {
  const formData = new FormData()
  formData.append('resume', selectedFile)
  formData.append('targetJobTitle', jobTitle)
  formData.append('jobDescription', jobDescription)

  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: 'POST',
    body: formData,
  })
  const result = await response.json()

  if (!response.ok || !result.success || !result.analysis) {
    if (response.status === 429 || result.code === 'QUOTA_EXCEEDED') {
      throw new Error(result.message || 'AI usage limit reached. Please wait a moment and try again.')
    }

    throw new Error(result.message || 'Resume analysis failed.')
  }

  return result.analysis
}

export {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE_BYTES,
  MIN_JOB_DESCRIPTION_LENGTH,
  analyzeResume,
  validateAnalysisForm,
}
