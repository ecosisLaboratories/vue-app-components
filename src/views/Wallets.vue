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
  mdiArrowTopRightBoldBox,
  mdiInformation,
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
import BuyAsset from '@/components/Wallet/BuyAsset.vue'

const titleStack = ref(['Authic', 'Wallet'])

const copied = ref(false)

const sendModal = ref(false)

const amount = ref(0)
const receiver = ref('')
const assets = ref([])

const chartData = ref(null)

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

const mainStore = useMainStore()

const web3Store = useWeb3Store()

const clientBarItems = computed(() => mainStore.clients.slice(0, 3))

const transactionBarItems = computed(() => mainStore.history.slice(0, 3))

onMounted(async () => {
  await web3Store.getBalances()
  setTimeout(async () => {
    await web3Store.getTransactions()
  }, 5000)
  fillChartData()
})
</script>

<template>
  <SectionTitleBar class="hide md:block" :title-stack="titleStack" />
  <!-- <SectionHeroBar class="hide md:block">Wallet</SectionHeroBar> -->
  <SectionMain>
    <CardBoxModal
      v-model="sendModal"
      large-title="Send Funds"
      button="warning"
      buttonLabel="Send"
      has-cancel
      @submit.prevent="web3Store.sendAsset({ amount, receiver })"
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

    <div class="flex flex-wrap mb-6">
        <div class="w-full md:w-1/3 md:pr-4">
          <CardBox
            title="Account"
            :icon="mdiQrcode"
            :header-icon="(!copied) ? mdiContentCopy : mdiCheckBold"
            class="mb-6"
            @header-icon-click="() => {
              $copyText(web3Store.user.id)
              copied = true
              setTimeout(() => {
                copied = false
                }, 10000)
              }"
              >
              <!-- TODO as Component -->
              <div class="flex flex-col justify-center items-center">
                <QrcodeVue
                  class="m-8"
                  :value="web3Store.user.id"
                  :size="300"
                />

                <BaseButtons class="flex justify-center">
                  <BaseButton
                    @click="() => {
                      $copyText(web3Store.user.id)
                      copied = true
                    }"
                    color="white"
                    :label="web3Store.user.id"
                    :icon="(!copied) ? mdiContentCopy : mdiCheckBold"
                  />
                </BaseButtons>
                    <BaseDivider />

                    <BaseButtons class="w-full flex justify-center items-center">
                      <BaseButton
                        class="flex-1"
                        @click=""
                        color="info"
                        label="Receive"
                        disabled
                        outline
                        :icon="mdiCallReceived"
                      />
                      <BaseButton
                        class="flex-1"
                        @click="sendModal = true"
                        color="info"
                        label="Send"
                        :icon="mdiSend"
                      />
                      <BaseButton
                        class="flex-1"
                        @click=""
                        color="info"
                        label="Swap"
                        disabled
                        outline
                        :icon="mdiSwapHorizontalBold"
                      />
                      <BaseButton
                        class="w-full"
                        @click=""
                        color="white"
                        label="Scan"
                        disabled
                        outline
                        :icon="mdiQrcode"
                      />
                    </BaseButtons>
                  </div>
                </CardBox>

              <CardBox
                title="Assets"
                :icon="mdiViewModule"
                :headerIcon="mdiReload"
                @header-icon-click="web3Store.getBalances"
              >
                <TableAssets />
            </CardBox>
          </div>

          <div class="w-full md:w-2/3">
            <!-- <BuyAsset/> -->
            <CardBox
              :icon="mdiMonitorCellphone"
              :headerIcon="mdiReload"
              @header-icon-click="web3Store.getTransactions"
              title="Transactions"
              has-table
            >
              <TableTransactions />
            </CardBox>
          </div>
      </div>
  </SectionMain>
</template>
