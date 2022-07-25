<script setup>
import { ref, reactive } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiAccount, mdiAccountCircle, mdiLock, mdiMail, mdiAsterisk, mdiFormTextboxPassword } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionBottomOtherPages from '@/components/SectionBottomOtherPages.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import UserCard from '@/components/UserCard.vue'

const mainStore = useMainStore()

const titleStack = ref(['User', 'Profile'])

const profileForm = reactive({
  name: mainStore.userName,
  email: mainStore.userEmail
})

const passwordForm = reactive({
  password_current: '',
  password: '',
  password_confirmation: ''
})

const submitProfile = () => {
  mainStore.setUser(profileForm)
}

const submitPass = () => {
  //
}
</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />

  <UserCard />

  <SectionMain>

  </SectionMain>

  <SectionBottomOtherPages />
</template>
