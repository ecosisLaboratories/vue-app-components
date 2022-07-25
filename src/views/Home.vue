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

const titleStack = ref(['Hub', 'Dashboard'])

const chartData = ref(null)

const mainStore = useMainStore()

const web3Store = useWeb3Store()

const clientBarItems = computed(() => mainStore.clients.slice(0, 3))

const transactionBarItems = computed(() => mainStore.history.slice(0, 3))

const fillChartData = async () => {
  try {
    let data = {
      datasets: [
        {
          label: 'Avalanche',
          borderColor: '#E84142',
          pointBackgroundColor: '#E84142',
          data: [],
          tension: 0.5,
        },
        {
          borderColor: '#1969FF',
          pointBackgroundColor: '#1969FF',
          data: [],
          tension: 0.5,
        },
        {
          borderColor: '#8247e5',
          pointBackgroundColor: '#8247e5',
          data: [],
          tension: 0.5,
        },
        {
          borderColor: '#828385',
          pointBackgroundColor: '#828385',
          data: [],
          tension: 0.5,
        },
      ],
    }

    const res = await web3Store.getMarketPrice()

    res.data.Data.Data.forEach((item, i) => {
      data.datasets[0].data.push({
        x: new Date(item.time).toString(),
        y: item.close
      })
    })

    chartData.value = data
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
      color="info"
      :icon="mdiGithub"
    >
      Please star this project on
      <a
        href="https://github.com/justboil/admin-one-vue-tailwind"
        class="underline"
        target="_blank"
      >GitHub</a>
      <template #right>
        <BaseButton
          href="https://github.com/justboil/admin-one-vue-tailwind"
          :icon="mdiGithub"
          label="GitHub"
          target="_blank"
          small
        />
      </template>
    </NotificationBar> -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      <!-- <CardBoxClient
        v-for="client in clientBarItems"
        :key="client.id"
        :name="client.name"
        :login="client.login"
        :progress="client.progress"
      /> -->
    </div>

    <SectionTitleBarSub
      :icon="mdiChartPie"
      title="Market Overview"
    />

    <CardBox
      title="Performance"
      :icon="mdiFinance"
      :header-icon="mdiReload"
      class="mb-6"
      @header-icon-click="fillChartData"
    >
      <div v-if="chartData">
        <line-chart
          :data="chartData"
          class="h-96"
        />
      </div>
    </CardBox>
  </SectionMain>
</template>
