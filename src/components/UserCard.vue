<script setup>
import { computed, ref } from 'vue'
import { useWeb3Store } from '@/stores/web3'
import { mdiCheckDecagram, mdiInformation } from '@mdi/js'
import BaseLevel from '@/components/BaseLevel.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import PillTag from '@/components/PillTag.vue'

const web3Store = useWeb3Store()

const id = computed(() => web3Store.user.id)
const verified = computed(() => web3Store.user.verified)

const userSwitchVal = ref([])
</script>

<template>
  <CardBox rounded="">
    <BaseLevel type="flex flex-col justify-center items-center">
      <UserAvatar class="lg:mx-12 w-32 h-32 m-3 my-8 inline-flex" />
      <div class="flex flex-col justify-center items-center space-y-3 text-center md:text-left lg:mx-12">
        <h1 class="text-2xl pb-8">
          <b>{{ id }}</b>
        </h1>
        <!-- <p>Last login <b>12 mins ago</b> from <b>127.0.0.1</b></p> -->
        <div class="w-full flex flex-col justify-center items-center">
          <PillTag
            text="Not Verified"
            type="white"
            :icon="mdiInformation"
            v-if="!verified"
          />
          <PillTag
            text="Verified"
            type="info"
            :icon="mdiCheckDecagram"
            v-else
          />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
