<script setup>
import { computed, ref, inject, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useWeb3Store } from '@/stores/web3.js'
import { useLayoutStore } from '@/stores/layout.js'
import menu from '@/menu.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'

// Setup Layout
const layoutStore = useLayoutStore()
const web3Store = useWeb3Store()

const assets = ref([])

const isAsideLgActive = computed(() => layoutStore.isAsideLgActive)
const isAsideMobileExpanded = computed(() => layoutStore.isAsideMobileExpanded)

const toggleNav = () => {
  if (layoutStore.isNavOpen) {
    layoutStore.toggleNav(false)
  }
}

const swipeRight = () => {
  layoutStore.asideMobileToggle(true)
}

const swipeLeft = () => {
  layoutStore.asideMobileToggle(false)
}

const overlayClick = () => {
  layoutStore.asideLgToggle(false)
}

// Setup Exception Handler
const emitter = inject('emitter')

const isErrorExeption = ref(false)
const errorMessage = ref('Something went wrong!')

emitter.on('error', (e) => { // TODO Facelift
  errorMessage.value = e || 'Something went wrong!'
  isErrorExeption.value = true
})

onMounted(async () => {
  setTimeout(() => {
    assets.value = web3Store.balances
  }, 10000)
})

</script>

<template>
  <CardBoxModal
    v-model="isErrorExeption"
    large-title="Error"
    button="danger"
    shake
  >
    <p>{{ errorMessage }}</p>
  </CardBoxModal>
  <section v-touch:swipe.right="swipeRight" v-touch:swipe.left="swipeLeft">
    <section v-click-outside="toggleNav">
      <NavBar/>
      <AsideMenu :menu="menu" v-click-outside="swipeLeft"/>
    </section>
    <RouterView/>
    <!-- <FooterBar/> -->
    <OverlayLayer
      v-show="isAsideLgActive"
      z-index="z-30"
      @overlay-click="overlayClick"
    />
  </section>
</template>
