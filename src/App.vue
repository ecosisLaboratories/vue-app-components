<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useMainStore } from '@/stores/main.js'
import { useLayoutStore } from '@/stores/layout.js'
import menu from '@/menu.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'

const mainStore = useMainStore()

mainStore.setUser({
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93'
})

const layoutStore = useLayoutStore()

const isAsideLgActive = computed(() => layoutStore.isAsideLgActive)
const isAsideMobileExpanded = computed(() => layoutStore.isAsideMobileExpanded)

const overlayClick = () => {
  layoutStore.asideLgToggle(false)
}

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
</script>

<template>
  <section v-touch:swipe.right="swipeRight" v-touch:swipe.left="swipeLeft">
    <section v-click-outside="toggleNav">
      <NavBar/>
      <AsideMenu :menu="menu" v-click-outside="swipeLeft"/>
    </section>
    <RouterView/>
    <FooterBar/>
    <OverlayLayer
      v-show="isAsideLgActive"
      z-index="z-30"
      @overlay-click="overlayClick"
    />
  </section>
</template>
