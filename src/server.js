import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import favicon from 'serve-favicon'
import http from 'http'
import socket from 'socket.io'
import router from './router'
import execa from 'execa'

const _pkg = require(path.join(path.dirname(__dirname), 'package.json'))
const _bootstrapDir = require.resolve('bootstrap').match(/.*\/node_modules\/[^/]+\//)[0]

var app = express()
var server = http.Server(app)
var port = process.env['PORT']
var io = socket.listen(server)

app.use(favicon(path.join(__dirname, 'resources', 'images', 'favicon.png')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/css', express.static(path.join(_bootstrapDir, 'dist', 'css')))
app.use(express.static(path.join(__dirname, 'static')))
app.use(router(io))

setInterval(() => {
  execa.shell('iostat')
    .then(result => {
      result = result.stdout.split('\n')
      var cpu = round(100 - result[3].split(/\s+/)[6], 2)
      io.sockets.emit('cpu', cpu)
    })
}, 1000)

setInterval(() => {
  execa.shell('free -h')
    .then(result => {
      var rows = result.stdout.split('\n')
      rows = rows.slice(1, rows.length)

      var row = rows[0].split(/\s+/)

      var retval = {
        total: row[1],
        used: row[2],
        free: row[3]
      }

      io.sockets.emit('mem', retval)
    })
}, 1000)

setInterval(() => {
  execa.shell('/opt/vc/bin/vcgencmd measure_temp')
  .then(data => {
    data = data.stdout.split('=')
    data = data[1].split('\'')

    var f = data[0] * (9 / 5) + 32
    var retval = {
      fahrenheit: round(f, 2),
      celcius: round(data[0], 2)
    }

    io.sockets.emit('temp', retval)
  })
}, 1000)

server.on('request', (req, res) => {
  console.log(req.method, req.url)
})

server.on('listening', () => {
  console.log(`${_pkg.name} version ${_pkg.version} is listening on port ${port}...`)
})

server.listen(port)

function round (value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}
