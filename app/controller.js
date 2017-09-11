import Marionette from 'marionette'
import Disks from './collections/Disks'
import Dashboard from './views/Dashboard'

const Controller = Marionette.Object.extend({
  initialize: function (options) {
    this.app = options.app
  },

  index: function () {
    var disks = new Disks()
    this.app.view.showChildView('main', new Dashboard({ disks: disks }))
  }
})

export default Controller
