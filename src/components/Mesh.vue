<script setup>
import { computed, ref, onMounted } from 'vue'

const data = ref([
  {
    name: 'eLabs',
    backgroundColor: 'linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%)',
    volume: 40
  },
  {
    name: 'Cunoro',
    backgroundColor: 'linear-gradient(90deg, rgba(29,109,253,1) 0%, rgba(13,61,156,1) 100%)',
    volume: 60
  },
])

</script>

<template>
  <section class="w-full">
    <div class="w-full flex " v-for="org in data">
      <div class="border" :style="{
        width: `${org.volume}%`,
        backgroundColor: org.backgroundColor
      }">
        {{ org.name }}
      </div>
    </div>
  </section>
</template>
