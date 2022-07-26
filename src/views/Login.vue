<script setup>
import { reactive, ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import {
  mdiAccount,
  mdiAsterisk,
  mdiKey
} from '@mdi/js'
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

const loading = ref(false)
const withPrivatKey = ref(false)

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
    loading.value = true
    await web3Store.authenticate(payload)
    router.push('/dashboard')
  } catch (e) {
    emitter.emit('error', e)
  } finally {
    loading.value = false
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
      @submit.prevent="submit({ type: 'magiclink', data: form.login })"
    >
      <FormField
        label="Login via Mail (Custodial)"
        :help="(form.withPassword) ? 'Please enter your mail-address to receive Login Link' : 'Please enter your mail-address'"
      >
        <FormControl
          v-model="form.login"
          :icon="mdiAccount"
          name="login"
          autocomplete="email"
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
          :label="(!loading) ? 'Login' : 'Loading...'"
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
            outline
          />
          <BaseButton
            @click="submit()"
            color="light"
            label="Twitter"
            disabled
            outline
          />
          <BaseButton
            @click="submit()"
            color="light"
            label="Github"
            disabled
            outline
          />
          <BaseButton
            @click="submit()"
            color="light"
            label="LinkedIn"
            disabled
            outline
          />
          <BaseButton
            @click="submit()"
            color="light"
            label="Discord"
            disabled
            outline
          />
        </BaseButtons>
      </FormField>

      <BaseDivider />

      <FormField
        label="Login via Web 3 (Non-Custodial)"
        :help="(!withPrivatKey) ? 'Use a provider you prefer' : 'Enter your Private Key'"
      >
        <BaseButtons>
          <BaseButton
            @click="submit({ type: 'metamask'})"
            color="white"
            label="Metamask"
          />
          <BaseButton
            @click="submit({ type: 'walletconnect'})"
            color="white"
            label="WalletConnect"
          />
          <BaseButton
            @click="withPrivatKey = !withPrivatKey"
            color="white"
            label="Private Key"
          />
          <div
            class="w-full"
            v-if="withPrivatKey">
            <FormControl
              class="w-full my-4"
              type="password"
              :icon="mdiKey"
              @submit.prevent="submit({ type: 'privateKey', key: form.privateKey })"
            />
            <BaseButton
              class="w-full"
              @click="submit({ type: 'privateKey', key: form.privateKey })"
              color="white"
              label="Import"
            />
          </div>
        </BaseButtons>

      </FormField>
    </CardBox>
  </SectionFullScreen>
</template>
