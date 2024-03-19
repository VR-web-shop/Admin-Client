<template>
    <div class="p-3 flex items-center justify-between gap-3 border-b border-gray-300 bg-white">
        <h1 class="text-xl font-bold uppercase">Admin</h1>

        <div>
            <Button v-for="item in filteredMenuItems" :key="item.title" @click="item.method" class="mr-2">
                {{ item.title }}
            </Button>
        </div>
    </div>
</template>

<script setup>
import Button from '../components/UI/Button.vue';
import { router } from '../router.js'
import { useAuthSDK } from '../composables/useAuthSDK.js';
import { computed } from 'vue'

const { sdk, authenticated } = useAuthSDK()

const logout = async () => {
    await sdk.token.remove()
    authenticated.value = false
}

const isActive = (path) => {
    return router.currentRoute.value.path === path
}

const menuItems = [
    { title: 'Control Panel', method: () => router.push('/'), path: '/'},
    { title: 'Logout', method: logout },
]

const filteredMenuItems = computed(() => {
    return menuItems.filter((item) => {
        const { permission } = item
        if (permission) {
            return sdk.api.users.hasPermission(permission)
        }

        if (isActive(item.path)) {
            return false
        }

        return true
    })
})
</script>
