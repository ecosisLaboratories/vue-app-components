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

const web3Store = useWeb3Store()
console.log(web3Store.user.id);
const avatar = computed(() => web3Store.user.id
  ? `https://avatars.dicebear.com/api/jdenticon/${web3Store.user.id}.svg`
  : web3Store.userAvatar)
</script>

<template>
  <div>
    <img
      :src="avatar"
      class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-gray-800"
    >
  </div>
</template>
