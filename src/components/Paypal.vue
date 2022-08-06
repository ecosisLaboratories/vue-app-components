<script setup>
import { computed, ref, onMounted } from 'vue'
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
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import NotificationBar from '@/components/NotificationBar.vue'

const buying = ref(false)
const currency = ref('USD')
const nativeAmount = ref(0)
const rete = ref(0)

const assets = ref(['Noro'])

const web3Store = useWeb3Store()

const createOrder = computed(() => {
  return (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            // currency_code: this.currency,
            value: this.nativeAmount,
          },
          invoice_id: `Wallet: ${this.avaxAddress} | Amount: ${this.nativeAmount * this.rate}`
        },
      ],
    })
  }
})

const onApprove = computed(() => {
    return async (data, actions) => {
      await this.startBuy();
      this.successfullyBought = true;
      this.finallyBought = this.nativeAmount * this.rate;
      this.nativeAmount = 0;
      alert(data);
      return actions.order.capture();
    }
})

const onError = computed(() => {
    return async (err) => {
      console.log(err);
      alert(err);
    }
})

const stake = computed(() => this.nativeAmount * this.rate)

const returnPrice = computed(() => {
  if (this.currency === 'EUR') {
    return (this.rate / this.prices.eur) * this.nativeAmount
  } else if (this.currency === 'USD') {
    return (this.rate / this.prices.usd) * this.nativeAmount
  } else if (this.currency === 'GBP') {
    return (this.rate / this.prices.gbp) * this.nativeAmount
  }
})

const isLigit = () => {
  if (!this.nativeAmount) {
    alert('Enter Amount to buy/pay');
    return false;
  }
  if (!this.avaxAddress) {
    alert('Enter Avalanche C-Chain-Address (starting with 0x...)');
    return false;
  }
  if (!this.avaxAddress.startsWith('0x')) {
    alert('Enter Avalanche C-Chain-Address (starting with 0x...)')
    return false;
  }
  if (this.avaxAddress.length !== 42) {
    alert('Avalanche Wallet Address starting with 0x has a length of 42 character')
    return false;
  }
  const available = this.supply - this.bought;
  const amount = this.nativeAmount * this.rate;
  if (amount > available) {
    alert('Amount needs to be lower than left Bend');
    return false;
  }
  return true
}

const buy = () => {
  if (this.isLigit()) {
    this.buying = true;
    // this.startBuy()
  }
}

const startBuy = async () => {
  let amount;

  if (this.currency === 'EUR') {
    amount = (this.rate / this.prices.eur) * this.nativeAmount
  } else if (this.currency === 'USD') {
    amount = (this.rate / this.prices.usd) * this.nativeAmount
  } else if (this.currency === 'GBP') {
    amount = (this.rate / this.prices.gbp) * this.nativeAmount
  }

  const buyer = new this.Buyer();
  buyer.set('address', this.avaxAddress);
  buyer.set('amount', amount.toString());

  const query = new this.Moralis.Query(this.Sale);
  const res = await query.get('IummsrvpW2KLkW2x0QFXbVHT');
  const bought = Number(res.get('bought'));
  const totalBought = bought + amount;
  await res.set('bought', totalBought.toString())

  await res.save()
  await buyer.save();
}
</script>

<template>
  <div class="w-full flex flex-col justify-around items-center py-8">
    <FormField
      label="Receiver"
      help="Address"
    >
      <!-- <FormControl
        class="max-full py-4"
        :style="{ width: '350px' }"
        type="text"
        :icon="mdiMail"
        v-model="receiver"
      /> -->
      <div class="w-full">

        Your Address
      </div>
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
  <PayPalButton :on-approve="onApprove" :create-order="createOrder"/>
</template>
