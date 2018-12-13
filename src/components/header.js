import React from 'react'

export default function Header({ totalCount, limit }) {
  return (
    <>
      <h1>
        Products ({totalCount} results, limited to {limit} per page)
      </h1>
      <p>
        API running at{' '}
        <a href={process.env.GATSBY_API_URL}>
          <code>{process.env.GATSBY_API_URL}</code>
        </a>
      </p>
    </>
  )
}
