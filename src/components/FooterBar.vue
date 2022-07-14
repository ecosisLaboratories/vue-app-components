<script setup>
import { computed } from 'vue'
import { useLayoutStore } from '@/stores/layout.js'
import BaseLevel from '@/components/BaseLevel.vue'
import JustboilLogo from '@/components/JustboilLogo.vue'

const year = computed(() => new Date().getFullYear())

const isFooterBarVisible = computed(() => !useLayoutStore().isFullScreen)
</script>

<template>
  <footer
    v-show="isFooterBarVisible"
    class="bg-white py-2 px-6 dark:bg-gray-900/70"
  >
    <BaseLevel>
      <div class="text-center md:text-left">
        &copy; {{ year }} <a
          href="https://ecosis.network/"
          target="_blank"
        >ecosis.network</a>
      </div>
      <div class="md:py-2">
        <a href="https://ecosis.network">
          <JustboilLogo class="w-auto h-8 md:h-6" />
        </a>
      </div>
    </BaseLevel>
  </footer>
</template>
