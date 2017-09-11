import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import favicon from 'serve-favicon'
import http from 'http'
import router from './router'

const _pkg = require(path.join(path.dirname(__dirname), 'package.json'))
const _bootstrapDir = require.resolve('bootstrap').match(/.*\/node_modules\/[^/]+\//)[0]

var app = express()
var server = http.Server(app)
var port = process.env['PORT']

app.use(favicon(path.join(__dirname, 'resources', 'images', 'favicon.png')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/css', express.static(path.join(_bootstrapDir, 'dist', 'css')))
app.use(express.static(path.join(__dirname, 'static')))
app.use(router)

server.on('request', (req, res) => {
  console.log(req.method, req.url)
})

server.on('listening', () => {
  console.log(`${_pkg.name} version ${_pkg.version} is listening on port ${port}...`)
})

server.listen(port)
