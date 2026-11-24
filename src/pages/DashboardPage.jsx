import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AtsScore from '../components/dashboard/AtsScore.jsx'
import DashboardHeader from '../components/dashboard/DashboardHeader.jsx'
import EmptyDashboardState from '../components/dashboard/EmptyDashboardState.jsx'
import KeywordAnalysis from '../components/dashboard/KeywordAnalysis.jsx'
import LoadingDashboard from '../components/dashboard/LoadingDashboard.jsx'
import ScoreBreakdownChart from '../components/dashboard/ScoreBreakdownChart.jsx'
import ScoreCard from '../components/dashboard/ScoreCard.jsx'
import SectionAnalysis from '../components/dashboard/SectionAnalysis.jsx'
import SkillGapChart from '../components/dashboard/SkillGapChart.jsx'
import SkillMatch from '../components/dashboard/SkillMatch.jsx'
import StrengthsList from '../components/dashboard/StrengthsList.jsx'
import SuggestionsList from '../components/dashboard/SuggestionsList.jsx'
import { getSession, clearSession, deleteResumeFile, isIndexedDBAvailable } from '../services/analysisSessionService.js'
import { ROUTES } from '../data/appConfig.js'

function toDashboardAnalysis(analysis, currentSession) {
  const safeAnalysis = analysis || {}
  const sectionAnalysis = Array.isArray(safeAnalysis.sectionAnalysis) ? safeAnalysis.sectionAnalysis : []
  const matchedSkills = Array.isArray(safeAnalysis.matchedSkills) ? safeAnalysis.matchedSkills : []
  const missingSkills = Array.isArray(safeAnalysis.missingSkills) ? safeAnalysis.missingSkills : []
  const keywordsFound = Array.isArray(safeAnalysis.keywordsFound) ? safeAnalysis.keywordsFound : []
  const keywordsMissing = Array.isArray(safeAnalysis.keywordsMissing) ? safeAnalysis.keywordsMissing : []
  const strengths = Array.isArray(safeAnalysis.strengths) ? safeAnalysis.strengths : []
  const suggestions = Array.isArray(safeAnalysis.suggestions) ? safeAnalysis.suggestions : []
  const sectionScores = Object.fromEntries(
    sectionAnalysis.map(({ section, score }) => [section, score]),
  )

  return {
    targetJobTitle: currentSession.jobTitle,
    resumeName: currentSession.resume.name,
    analysisDate: new Date(currentSession.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    atsScore: Number.isFinite(safeAnalysis.atsScore) ? safeAnalysis.atsScore : 0,
    status: safeAnalysis.atsScore >= 80 ? 'Strong Match' : safeAnalysis.atsScore >= 70 ? 'Good Match' : 'Needs Improvement',
    scores: {
      skillMatch: safeAnalysis.skillMatch ?? 0,
      keywordMatch: safeAnalysis.keywordMatch ?? 0,
      formatting: safeAnalysis.formattingScore ?? 0,
      experience: safeAnalysis.experienceScore ?? 0,
    },
    matchedSkills,
    missingSkills,
    keywordCoverage: safeAnalysis.keywordMatch ?? 0,
    matchedKeywords: keywordsFound,
    missingKeywords: keywordsMissing,
    strengths,
    suggestions,
    sectionScores,
    chartData: [
      { name: 'Skills', value: safeAnalysis.skillMatch ?? 0 },
      { name: 'Keywords', value: safeAnalysis.keywordMatch ?? 0 },
      { name: 'Experience', value: safeAnalysis.experienceScore ?? 0 },
      { name: 'Formatting', value: safeAnalysis.formattingScore ?? 0 },
    ],
    skillGapData: [
      { name: 'Matched', value: matchedSkills.length },
      { name: 'Missing', value: missingSkills.length },
    ],
  }
}

function DashboardPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [analysisData, setAnalysisData] = useState(null)
  const [session, setSession] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Get current session
      const currentSession = getSession()

      if (!currentSession) {
        // No active session - show empty state
        setAnalysisData(null)
        setSession(null)
        setIsLoading(false)
        return
      }

      setSession(currentSession)
      setAnalysisData(currentSession.analysis ? toDashboardAnalysis(currentSession.analysis, currentSession) : null)
      setIsLoading(false)
    }, 700)

    return () => clearTimeout(timer)
  }, [])

  const handleAnalyzeNewResume = async () => {
    // Clear session and resume file
    clearSession()

    if (isIndexedDBAvailable()) {
      try {
        await deleteResumeFile()
      } catch (error) {
        console.error('Failed to delete resume file:', error)
      }
    }

    // Navigate back to analyze page
    navigate(ROUTES.analyze)
  }

  const handleEditAnalysis = () => {
    // Open the form pre-filled with the last analysis inputs
    navigate(ROUTES.analyze, { state: { prefill: true } })
  }

  if (isLoading) {
    return <LoadingDashboard />
  }

  if (!analysisData || !session) {
    return <EmptyDashboardState onStartAnalysis={() => navigate(ROUTES.analyze)} />
  }

  const { atsScore, status, scores, matchedSkills, missingSkills, keywordCoverage, matchedKeywords, missingKeywords, strengths, suggestions, sectionScores, chartData, skillGapData, targetJobTitle, resumeName, analysisDate } = analysisData

  return (
    <div className="bg-slate-50 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <DashboardHeader
          targetJobTitle={targetJobTitle}
          resumeName={resumeName}
          analysisDate={analysisDate}
          status={status}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <AtsScore score={atsScore} label={status} />

          <div className="grid gap-4 sm:grid-cols-2">
            <ScoreCard label="Skill Match" value={scores.skillMatch} tone="indigo" />
            <ScoreCard label="Keyword Match" value={scores.keywordMatch} tone="blue" />
            <ScoreCard label="Formatting" value={scores.formatting} tone="emerald" />
            <ScoreCard label="Experience" value={scores.experience} tone="amber" />
          </div>
        </div>

        <div className="mt-8">
          <SkillMatch matchedSkills={matchedSkills} missingSkills={missingSkills} />
        </div>

        <div className="mt-8">
          <KeywordAnalysis
            keywordCoverage={keywordCoverage}
            matchedKeywords={matchedKeywords}
            missingKeywords={missingKeywords}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ScoreBreakdownChart data={chartData} />
          <SkillGapChart data={skillGapData} />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <StrengthsList strengths={strengths} />
          <SuggestionsList suggestions={suggestions} />
        </div>

        <div className="mt-8">
          <SectionAnalysis sectionScores={sectionScores} />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleEditAnalysis}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-base font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            ← Back to Edit Analysis
          </button>

          <button
            onClick={handleAnalyzeNewResume}
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Analyze New Resume
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
