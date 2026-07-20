import { useState } from 'react'
import AuthForm from './components/AuthForm.jsx'
import Dashboard from './components/Dashboard.jsx'

const STORAGE_KEY = 'taskmanager_auth'

function loadStoredAuth() {
  const saved = sessionStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : null
}

export default function App() {
  const [auth, setAuth] = useState(loadStoredAuth)

  function handleAuthed(data) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setAuth(data)
  }

  function handleLogout() {
    sessionStorage.removeItem(STORAGE_KEY)
    setAuth(null)
  }

  return auth ? (
    <Dashboard auth={auth} onLogout={handleLogout} />
  ) : (
    <AuthForm onAuthed={handleAuthed} />
  )
}
