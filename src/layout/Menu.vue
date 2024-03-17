<template>
    <div class="p-3 flex items-center justify-between gap-3 border-b border-gray-300">
        <h1 class="text-xl font-bold uppercase">Admin</h1>

        <div>
            <Button v-for="item in menuItems" :key="item.title" @click="item.method" class="mr-2">
                {{ item.title }}
            </Button>
        </div>
    </div>
</template>

<script setup>
import Button from '../components/UI/Button.vue';
import { router } from '../router.js'
import { useAuthSDK } from '../composables/useAuthSDK.js';

const { sdk, authenticated } = useAuthSDK()

const logout = async () => {
    await sdk.token.remove()
    authenticated.value = false
}

const menuItems = [
    { title: 'Home', method: () => router.push('/')},
    { title: 'Users', method: () => router.push('/users')},
    { title: 'Roles', method: () => router.push('/roles')},
    { title: 'Logout', method: logout },
]
</script>
