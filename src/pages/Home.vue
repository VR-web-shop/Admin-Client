<script setup>
import FlexCenter from '../components/UI/FlexCenter.vue';
import Button from '../components/UI/Button.vue';
import { useToast } from '../composables/useToast.js';
import { useAuthSDK } from '../composables/useAuthSDK.js';
import { computed, onMounted } from 'vue'
import { router } from '../router.js'

const { sdk, authenticated } = useAuthSDK()

const menuItems = [
    { 
        title: 'Manage Users',
        description: 'Find, create, update, and delete users',
        method: () => router.push('/users'), 
        permission: 'users:index' 
    },
    { 
        title: 'Manage Roles', 
        description: 'Find, create, update, and delete roles',
        method: () => router.push('/roles'), 
        permission: 'roles:index' 
    },
    { 
        title: 'Manage Permissions', 
        description: 'Find, create, update, and delete permissions',
        method: () => router.push('/permissions'), 
        permission: 'permissions:index' 
    },
    { 
        title: 'Manage Products', 
        description: 'Find, create, update, and delete products',
        method: () => router.push('/products'), 
        permission: 'products:index' 
    },
    { 
        title: 'Manage Product Entities', 
        description: 'Find, create, update, ship, etc. products entities',
        method: () => router.push('/product_entities'),
        permission: 'product-entities:index' 
    },
    { 
        title: 'Manage Product Entity States', 
        description: 'Find product entity states',
        method: () => router.push('/product_entity_states'),
        permission: 'product-entity-states:index' 
    },
]

const filteredMenuItems = computed(() => {
    return menuItems.filter((item) => {
        const { permission } = item
        if (permission) {
            return sdk.api.users.hasPermission(permission)
        }
        return true
    })
})

</script>

<template>
    <FlexCenter>
        <div class="m-10 p-3 w-full shadow-md bg-white rounded">
            <div class="flex justify-between items-center">
                <h1 class="text-xl font-bold">
                    Control Panel
                </h1>
            </div>

            <p class="mb-3 text-sm">
                Welcome to the control panel. <br /> 
                Find the menu items below to manage your application.
            </p>

            <div class="grid grid-cols-3 gap-3">
                <div v-for="item in filteredMenuItems" :key="item.title" @click="item.method">
                    <button class="text-left border border-gray-300 p-3 rounded shadow-sm bg-gray-200 hover:bg-gray-100 w-full">
                        <p class="text-md font-bold">{{ item.title }}</p>
                        <p class="text-xs">{{ item.description }}</p>
                    </button>
                </div>
            </div>
        </div>
    </FlexCenter>
</template>
