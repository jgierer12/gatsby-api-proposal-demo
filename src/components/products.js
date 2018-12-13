import React from 'react'

import './products.css'

export default function Products({ products }) {
  return (
    <ul className="products">
      {products.map(({ product }) => (
        <li className="product" key={product.id}>
          <h2>{product.commerce.productName}</h2>
          <ul className="details">
            <li>${(product.random.number / 100).toFixed(2)}</li>
            <li>{product.commerce.department}</li>
          </ul>
          <p>{product.lorem.sentence}</p>
        </li>
      ))}
    </ul>
  )
}
