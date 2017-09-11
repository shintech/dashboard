import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import favicon from 'serve-favicon'
import execa from 'execa'
import http from 'http'

const _pkg = require(path.join(path.dirname(__dirname), 'package.json'))
const _bootstrapDir = require.resolve('bootstrap').match(/.*\/node_modules\/[^/]+\//)[0]

var app = express()
var router = express.Router()
var server = http.Server(app)
var port = process.env['PORT']

app.use(favicon(path.join(__dirname, 'resources', 'images', 'favicon.png')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/css', express.static(path.join(_bootstrapDir, 'dist', 'css')))
app.use(express.static(path.join(__dirname, 'static')))
app.use(router)

router.route('/temp')
.get((req, res) => {
  execa.shell('/opt/vc/bin/vcgencmd measure_temp')
  .then(data => {
    data = data.stdout.split('=')
    data = data[1].split('\'')

    var f = data[0] * (9 / 5) + 32

    res.status(200)
    .json({
      celcius: data[0],
      fahrenheit: f
    })
  })
})

router.route('/disk')
.get((req, res) => {
  execa.shell('df -h')
  .then(data => {
    var body = []
    var rows = data.stdout.split('\n')
    rows = rows.slice(1, rows.length)

    for (let row of rows) {
      row = row.split(/\s+/)
      var retval = {
        fileSystem: row[0],
        size: row[1],
        used: row[2],
        avail: row[3],
        percent: row[4],
        mounted: row[5]
      }

      body.push(retval)
    }

    res.status(200)
    .json({
      body: body
    })
  })
})

server.on('request', (req, res) => {
  console.log(req.method, req.url)
})

server.on('listening', () => {
  console.log(`${_pkg.name} version ${_pkg.version} is listening on port ${port}...`)
})

server.listen(port)
