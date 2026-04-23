import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/authApi'

// Matches backend user schema fields
const initialState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  grade: '',
  password: ''
}

export default function Register() {
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
      await register(form)
      setSubmitted(true)
      setForm(initialState)
      setTimeout(() => navigate('/login'), 800)
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-wrap">
      <div className="card auth-card">
        <h1>Register</h1>
        <p className="muted">Create your account for class enrollment.</p>

        <form onSubmit={handleSubmit} className="form-grid two-col">
          <label>
            First Name
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Last Name
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </label>

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
            Grade
            <select
              name="grade"
              value={form.grade}
              onChange={handleChange}
              required
            >
              <option value="">Select Grade</option>
              <option value="Grade 6">Grade 6</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
            </select>
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

          <div className="full-width">
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>

        {error && <p className="error-msg">{error}</p>}

        {submitted && (
          <p className="success-msg">
            Registration successful. Redirecting to login...
          </p>
        )}
      </div>
    </section>
  )
}
