<script setup>
import { useToast } from '../composables/useToast.js';
import { useAuthSDK } from '../composables/useAuthSDK.js';
import { ref, onMounted } from 'vue'
import Login from '../components/Login.vue'

/*
(async () => {
    const sdk = new AuthSDK(`http://localhost:3000`)
    const { api, requests } = sdk
    const { authentication } = api
    const req = new requests.AuthRequest.CreateRequest({
        email: 'admin@example.com',
        password: '12345678',
    })
    const res = await authentication.login(req)
    const res2 = await authentication.refresh()
    console.log(res.access_token, res2.access_token)

    const me = await api.users.findMe()
    console.log(me)
    const randomNum = Math.floor(Math.random() * 100000)
    const req2 = new requests.UserRequest.CreateRequest({
        email: `t${randomNum}22t@t22tt.dk`,
        password: '12345678',
    })
    const res3 = await api.users.create(req2)
    const me2 = await api.users.findMe()
    const req4 = new requests.UserRequest.UpdateRequest({
        email: `tt${randomNum}44@.sdf`,
        password: '12345678',
        new_password: '123456789',
    }, 222)
    const areq4 = await api.users.update(req4)
    console.log(me2)
    console.log(res3)
    console.log(areq4)
    const req3 = new requests.UserRequest.DeleteRequest({
        password: '123456789',
    }, 222)
    const res4 = await api.users.destroy(req3)
    console.log(res4)
})()*/
</script>

<template>
    <div class="p-3">
        Test
    </div>
</template>
