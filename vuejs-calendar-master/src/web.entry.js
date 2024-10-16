import Vue from 'vue'
import './style.scss'
import App from './components/app.vue'
import moment from 'moment-timezone';

moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get () { return this.$root.moment } })


new Vue({
  el: '#app',
  data () {
    return {
      moment
    }

  },
  components: {
    App
  },
  template: '<App/>'
});
