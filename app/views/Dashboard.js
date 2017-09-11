import DisksView from './DisksView'
import TempView from './TempView'

const Dashboard = Backbone.Marionette.View.extend({
  initialize: function (options) {
    this.disks = options.disks
  },

  regions: {
    'temp': '.temp',
    'disk': '.disk'
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

    this.disks.fetch({
      success: function (data) {
        self.showChildView('disk', new DisksView({ collection: data }))
      }
    })
  }
})

export default Dashboard
