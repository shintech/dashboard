import DiskView from './DiskView'

const DisksView = Backbone.Marionette.CollectionView.extend({
  childView: DiskView,
  tagName: 'ul'
})

export default DisksView
