import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
// import path from 'path'

import config from '../webpack.config'

const app = express()
const compiler = webpack(config)

const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? process.env.PORT : 3000
// const distPath = path.resolve(__dirname, '../dist') // production

// app.use('/', express.static(distPath)) // production

app.use(webpackMiddleware(compiler, { // development
  publicPath: '/'
}))

app.listen(port, () => {
  console.log('Server running on port ' + port)
})
