<script setup>
import { computed, ref, onMounted } from 'vue'
import { useWeb3Store } from '@/stores/web3'
import {
  mdiEye,
  mdiTrashCan,
  mdiSend,
  mdiCallReceived,
  mdiSwapHorizontalBold,
 } from '@mdi/js'
import CardBox from '@/components/CardBox.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { resolveAssetName, getAssetData, numberWithCommas } from '@/manager'

defineProps({
  checkable: Boolean
})

const web3Store = useWeb3Store()

const items = computed(() => web3Store.balances.sort((a, b) => {
  const x = numberWithCommas((a.balance / Math.pow(10, parseInt(a.decimals))).toFixed(9))
  const y = numberWithCommas((b.balance / Math.pow(10, parseInt(b.decimals))).toFixed(9))
  return y - x
}))

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(10)

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

const formatValue = (value) => {
  return Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value)
}
</script>

<template>
  <CardBoxModal
    v-model="isModalActive"
    title="Blockchain Explorer"
  >
    <p>Is coming soon...</p>
  </CardBoxModal>

  <!-- <CardBoxModal
    v-model="isModalDangerActive"
    large-title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal> -->

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
        <!-- <th v-if="checkable" /> -->
        <!-- <th /> -->
        <th>Asset</th>
        <th class="flex justify-end">Amount</th>
        <!-- <th /> -->
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="tx in itemsPaginated"
        :key="tx.timestamp"
      >
        <!-- <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, tx)"
        /> -->
        <!-- <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar
            :username="tx.name"
            class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
          />
        </td> -->
        <td data-label="Asset">
          <a :href="tx.website" target="_blank">
            <img class="w-8 h-8 rounded-full" :src="tx.icon" :title="tx.symbol">
          </a>
          <!-- {{ tx.symbol }} -->
        </td>
        <td data-label="Amount" class="flex md:justify-end">
          {{ numberWithCommas((tx.balance / Math.pow(10, parseInt(tx.decimals))).toFixed(9)) }}
        </td>
        <!-- <td
          data-label="Progress"
          class="lg:w-32"
        >
          <progress
            class="flex w-2/5 self-center lg:w-full"
            max="100"
            :value="tx.progress"
          >
            {{ tx.progress }}
          </progress>
        </td> -->
        <!-- <td
          data-label="Created"
          class="lg:w-1 whitespace-nowrap"
        >
          <small
            class="text-gray-500 dark:text-gray-400"
            :title="tx.created"
          >{{ tx.created }}</small>
        </td> -->
        <td class="before:hidden whitespace-nowrap flex-col justify-center">
          <BaseButtons class="flex justify-center">
            <BaseButton
              @click=""
              color="info"
              :icon="mdiSend"
            />
            <BaseButton
              @click=""
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
