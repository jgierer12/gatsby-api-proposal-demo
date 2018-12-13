import React, { useState } from 'react'

import './filters.css'

export default function Filters({ filterProducts, defaultValues }) {
  const [filters, setFilters] = useState(defaultValues)

  const handleChange = filter => e =>
    setFilters({ ...filters, [filter]: e.target.value })

  return (
    <div className="filters">
      <label>
        Max Price (cents):{` `}
        <input
          type="number"
          min="0"
          value={filters.maxPrice}
          onChange={handleChange(`maxPrice`)}
        />
      </label>
      <label>
        Category (regex):{` `}
        <input
          type="text"
          value={filters.category}
          onChange={handleChange(`category`)}
        />
      </label>
      <label>
        Limit:{` `}
        <input
          type="number"
          min="1"
          value={filters.limit}
          onChange={handleChange(`limit`)}
        />
      </label>
      <button onClick={() => filterProducts(filters)}>Filter</button>
    </div>
  )
}
