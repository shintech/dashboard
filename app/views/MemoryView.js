const MemoryView = Backbone.Marionette.View.extend({
  template: require('../templates/memory-view-template.html'),

  initialize: function (options) {
    this.mem = options.mem
  },

  serializeData: function () {
    return {
      free: this.mem.body.free,
      total: this.mem.body.total,
      used: this.mem.body.used
    }
  }
})

export default MemoryView
