const path = require(`path`)
const express = require(`express`)
const graphqlHTTP = require(`express-graphql`)
const cors = require(`cors`)

const { store } = require(`gatsby/dist/redux`)
const bootstrap = require(`gatsby/dist/bootstrap`)

const server = async program => {
  let { port, host } = program
  port = typeof port === `string` ? parseInt(port, 10) : port

  // bootstrap to ensure schema is in the store
  await bootstrap(program)

  const schema = store.getState().schema

  const app = express()
  app.use(cors())
  app.use(
    `/`,
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  )

  console.log(`Gatsby API server running at`, `http://${host}:${port}`)
  app.listen(port, host)
}

server({
  port: process.env.PORT || 8080,
  host: `0.0.0.0`,
  directory: __dirname,
  sitePackageJson: require(path.join(__dirname, `package.json`)),
  // make Gatsby think this is a normal `gatsby build` command
  _: [`build`],
})
