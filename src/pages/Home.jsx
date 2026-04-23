import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section>
      <div className="hero card">
        <p className="eyebrow">Online Learning Platform</p>
        <h1>Welcome to Class Portal</h1>
        <p className="muted">
          Join live and recorded sessions, track your grade-focused classes, and
          access all your learning resources in one place.
        </p>
        <div className="row">
          <Link className="btn" to="/classes">
            Explore Classes
          </Link>
          <Link className="btn btn-ghost" to="/register">
            Create Account
          </Link>
        </div>
      </div>
    </section>
  )
}
