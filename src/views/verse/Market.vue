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
  mdiChartPie
} from '@mdi/js'
import * as chartConfig from '@/components/Charts/chart.config.js'
import LineChart from '@/components/Charts/LineChart.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import TableTransactions from '@/components/TableTransactions.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxTransaction from '@/components/CardBoxTransaction.vue'
import CardBoxClient from '@/components/CardBoxClient.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'
import Mesh from '@/components/Mesh.vue'

const titleStack = ref(['Eco', 'Verse', 'Spaces'])

const chartDataAvax = ref(null)
const chartDataMatic = ref(null)
const chartDataFtm = ref(null)
const chartDataEth = ref(null)

const mainStore = useMainStore()

const web3Store = useWeb3Store()

const clientBarItems = computed(() => mainStore.clients.slice(0, 3))

const transactionBarItems = computed(() => mainStore.history.slice(0, 3))

const fillChartData = async () => {
  try {
    let avax = {
      datasets: [
        {
          label: 'Avalanche',
          borderColor: '#E84142',
          pointBackgroundColor: '#E84142',
          data: [],
          tension: 0.5,
        },
      ],
    }

    const avaxPriceHistory = await web3Store.getMarketPrice('AVAX')
    avaxPriceHistory.data.Data.Data.forEach((item, i) => {
      avax.datasets[0].data.push({
        x: new Date(item.time).toString(),
        y: item.close
      })
    })
    chartDataAvax.value = avax
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  await web3Store.getTransactions()
  fillChartData()
})
</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionMain>
    <!-- <NotificationBar
      color="warning"
      :icon="mdiGithub"
    >
      <a
        href="https://ecosis.network/nomics"
        class="underline"
        target="_blank"
      >
        Nomics
      </a>
      Will be released Q4 2022
      <template #right>
        <BaseButton
          href="https://github.com/justboil/admin-one-vue-tailwind"
          :icon="mdiGithub"
          target="_blank"
          small
        />
      </template>
    </NotificationBar> -->
    <SectionTitleBarSub
      :icon="mdiChartPie"
      title="Overview"
    />

    <div class="flex flex-wrap justify-center items-center">
      <Mesh/>
    </div>

  </SectionMain>
</template>
