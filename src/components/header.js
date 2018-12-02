import React from 'react'

const Header = ({ totalCount, limit }) => (
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

export default Header
