import Marionette from 'marionette'
import Disks from './collections/Disks'
import CPU from './models/CPU'
import Memory from './models/Memory'
import Temp from './models/Temp'
import Dashboard from './views/Dashboard'

const Controller = Marionette.Object.extend({
  initialize: function (options) {
    this.app = options.app
  },

  index: function () {
    var disks = new Disks()
    var cpu = new CPU()
    var memory = new Memory()
    var temp = new Temp()
    this.app.view.showChildView('main', new Dashboard({ disks: disks, cpu: cpu, memory: memory, temp: temp }))
  }
})

export default Controller
