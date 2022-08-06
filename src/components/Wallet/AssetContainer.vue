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
  abi: Array
})

const sendAsset = ref(false)
</script>

<template>
  <div class="w-full flex flex-wrap justify-around items-center py-8">
    <div class="">
      <img :src="asset.icon">
    </div>
    <div class="">
      <h1>{{ asset.name }}</h1>
      <h2>{{ asset.symbol }}</h2>
    </div>
    <div class="">
      <div class="">
        <p>Homepage</p>
        <p>{{ asset.website }}</p>
      </div>
      <div class="" v-if="asset.explorer">
        <p>Explorer</p>
        <p>{{ asset.explorer }}</p>
      </div>
      <div class="" v-else>
        <p>Explorer</p>
        <p>{{ asset.id }}</p>
      </div>
      <div class="w-full flex justify-around">
        <BaseButtons class="w-3/4 flex justify-center">
          <BaseButton
            @click=""
            color="info"
            :icon="mdiSend"
            outline
          />
          <BaseButton
            @click="sendAsset = true"
            color="info"
            :icon="mdiCallReceived"
            disabled
            outline
          />
          <BaseButton
            @click=""
            color="info"
            :icon="mdiSwapHorizontalBold"
            disabled
            outline
          />
        </BaseButtons>
        <div class="w-1/4">
          <BaseButton
            @click=""
            color="info"
            label="Paypal"
            :icon="mdiSwapHorizontalBold"
          />
        </div>
      </div>
      <div class="w-full" v-if="abi">
        <div class="w-full">
          <h3>Micro App</h3>
          <p>Smart Contract ABI GUI</p>
        </div>
        <div class="w-full">
          <BaseButtons class="flex justify-center">
            <BaseButton
              @click=""
              color="info"
              :icon="mdiSend"
              outline
            />
            <BaseButton
              @click="sendAsset = true"
              color="info"
              :icon="mdiCallReceived"
              disabled
              outline
            />
            <BaseButton
              @click=""
              color="info"
              :icon="mdiSwapHorizontalBold"
              disabled
              outline
            />
          </BaseButtons>
        </div>
      </div>
    </div>
  </div>
</template>
