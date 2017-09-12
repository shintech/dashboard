import Temp from '../models/Temp'

var socket = io()

const TempView = Backbone.Marionette.View.extend({
  template: require('../templates/temp-view-template.html'),
  li: 'div',
  initialize: function (options) {
    socket.on('temp', data => {
      this.model.set('fahrenheit', data.fahrenheit)
      this.model.set('celcius', data.celcius)
    })
  },
  serializeData: function (data) {
    return {
      fahrenheit: this.model.get('fahrenheit'),
      celcius: this.model.get('celcius')
    }
  },
  model: Temp,
  modelEvents: {
    'change': 'render'
  }
})

export default TempView
