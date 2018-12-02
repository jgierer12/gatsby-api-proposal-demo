// proxy for `gatsby develop` to enable CORS
const { spawn } = require(`child_process`)
const express = require(`express`)
const cors = require(`cors`)
const proxy = require(`express-http-proxy`)

const app = express()
app.use(cors())
let running = false

console.log(`starting \`gatsby develop\``)
const gatsbyDevelop = spawn(`${__dirname}/node_modules/.bin/gatsby`, [
  `develop`,
  `--host`,
  `0.0.0.0`,
])
gatsbyDevelop.stdout.on(`data`, data => {
  if (data.toString().includes(`Compiled successfully`) && !running) {
    app.use(`/`, proxy(`http://0.0.0.0:8000`))

    const port = process.env.PORT || 9000
    app.listen(port)
    console.log(`listening on port ${port}`)

    running = true
  }
})
