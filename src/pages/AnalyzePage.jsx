import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AnalysisForm from '../components/analyze/AnalysisForm.jsx'
import { MAX_FILE_SIZE_BYTES, analyzeResume, validateAnalysisForm } from '../services/analysisService.js'
import {
  getSession,
  createSession,
  storeResumeFile,
  getResumeFile,
  isIndexedDBAvailable,
} from '../services/analysisSessionService.js'
import { addHistoryRecord, createHistoryRecord } from '../services/analysisHistoryService.js'
import { ROUTES } from '../data/appConfig.js'

function AnalyzePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedFile, setSelectedFile] = useState(null)
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [errors, setErrors] = useState({ resume: '', jobTitle: '', jobDescription: '' })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [statusType, setStatusType] = useState('success')

  // The form starts empty. Previous values are restored ONLY when the user
  // arrives via the dashboard's "Edit analysis" button (which sets state.prefill).
  useEffect(() => {
    if (!location.state?.prefill) return

    const existingSession = getSession()
    if (existingSession) {
      setJobTitle(existingSession.jobTitle || '')
      setJobDescription(existingSession.jobDescription || '')

      if (isIndexedDBAvailable()) {
        getResumeFile()
          .then((resumeBlob) => {
            if (resumeBlob && existingSession.resume) {
              setSelectedFile(
                new File([resumeBlob], existingSession.resume.name, {
                  type: existingSession.resume.type,
                  lastModified: existingSession.resume.lastModified,
                }),
              )
            }
          })
          .catch((error) => {
            console.error('Failed to restore resume file from IndexedDB:', error)
          })
      }
    }

    // Clear the flag so a page refresh gives a blank form again.
    navigate(location.pathname, { replace: true, state: null })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validationSummary = useMemo(
    () => ({
      resume: selectedFile ? `${selectedFile.name} · ${Math.ceil(selectedFile.size / 1024)} KB` : 'No file selected',
      jobTitle: jobTitle || 'Not provided',
      jobDescription: jobDescription.trim() ? `${jobDescription.trim().length} characters` : 'Not provided',
    }),
    [jobDescription, jobTitle, selectedFile],
  )

  const handleResumeSelect = (file) => {
    const currentErrors = validateAnalysisForm({ selectedFile: file, jobTitle, jobDescription }).errors

    setSelectedFile(file)
    setErrors((previousErrors) => ({
      ...previousErrors,
      resume: currentErrors.resume,
    }))

    if (!currentErrors.resume) {
      setSuccessMessage('')
    }
  }

  const handleClearResume = () => {
    setSelectedFile(null)
    setErrors((previousErrors) => ({
      ...previousErrors,
      resume: 'Please upload a resume file.',
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSuccessMessage('')
    setStatusType('success')

    const { errors: nextErrors, isValid } = validateAnalysisForm({
      selectedFile,
      jobTitle,
      jobDescription,
    })

    setErrors(nextErrors)

    if (!isValid) {
      return
    }

    setIsAnalyzing(true)

    try {
      // Save the session before starting analysis
      const analysis = await analyzeResume({ selectedFile, jobTitle, jobDescription })
      const session = createSession({ jobTitle, jobDescription, resumeFile: selectedFile, analysis })
      addHistoryRecord(
        createHistoryRecord({
          resumeName: selectedFile.name,
          targetJobTitle: jobTitle.trim(),
          jobDescription: jobDescription.trim(),
          createdAt: session.createdAt,
          analysis,
        }),
      )
      // Store resume file in IndexedDB if available
      if (isIndexedDBAvailable()) {
        try {
          await storeResumeFile(selectedFile)
        } catch (error) {
          console.error('Failed to store resume in IndexedDB:', error)
          // Continue without IndexedDB storage
        }
      }

      // Navigate to dashboard after successful analysis
      navigate(ROUTES.dashboard)
    } catch (error) {
      console.error('Analysis failed:', error)
      setStatusType('error')
      setSuccessMessage(error.message || 'Analysis failed. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="bg-slate-50 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">Analysis setup</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Prepare your resume for targeted feedback.
              </h1>
            </div>

            <AnalysisForm
              selectedFile={selectedFile}
              jobTitle={jobTitle}
              jobDescription={jobDescription}
              errors={errors}
              isAnalyzing={isAnalyzing}
              successMessage={successMessage}
              statusType={statusType}
              onFileSelect={handleResumeSelect}
              onClearResume={handleClearResume}
              onJobTitleChange={(nextValue) => {
                setJobTitle(nextValue)
                setErrors((previousErrors) => ({ ...previousErrors, jobTitle: '' }))
                setSuccessMessage('')
              }}
              onJobDescriptionChange={(nextValue) => {
                setJobDescription(nextValue)
                setErrors((previousErrors) => ({ ...previousErrors, jobDescription: '' }))
                setSuccessMessage('')
              }}
              onSubmit={handleSubmit}
            />
          </section>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">Submission details</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">Current form summary</h2>

              <dl className="mt-5 space-y-4 text-sm text-slate-600">
                <div>
                  <dt className="font-medium text-slate-500">Resume</dt>
                  <dd className="mt-1 text-slate-900">{validationSummary.resume}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">Target job title</dt>
                  <dd className="mt-1 text-slate-900">{validationSummary.jobTitle}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">Job description</dt>
                  <dd className="mt-1 text-slate-900">{validationSummary.jobDescription}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">Max file size</dt>
                  <dd className="mt-1 text-slate-900">{Math.round(MAX_FILE_SIZE_BYTES / 1024 / 1024)} MB</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default AnalyzePage
