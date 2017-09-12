import DisksView from './DisksView'
import TempView from './TempView'
import MemoryView from './MemoryView'
import CPUView from './CPUView'

const Dashboard = Backbone.Marionette.View.extend({
  initialize: function (options) {
    this.disks = options.disks
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

    $.ajax({
      type: 'GET',
      url: 'http://192.168.0.101:8000/temp',
      success: (data) => {
        self.showChildView('temp', new TempView({ temp: data }))
      }
    })

    $.ajax({
      type: 'GET',
      url: 'http://192.168.0.101:8000/memory',
      success: (data) => {
        self.showChildView('memory', new MemoryView({ mem: data }))
      }
    })

    this.disks.fetch({
      success: function (data) {
        self.showChildView('disk', new DisksView({ collection: data }))
      }
    })

    $.ajax({
      type: 'GET',
      url: 'http://192.168.0.101:8000/cpu',
      success: (data) => {
        self.showChildView('cpu', new CPUView({ cpu: data }))
      }
    })
  }
})

export default Dashboard
