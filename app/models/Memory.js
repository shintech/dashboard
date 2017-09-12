var Memory = Backbone.Model.extend({
  urlRoot: 'http://192.168.0.101:8000/memory',
  parse: function (data) {
    return data.body
  }
})

export default Memory
