import React from 'react'

const classes = [
  {
    id: 1,
    title: 'Mathematics Fundamentals',
    grade: 'Grade 8 - 9',
    schedule: 'Mon & Wed · 5:00 PM',
    instructor: 'Mr. Fernando'
  },
  {
    id: 2,
    title: 'Science Lab Concepts',
    grade: 'Grade 9 - 10',
    schedule: 'Tue & Thu · 6:00 PM',
    instructor: 'Ms. Perera'
  },
  {
    id: 3,
    title: 'English Writing Skills',
    grade: 'Grade 7 - 9',
    schedule: 'Saturday · 9:30 AM',
    instructor: 'Mrs. Silva'
  }
]

export default function Classes() {
  return (
    <section>
      <h1>Classes</h1>
      <p className="muted">Browse available classes and choose what matches your grade.</p>

      <div className="grid cards-grid">
        {classes.map((item) => (
          <article className="card class-card" key={item.id}>
            <h3>{item.title}</h3>
            <p><strong>Grade:</strong> {item.grade}</p>
            <p><strong>Schedule:</strong> {item.schedule}</p>
            <p><strong>Instructor:</strong> {item.instructor}</p>
            <button className="btn">Enroll</button>
          </article>
        ))}
      </div>
    </section>
  )
}
