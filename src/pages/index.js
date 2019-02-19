import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { request } from 'graphql-request'

import Layout from '../components/layout'
import Header from '../components/header'
import Filters from '../components/filters'
import Products from '../components/products'

export const query = graphql`
  query($limit: Int, $maxPrice: Int, $category: String) {
    allProduct(
      limit: $limit
      filter: {
        random: { number: { lte: $maxPrice } }
        commerce: { department: { regex: $category } }
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

const dynamicQuery = `
  query($limit: Int, $maxPrice: Int, $category: String) {
    allProduct(
      limit: $limit
      filter: {
        random: { number: { lte: $maxPrice } }
        commerce: { department: { regex: $category } }
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

export default function IndexPage({ data, pageContext }) {
  const [products, setProducts] = useState(data.allProduct.products)
  const [productCount, setProductCount] = useState({
    total: data.allProduct.totalCount,
    limit: pageContext.limit,
  })

  const filterProducts = async filters => {
    try {
      const data = await request(
        process.env.GATSBY_API_URL,
        dynamicQuery,
        filters
      )
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
      <Filters filterProducts={filterProducts} defaultValues={pageContext} />
      <Products products={products} />
    </Layout>
  )
}
