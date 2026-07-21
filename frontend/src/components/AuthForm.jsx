import { useState } from 'react'
import { authApi } from '../api.js'

export default function AuthForm({ onAuthed }) {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isLogin = mode === 'login'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = isLogin
        ? await authApi.login({ email, password })
        : await authApi.register({ name, email, password })
      onAuthed(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <p className="subtitle">{isLogin ? 'Sign in to your account' : 'Create a new account'}</p>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </>
          )}

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>
            Password {!isLogin && <span className="muted">(min 6 characters)</span>}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="error">{error}</div>}

          <button className="btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="muted" style={{ marginTop: 14 }}>
          {isLogin ? "Create new -> ? " : 'Already have an account? '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setMode(isLogin ? 'register' : 'login')
              setError('')
            }}
          >
            {isLogin ? 'Register' : 'Login'}
          </a>
        </p>
      </div>
    </div>
  )
}
