import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authApi'

const initialState = {
  email: '',
  password: ''
}

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitted(false)
    setLoading(true)

    try {
      const data = await login(form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setSubmitted(true)
      setForm(initialState)
      setTimeout(() => navigate('/classes'), 500)
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-wrap">
      <div className="card auth-card">
        <h1>Login</h1>
        <p className="muted">Use your email and password to access your classes.</p>

        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </label>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {error && <p className="error-msg">{error}</p>}

        {submitted && (
          <p className="success-msg">Login successful. Redirecting to classes...</p>
        )}
      </div>
    </section>
  )
}
