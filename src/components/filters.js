import React from 'react'

import './filters.css'

const Filters = ({ inputAttrs, filterProducts }) => (
  <div className="filters">
    <label>
      Max Price (cents):{` `}
      <input type="number" min="0" {...inputAttrs(`maxPrice`)} />
    </label>
    <label>
      Category (regex):{` `}
      <input type="text" {...inputAttrs(`category`)} />
    </label>
    <label>
      Limit:{` `}
      <input type="number" min="1" {...inputAttrs(`limit`)} />
    </label>
    <button onClick={filterProducts}>Filter</button>
  </div>
)

export default Filters
