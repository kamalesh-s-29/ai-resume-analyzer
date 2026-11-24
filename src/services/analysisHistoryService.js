const HISTORY_STORAGE_KEY = 'resumeAnalyzerHistory'

function createRecordId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function normalizeHistoryRecord(record, index) {
  if (!record || typeof record !== 'object' || !record.analysis || typeof record.analysis !== 'object') {
    return null
  }

  const analysis = record.analysis
  const createdAt = record.date || record.createdAt || new Date(0).toISOString()
  return {
    ...record,
    id: typeof record.id === 'string' && record.id ? record.id : `legacy-${createdAt}-${index}`,
    date: createdAt,
    jobTitle: record.jobTitle || record.targetJobTitle || 'Untitled role',
    jobDescription: typeof record.jobDescription === 'string' ? record.jobDescription : '',
    fileName: record.fileName || record.resumeName || 'Resume',
    atsScore: Number.isFinite(record.atsScore) ? record.atsScore : analysis.atsScore,
    skillMatch: Number.isFinite(record.skillMatch) ? record.skillMatch : analysis.skillMatch,
    keywordMatch: Number.isFinite(record.keywordMatch) ? record.keywordMatch : analysis.keywordMatch,
    analysis,
  }
}

function getHistory() {
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY)
    const history = stored ? JSON.parse(stored) : []
    if (!Array.isArray(history)) return []

    const ids = new Set()
    return history
      .map(normalizeHistoryRecord)
      .filter((record) => {
        if (!record || ids.has(record.id)) return false
        ids.add(record.id)
        return true
      })
  } catch (error) {
    console.error('Failed to retrieve analysis history:', error)
    return []
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
    return true
  } catch (error) {
    console.error('Failed to save analysis history:', error)
    return false
  }
}

function createHistoryRecord({ resumeName, targetJobTitle, jobDescription, createdAt, analysis }) {
  return {
    id: createRecordId(),
    date: createdAt,
    fileName: resumeName,
    jobTitle: targetJobTitle,
    jobDescription,
    resumeName,
    targetJobTitle,
    createdAt,
    atsScore: analysis.atsScore,
    skillMatch: analysis.skillMatch,
    keywordMatch: analysis.keywordMatch,
    analysis,
  }
}

function addHistoryRecord(record) {
  const history = getHistory()
  saveHistory([record, ...history])
  return record
}

function removeHistoryRecord(id) {
  const nextHistory = getHistory().filter((record) => record.id !== id)
  saveHistory(nextHistory)
  return nextHistory
}

export {
  addHistoryRecord,
  createHistoryRecord,
  getHistory,
  removeHistoryRecord,
}
