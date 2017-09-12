import Memory from '../models/Memory'

var socket = io()

const MemoryView = Backbone.Marionette.View.extend({
  template: require('../templates/memory-view-template.html'),

  initialize: function (options) {
    socket.on('mem', data => {
      console.log('memory update...')
      this.model.set('free', data.free)
      this.model.set('total', data.total)
      this.model.set('used', data.used)
    })
  },

  model: Memory,

  modelEvents: {
    'change': 'render'
  },

  serializeData: function () {
    return {
      free: this.model.get('free'),
      total: this.model.get('total'),
      used: this.model.get('used')
    }
  }
})

export default MemoryView
