const TempView = Backbone.Marionette.View.extend({
  template: require('../templates/temp-view-template.html'),
  li: 'div',
  initialize: function (options) {
    this.temp = options.temp
  },
  serializeData: function (data) {
    return {
      fahrenheit: round(this.temp.fahrenheit, 2),
      celcius: round(this.temp.celcius, 2)
    }
  }
})

function round (value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

export default TempView
