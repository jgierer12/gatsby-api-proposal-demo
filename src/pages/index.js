import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { request } from 'graphql-request'

import Layout from '../components/layout'
import Header from '../components/header'
import Filters from '../components/filters'
import Products from '../components/products'

const defaultValues = {
  maxPrice: 100000,
  category: `//gi`,
  limit: 16,
}

export const query = graphql`
  query {
    allProduct(
      limit: 16
      filter: {
        random: { number: { lte: 100000000 } }
        commerce: { department: { regex: "//gi" } }
      }
    ) {
      totalCount
      products: edges {
        product: node {
          id
          commerce {
            productName
            department
          }
          random {
            number
          }
          lorem {
            sentence
          }
        }
      }
    }
  }
`

const dynamicQuery = ({ maxPrice, category, limit }) => `
  query {
    allProduct(
      limit: ${limit}
      filter: {
        random: { number: { lte: ${maxPrice} } }
        commerce: { department: { regex: "${category}" } }
      }
    ) {
      totalCount
      products: edges {
        product: node {
          id
          commerce {
            productName
            department
          }
          random {
            number
          }
          lorem {
            sentence
          }
        }
      }
    }
  }
`

export default function IndexPage({ data }) {
  const [products, setProducts] = useState(data.allProduct.products)
  const [productCount, setProductCount] = useState({
    total: data.allProduct.totalCount,
    limit: defaultValues.limit,
  })

  const filterProducts = async filters => {
    try {
      const filterQuery = dynamicQuery(filters)
      const data = await request(process.env.GATSBY_API_URL, filterQuery)
      setProducts(data.allProduct.products)
      setProductCount({
        total: data.allProduct.totalCount,
        limit: filters.limit,
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Layout>
      <Header totalCount={productCount.total} limit={productCount.limit} />
      <Filters filterProducts={filterProducts} defaultValues={defaultValues} />
      <Products products={products} />
    </Layout>
  )
}
