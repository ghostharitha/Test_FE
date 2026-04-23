import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link nav-link-active' : 'nav-link'

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <h2 className="brand">Class Portal</h2>
        <nav className="nav">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/classes" className={linkClass}>
            Classes
          </NavLink>
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
          <NavLink to="/register" className={linkClass}>
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
