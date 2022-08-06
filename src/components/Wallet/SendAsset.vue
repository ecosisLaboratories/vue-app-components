<script setup>
import { computed, ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/main'
import { useWeb3Store } from '@/stores/web3'
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
} from '@mdi/js'
import QrcodeVue from 'qrcode.vue'
import * as chartConfig from '@/components/Charts/chart.config.js'
import LineChart from '@/components/Charts/LineChart.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import TableTransactions from '@/components/TableTransactions.vue'
import TableAssets from '@/components/TableAssets.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import CardBoxTransaction from '@/components/CardBoxTransaction.vue'
import CardBoxClient from '@/components/CardBoxClient.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'

defineProps({
  asset: Object,
  sendModal: Boolean
})

const amount = ref(0)
const receiver = ref('')

</script>

<template>
  <CardBoxModal
    v-model="sendModal"
    large-title="Send Funds"
    button="warning"
    buttonLabel="Send"
    has-cancel
    @submit.prevent="web3Store.sendAsset({ asset: asset.symbol, amount, receiver })"
  >
    <div class="flex flex-wrap">
      <div class="w-full flex flex-col justify-around items-center py-8">
        <FormField
          label="Receiver"
          help="Address"
        >
          <FormControl
            class="max-full py-4"
            :style="{ width: '350px' }"
            type="text"
            :icon="mdiMail"
            v-model="receiver"
          />
        </FormField>

        <FormField
          label="Amount"
          help="Enter Amount"
        >
          <FormControl
            class="max-full py-4"
            :style="{ width: '350px' }"
            type="number"
            :icon="mdiAccount"
          />
        </FormField>

        <FormField
          label="Asset"
          help="Select Asset"
        >
          <FormControl
            class="max-full py-4"
            :style="{ width: '350px' }"
            type="select"
            :icon="mdiMail"
            :options="assets"
          >

          </FormControl>
        </FormField>

      </div>
    </div>
  </CardBoxModal>
</template>
