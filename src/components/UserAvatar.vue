<script setup>
import { useWeb3Store } from '@/stores/web3'
import { computed } from 'vue'

const props = defineProps({
  username: {
    type: String,
    default: null
  },
  api: {
    type: String,
    default: 'api/avataaars'
  }
})

// TODO Big Smile Avatar Customizer
const web3Store = useWeb3Store()
const avatar = computed(() => web3Store.user && web3Store.user.id
  ? `https://avatars.dicebear.com/api/jdenticon/${web3Store.user.id}.svg`
  : `https://avatars.dicebear.com/api/jdenticon/${web3Store.avatar}.svg`)
</script>

<template>
  <div>
    <img
      :src="avatar"
      class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-gray-800"
    >
  </div>
</template>
