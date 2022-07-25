<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  LinearScale,
  CategoryScale,
  Tooltip
} from 'chart.js'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const root = ref(null)

let chart

Chart.register(LineElement, PointElement, LineController, LinearScale, CategoryScale, Tooltip)

onMounted(() => {
  chart = new Chart(root.value, {
    type: 'line',
    data: props.data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          display: true,
          ticks: {
            // Include a dollar sign in the ticks
            callback(value, index, ticks) {
              return '$ ' + value
            }
          }
        },
        x: {
          display: true,
          ticks: {
            // Include a dollar sign in the ticks
            callback(value, index, ticks) {
              const date = new Date(value)
              // return date.toLocaleString("en-US", { hour: "numeric" })
              return value
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true
        }
      }
    }
  })
})

const chartData = computed(() => props.data)

watch(chartData, data => {
  if (chart) {
    chart.data = data
    chart.update()
  }
})
</script>

<template>
  <canvas ref="root" />
</template>
