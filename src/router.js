import express from 'express'
import execa from 'execa'

var router = express.Router()

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

router.route('/memory')
.get((req, res) => {
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

    res.status(200)
    .json({
      body: retval
    })
  })
})

router.route('/cpu')
.get((req, res) => {
  execa.shell('iostat')
  .then(result => {
    result = result.stdout.split('\n')
    var cpu = round(100 - result[3].split(/\s+/)[6], 2)

    res.status(200)
    .json({
      cpu: cpu
    })
  })
})

function round (value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

export default router
