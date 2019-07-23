import {isBrowser} from '@frontless/core'
import store from '@frontless/redux'

import sidebar from './store/sidebar' 

const state = isBrowser && document.__GLOBAL_SHARED_STATE || {
  title: '',
  ...sidebar.state,
}

const actions = {

  TITLE: function(state, {title}) {
    state.title = title
  },

  ...sidebar.actions,

}



export default store({
  state,
  actions,
}, 
function() {
  return isBrowser ? document : require('@frontless/core/src/mutex').release();
})