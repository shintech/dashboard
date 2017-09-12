const CPUView = Backbone.Marionette.View.extend({
  template: require('../templates/cpu-view-template.html'),
  initialize: function (options) {
    this.cpu = options.cpu.cpu
  },

  serializeData: function () {
    return {
      cpu: this.cpu
    }
  }
})

export default CPUView
