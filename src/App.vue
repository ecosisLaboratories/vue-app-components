<script setup>
import { computed, ref, inject } from 'vue'
import { RouterView } from 'vue-router'
import { useMainStore } from '@/stores/main.js'
import { useLayoutStore } from '@/stores/layout.js'
import menu from '@/menu.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'

// Setup Layout
const layoutStore = useLayoutStore()

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

// const successMessage = ref('')
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
