<script setup>
import { computed, onMounted, ref } from 'vue'
import { useWeb3Store } from '@/stores/web3'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBox from '@/components/CardBox.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { getChainList, resolveAssetName, getAssetData, getAssetIcon, getAssetDecimals, numberWithCommas } from '@/manager'
import { chains } from '../config'

defineProps({
  checkable: Boolean
})

const mainStore = useWeb3Store()

const chainList = ref([])

const items = computed(() => mainStore.transactions.sort((a, b) => b.timestamp - a.timestamp))

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(14)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(
  () => items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, tx) => {
  if (isChecked) {
    checkedRows.value.push(tx)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === tx.id)
  }
}

const getChainData = async (name) => {
  return chainList.find(i.name === name)
}

onMounted(async () => {
  chainList.value = await getChainList(chains)
})
</script>

<template>
  <CardBoxModal
    v-model="isModalActive"
    title="Blockchain Explorer"
  >
    <p>Is coming soon...</p>
  </CardBoxModal>

  <div
    v-if="checkedRows.length"
    class="p-3 bg-gray-100/50 dark:bg-gray-800"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-gray-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th>Chain</th>
        <th>Time</th>
        <th>Asset</th>
        <th>Amount</th>
        <th>Receiver</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="tx in itemsPaginated"
        :key="tx.timestamp"
      >
        <td data-label="Chain" class="flex md:justify-center">
          <a :href="tx.chain.website" target="_blank">
            <img class="w-8 h-8" :src="tx.chain.icon" :title="tx.asset">
          </a>
        </td>
        <td data-label="Time" class="md:w-2/6">
          {{ new Date(tx.timestamp).toLocaleString() }}
        </td>
        <td data-label="Asset">
          <a :href="tx.chain.website" target="_blank" class="flex md:justify-center">
            <img class="w-8 h-8" :src="(tx.asset) ? tx.asset.icon : tx.chain.icon" :title="tx.asset">
          </a>
        </td>
        <td data-label="Amount" class="flex md:justify-end">
          {{ numberWithCommas((tx.amount / Math.pow(10, tx.chain.decimals)).toFixed(9)) }}
        </td>
        <td data-label="Receiver" class="w-full truncate ...">
          <a class="hover:underline" :href="`${tx.chain.explorer}address/${tx.receiver}`" target="_blank">
            {{ tx.receiver }}
          </a>
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <a :href="`${tx.chain.explorer}tx/${tx.id}`" target="_blank">
              <BaseButton
              color="info"
              :icon="mdiEye"
              small
              />
            </a>
          </BaseButtons>
        </td>
      </tr>
      <CardBox class="w-full flex justify-center" v-if="!itemsPaginated" empty/>
    </tbody>
  </table>
  <div
    class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800"
  >
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
