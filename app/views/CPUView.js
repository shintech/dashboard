import CPU from '../models/CPU'

var socket = io()

const CPUView = Backbone.Marionette.View.extend({
  template: require('../templates/cpu-view-template.html'),
  initialize: function (options) {
    var model = this.model

    socket.on('cpu', (data) => {
      model.set('cpu', data)
    })
  },

  model: CPU,

  modelEvents: {
    'change': 'render'
  },

  serializeData: function () {
    return {
      cpu: this.model.get('cpu')
    }
  }
})

export default CPUView
