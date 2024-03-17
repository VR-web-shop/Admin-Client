<script setup>
import Menu from '../layout/Menu.vue';
import Toast from '../components/Toast.vue';
import { useToast } from '../composables/useToast.js';
import { useAuthSDK } from '../composables/useAuthSDK.js';
import { ref, onMounted } from 'vue'
import Login from '../components/Login.vue'

const toastCtrl = useToast()

const loginRef = ref()
const loginShow = ref(true)

const { sdk, authenticated } = useAuthSDK()

onMounted(async () => {
    try { 
      await sdk.api.users.findMe() 
      authenticated.value = true
    }
    catch (e) { 
      authenticated.value = false
    }
})

async function loginComplete() {
    authenticated.value = true
    toastCtrl.add('Login successful', 5000, 'success')
}
</script>

<template>
  <div>
    <Toast />
    
    <div v-if="!authenticated">
      <Login ref="loginRef" @complete="loginComplete" />
    </div>

    <div v-else>
      <Menu />
      <router-view></router-view>
    </div>
  </div>
</template>
