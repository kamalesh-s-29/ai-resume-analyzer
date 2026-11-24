import { ArrowRight, LoaderCircle } from 'lucide-react'
import JobDescriptionInput from './JobDescriptionInput.jsx'
import JobTitleInput from './JobTitleInput.jsx'
import ResumeUpload from './ResumeUpload.jsx'
import AnalysisStatus from './AnalysisStatus.jsx'

function AnalysisForm({
  selectedFile,
  jobTitle,
  jobDescription,
  errors,
  isAnalyzing,
  successMessage,
  statusType = 'success',
  onFileSelect,
  onClearResume,
  onJobTitleChange,
  onJobDescriptionChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <ResumeUpload
        selectedFile={selectedFile}
        onFileSelect={onFileSelect}
        onClear={onClearResume}
        error={errors.resume}
      />

      <JobTitleInput value={jobTitle} onChange={onJobTitleChange} error={errors.jobTitle} />

      <JobDescriptionInput
        value={jobDescription}
        onChange={onJobDescriptionChange}
        error={errors.jobDescription}
      />

      <AnalysisStatus message={successMessage} type={statusType} />

      <button
        type="submit"
        disabled={isAnalyzing}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-400"
      >
        {isAnalyzing ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            Analyzing Resume...
          </>
        ) : (
          <>
            Analyze Resume
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  )
}

export default AnalysisForm
