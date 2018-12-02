import React from 'react'
import { graphql } from 'gatsby'
import { request } from 'graphql-request'

import Layout from '../components/layout'
import Header from '../components/header'
import Filters from '../components/filters'
import Products from '../components/products'

const defaultMaxPrice = 100000
const defaultCategory = `//gi`
const defaultLimit = 16

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

class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...this.getStateFromData(props.data),
      limit: defaultLimit,
      filters: {
        maxPrice: defaultMaxPrice,
        category: defaultCategory,
        limit: defaultLimit,
      },
    }

    this.inputAttrs = this.inputAttrs.bind(this)
    this.filterProducts = this.filterProducts.bind(this)
  }

  getStateFromData(data) {
    const { products = [], totalCount = 0 } = data.allProduct || {}
    return { products, totalCount }
  }

  inputAttrs(name) {
    return {
      value: this.state.filters[name],
      onChange: event => {
        const value = event.target.value
        this.setState(prevState => {
          return {
            filters: {
              ...prevState.filters,
              [name]: value,
            },
          }
        })
      },
    }
  }

  filterProducts() {
    const limit = this.state.filters.limit
    const filterQuery = dynamicQuery(this.state.filters)
    request(process.env.GATSBY_API_URL, filterQuery).then(data => {
      this.setState({ ...this.getStateFromData(data), limit })
    }, console.error)
  }

  render() {
    return (
      <Layout>
        <Header totalCount={this.state.totalCount} limit={this.state.limit} />
        <Filters
          inputAttrs={this.inputAttrs}
          filterProducts={this.filterProducts}
        />
        <Products products={this.state.products} />
      </Layout>
    )
  }
}

export default IndexPage
