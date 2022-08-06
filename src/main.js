import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import { useStyleStore } from '@/stores/style.js'
import { useLayoutStore } from '@/stores/layout.js'
import { darkModeKey, styleKey } from '@/config.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Vue3TouchEvents from "vue3-touch-events"
import vClickOutside from "click-outside-vue3"
import mitt from 'mitt'
import copyText from "@meforma/vue-copy-to-clipboard";
import PayPalButton from './paypal'

import './css/main.css'

library.add(faHatWizard)

/* Init Pinia */
const pinia = createPinia()

/* Init Event Emitter */
const emitter = mitt()

/* Create Vue app */
createApp(App)
  .use(router)
  .use(pinia)
  .use(Vue3TouchEvents)
  .use(vClickOutside)
  .use(copyText)
  .component('PayPalButton', PayPalButton)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .provide('emitter', emitter)
  .mount('#app')

/* Init Pinia stores */
const mainStore = useMainStore(pinia)
const styleStore = useStyleStore(pinia)
const layoutStore = useLayoutStore(pinia)

/* Fetch sample data */
mainStore.fetch('clients')
mainStore.fetch('history')

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? 'basic')

/* Dark mode */
if ((!localStorage[darkModeKey] && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage[darkModeKey] === '1') {
  styleStore.setDarkMode(true)
}

/* Default title tag */
const defaultDocumentTitle = 'ecosis One'

/* Collapse mobile aside menu on route change */
router.beforeEach(() => {
  layoutStore.asideMobileToggle(false)
  layoutStore.asideLgToggle(false)
  layoutStore.toggleNav(false)
})

router.afterEach(to => {
  /* Set document title from route meta */
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle

  /* Full screen mode */
  layoutStore.fullScreenToggle(!!to.meta.fullScreen)
})
