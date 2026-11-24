/**
 * Analysis Session Service
 * Manages the current analysis session data
 * Persists to sessionStorage for temporary session-scoped storage
 */

const SESSION_STORAGE_KEY = 'resumeAnalyzerSession'
const DB_NAME = 'ResumeAnalyzerDB'
const DB_STORE_NAME = 'resumes'

/**
 * Get the current analysis session from sessionStorage
 */
function getSession() {
  try {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to retrieve session from sessionStorage:', error)
  }
  return null
}

/**
 * Save the current analysis session to sessionStorage
 */
function saveSession(sessionData) {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData))
    return true
  } catch (error) {
    console.error('Failed to save session to sessionStorage:', error)
    return false
  }
}

/**
 * Clear the current analysis session
 */
function clearSession() {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Failed to clear session from sessionStorage:', error)
    return false
  }
}

/**
 * Create a new analysis session with the provided data
 */
function createSession({ jobTitle, jobDescription, resumeFile, analysis }) {
  const session = {
    resume: {
      name: resumeFile.name,
      type: resumeFile.type,
      size: resumeFile.size,
      lastModified: resumeFile.lastModified,
    },
    jobTitle,
    jobDescription,
    createdAt: new Date().toISOString(),
    status: 'new',
    analysis,
  }

  saveSession(session)
  return session
}

/**
 * Update the current session with new data
 */
function updateSession(updates) {
  const currentSession = getSession()
  if (!currentSession) {
    console.error('No active session to update')
    return null
  }

  const updatedSession = {
    ...currentSession,
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  saveSession(updatedSession)
  return updatedSession
}

/**
 * Store File/Blob in IndexedDB for persistence
 */
async function storeResumeFile(file) {
  try {
    const db = await openDatabase()
    const tx = db.transaction([DB_STORE_NAME], 'readwrite')
    const store = tx.objectStore(DB_STORE_NAME)

    const fileData = {
      id: 'currentResume',
      blob: file,
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      storedAt: new Date().toISOString(),
    }

    store.put(fileData)
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(true)
      tx.onerror = () => reject(tx.error)
    })
  } catch (error) {
    console.error('Failed to store resume file in IndexedDB:', error)
    // Graceful degradation - continue without IndexedDB
    return false
  }
}

/**
 * Retrieve File/Blob from IndexedDB
 */
async function getResumeFile() {
  try {
    const db = await openDatabase()
    const tx = db.transaction([DB_STORE_NAME], 'readonly')
    const store = tx.objectStore(DB_STORE_NAME)
    const request = store.get('currentResume')

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const fileData = request.result
        resolve(fileData ? fileData.blob : null)
      }
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error('Failed to retrieve resume file from IndexedDB:', error)
    return null
  }
}

/**
 * Delete File/Blob from IndexedDB
 */
async function deleteResumeFile() {
  try {
    const db = await openDatabase()
    const tx = db.transaction([DB_STORE_NAME], 'readwrite')
    const store = tx.objectStore(DB_STORE_NAME)

    store.delete('currentResume')
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(true)
      tx.onerror = () => reject(tx.error)
    })
  } catch (error) {
    console.error('Failed to delete resume file from IndexedDB:', error)
    return false
  }
}

/**
 * Open IndexedDB database
 */
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
        db.createObjectStore(DB_STORE_NAME, { keyPath: 'id' })
      }
    }
  })
}

/**
 * Check if IndexedDB is available
 */
function isIndexedDBAvailable() {
  return typeof indexedDB !== 'undefined'
}

export {
  getSession,
  saveSession,
  clearSession,
  createSession,
  updateSession,
  storeResumeFile,
  getResumeFile,
  deleteResumeFile,
  isIndexedDBAvailable,
}
