import DisksView from './DisksView'
import TempView from './TempView'
import MemoryView from './MemoryView'
import CPUView from './CPUView'

const Dashboard = Backbone.Marionette.View.extend({
  initialize: function (options) {
    this.disks = options.disks
    this.cpu = options.cpu
    this.memory = options.memory
    this.temp = options.temp
  },

  regions: {
    'temp': '.temp',
    'disk': '.disk',
    'memory': '.memory',
    'cpu': '.cpu'
  },

  template: require('../templates/dashboard-view-template.html'),
  onRender: function () {
    var self = this

    this.temp.fetch({
      success: function (data) {
        self.showChildView('temp', new TempView({ model: data }))
      }
    })

    this.memory.fetch({
      success: function (data) {
        self.showChildView('memory', new MemoryView({ model: data }))
      }
    })

    this.disks.fetch({
      success: function (data) {
        self.showChildView('disk', new DisksView({ collection: data }))
      }
    })

    this.cpu.fetch({
      success: function (data) {
        self.showChildView('cpu', new CPUView({ model: data }))
      }
    })
  }
})

export default Dashboard
