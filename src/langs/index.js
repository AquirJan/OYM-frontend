import Vue from 'vue';
import VueI18n from 'vue-i18n';
import cn from './cn.js';

Vue.use(VueI18n);

const messages = {
  cn: cn,
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'cn', // set locale
  messages, // set locale messages
})

export default i18n;