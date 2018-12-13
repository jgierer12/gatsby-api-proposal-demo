import React from 'react'

import './layout.css'

export default function Layout({ children }) {
  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children}
    </div>
  )
}
