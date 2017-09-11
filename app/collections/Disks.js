import Disk from '../models/Disk'

const Disks = Backbone.Collection.extend({
  model: Disk,
  url: 'http://192.168.0.101:8000/disk',
  parse: function (data) {
    return data.body
  }
})

export default Disks
