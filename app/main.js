import App from 'backbone_app'
import Router from './router'

global.jQuery = require('jquery')
require('bootstrap')
require('./public/css/style.css')

const app = new App({ title: 'Default' })
const router = new Router({ app: app })

app.Router = router

app.start()

export default app
