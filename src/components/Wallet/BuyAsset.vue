<script setup>
import { computed, ref, onMounted } from 'vue'
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiFinance,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiContentCopy,
  mdiQrcode,
  mdiViewModule,
  mdiCheckBold,
  mdiSend,
  mdiCallReceived,
  mdiSwapHorizontalBold,
  mdiArrowTopRightBoldBox,
  mdiInformation,
} from '@mdi/js'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import Paypal from '@/components/Paypal.vue'

const buy = ref(false)
</script>

<template>
  <CardBoxModal
    v-model="buy"
    large-title="Buy Noro Token"
    button="info"
    buttonLabel="Buy"
    has-cancel
  >
    <Paypal/>
  </CardBoxModal>

  <NotificationBar
    color="info"
    :icon="mdiInformation"
    @click="buy = true"
  >
  <div class="flex items-center">

    Get some fresh new
    <a
      @click="buy = true"
      class="underline flex mr-2"
      target="_blank"
      >
      <img
        class="w-8 h-8 rounded-full mx-2"
        src="https://github.com/AwesomeEcosystem/assets/blob/master/blockchains/avalanchec/assets/0x6905c5ad100370f75f42305cbfbd7925e9720a59/logo.png?raw=true">
        Noro Token
      </a>
      and stake it with high yield!
    </div>
    <template #right>
      <FontAwesomeIcon icon="HatWizard"/>
      <BaseButton
        :icon="faHatWizard.icon[4]"
        target="_blank"
        small
        @click="buy = true"
      />
    </template>
  </NotificationBar>
</template>
