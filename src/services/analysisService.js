const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
const ACCEPTED_FILE_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-word',
])

const MIN_JOB_DESCRIPTION_LENGTH = 80

function validateResumeFile(file) {
  if (!file) {
    return 'Please upload a resume file.'
  }

  const mimeType = file.type || ''
  const extension = file.name.split('.').pop()?.toLowerCase()
  const isSupportedExtension = extension === 'pdf' || extension === 'doc' || extension === 'docx'

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
    return 'Please provide a job description.'
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

function simulateAnalysisRequest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'queued',
        message: 'Resume ready for analysis.',
      })
    }, 1200)
  })
}

export {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE_BYTES,
  MIN_JOB_DESCRIPTION_LENGTH,
  simulateAnalysisRequest,
  validateAnalysisForm,
}
