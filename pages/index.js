import $ from 'jquery/dist/jquery'
window.$ = $;
import 'vendor'
import start from '@frontless/core/start'

document.addEventListener('turbolinks:load', () => {
  $(document).off('click')
})

const PAGES = require('./**/*.riot', {mode: 'list'});
const MODULES = require('../components/**/*.riot', {mode: 'list'});
const components = PAGES.concat(MODULES)

start({ 
  components: components,

  before() {
    require('plugins')
    return Promise.resolve()
  },

  after() {}
});










