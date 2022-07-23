<script setup>
import { reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import { useWeb3Store } from '@/stores/web3.js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'

const web3Store = useWeb3Store()

const form = reactive({
  login: '',
  password: '',
  withPassword: ['withPassword'],
  privateKey: ''
})
const router = useRouter()

// Setup Exception Handler
const emitter = inject('emitter')

const submit = async (payload) => {
  try {
    await web3Store.authenticate(payload)
    router.push('/dashboard')
  } catch (e) {
    emitter.emit('error', e)
  }
}
</script>

<template>
  <SectionFullScreen
    v-slot="{ cardClass, cardRounded }"
  >
    <CardBox
      :class="cardClass"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <FormField
        label="Login via Mail (Custodial)"
        :help="(form.withPassword) ? 'Please enter your mail-address to receive Login Link' : 'Please enter your mail-address'"
      >
        <FormControl
          v-model="form.login"
          :icon="mdiAccount"
          name="login"
          autocomplete="username"
        />
      </FormField>

      <!-- <FormField
        label="Password"
        help="Please enter your password"
        v-if="form.withPassword"
      >
        <FormControl
          v-model="form.pass"
          :icon="mdiAsterisk"
          type="password"
          name="password"
          autocomplete="current-password"
        />
      </FormField>

      <FormCheckRadioPicker
        v-model="form.withPassword"
        name="Password"
        :options="{ withPassword: 'Password' }"
      /> -->

      <BaseButtons>
        <BaseButton
          @click="submit({ type: 'magiclink', data: form.login })"
          color="white"
          label="Login"
        />
      </BaseButtons>

      <BaseDivider />

      <FormField
        label="Login via Social Account (Custodial)"
        help="Use a platform you prefer"
      >
        <BaseButtons>
          <BaseButton
            @click="submit()"
            color="light"
            label="Google"
            disabled
          />
          <BaseButton
            @click="submit()"
            color="light"
            label="Twitter"
            disabled
          />
          <BaseButton
            @click="submit()"
            color="light"
            label="Github"
            disabled
          />
          <BaseButton
            @click="submit()"
            color="light"
            label="LinkedIn"
            disabled
          />
          <BaseButton
            @click="submit()"
            color="light"
            label="Discord"
            disabled
          />
        </BaseButtons>
      </FormField>

      <BaseDivider />

      <FormField
        label="Login via Web 3 (Non-Custodial)"
        help="Use a provider you prefer"
      >
        <BaseButtons>
          <BaseButton
            @click="submit({ type: 'metamask'})"
            color="white"
            label="Metamask"
          />
          <BaseButton
            @click="submit({ type: 'walletconnect'})"
            color="light"
            label="WalletConnect"
            disabled
          />
          <BaseButton
            @click="submit({ type: 'privateKey', key: form.privateKey })"
            color="light"
            label="Private Key"
            disabled
          />
        </BaseButtons>
      </FormField>
    </CardBox>
  </SectionFullScreen>
</template>
