<script setup>
import FlexCenter from '../components/UI/FlexCenter.vue';
import Button from '../components/UI/Button.vue';
import { useToast } from '../composables/useToast.js';
import { useAuthSDK } from '../composables/useAuthSDK.js';
import { computed, onMounted } from 'vue'
import { router } from '../router.js'

const { sdk, authenticated } = useAuthSDK()

const authMenuItems = [
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
        title: 'Manage Role Permissions',
        description: 'Find, create, update, and delete roles',
        method: () => router.push('/role_permissions'),
        permission: 'role-permissions:index'
    },
    {
        title: 'Manage Permissions',
        description: 'Find, create, update, and delete permissions',
        method: () => router.push('/permissions'),
        permission: 'permissions:index'
    },
]

const productsMenuItems = [
    {
        title: 'Manage Products',
        description: 'Find, create, update, and delete products',
        method: () => router.push('/products'),
        permission: 'products:index'
    },
    {
        title: 'Manage Product Entities',
        description: 'Find, create, update, ship, etc. product entities',
        method: () => router.push('/product_entities'),
        permission: 'product-entities:index'
    },
    {
        title: 'Manage Product Entity States',
        description: 'Find product entity states',
        method: () => router.push('/product_entity_states'),
        permission: 'product-entity-states:index'
    },
    {
        title: 'Manage Product Orders',
        description: 'Find, update, and delete product orders',
        method: () => router.push('/product_orders'),
        permission: 'product-orders:index'
    },
    {
        title: 'Manage Product Order Entities',
        description: 'Find, create, update, ship, etc. product order entities',
        method: () => router.push('/product_order_entities'),
        permission: 'product-order-entities:index'
    },
    {
        title: 'Manage Product Order States',
        description: 'Find product order states',
        method: () => router.push('/product_order_states'),
        permission: 'product-order-states:index'
    },
    {
        title: 'Manage Deliver Options',
        description: 'Find deliver options',
        method: () => router.push('/deliver_options'),
        permission: 'deliver-options:index'
    },
    {
        title: 'Manage Payment Options',
        description: 'Find payment options',
        method: () => router.push('/payment_options'),
        permission: 'payment-options:index'
    },
    {
        title: 'Manage Valuta Settings',
        description: 'Find valuta settings',
        method: () => router.push('/valuta_settings'),
        permission: 'valuta-settings:index'
    }
]

const shoppingCartMenuItems = [
    {
        title: 'Manage Carts',
        description: 'Find, create, update, and delete carts',
        method: () => router.push('/carts'),
        permission: 'carts:index'
    },
    {
        title: 'Manage Cart Product Entities',
        description: 'Find, create, update, and delete cart product entities',
        method: () => router.push('/cart_product_entities'),
        permission: 'cart-product-entities:index'
    },
    {
        title: 'Manage Cart States',
        description: 'Find cart states',
        method: () => router.push('/cart_states'),
        permission: 'cart-states:index'
    },
]

const scenesMenuItems = [
    {
        title: 'Manage 3D Scenes',
        description: 'Find product entity states',
        method: () => {
            window.open('http://localhost:5174', '_blank')
        },
        permission: 'scenes-editor:client:access'
    },
]

const filterMenuItems = (menuItems) => {
    return menuItems.filter((item) => {
        const { permission } = item
        if (permission) {
            return sdk.api.users.hasPermission(permission)
        }
        return true
    })
}

const filteredAuthMenuItems = computed(() => {
    return filterMenuItems(authMenuItems)
})
const filteredProductsMenuItems = computed(() => {
    return filterMenuItems(productsMenuItems)
})
const filteredShoppingCartMenuItems = computed(() => {
    return filterMenuItems(shoppingCartMenuItems)
})
const filteredScenesMenuItems = computed(() => {
    return filterMenuItems(scenesMenuItems)
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

            <div v-if="filteredAuthMenuItems.length > 0" class="pb-6 mb-4 border-b border-gray-300">
                <h2 class="text-md font-bold mb-3">
                    Authentication And Authorization
                </h2>
                <div class="grid grid-cols-3 gap-3">
                    <div v-for="item in filteredAuthMenuItems" :key="item.title" @click="item.method">
                        <button
                            class="h-full flex items-start text-left border border-gray-300 px-3 pb-3 pt-2 rounded shadow-sm bg-gray-200 hover:bg-gray-100 w-full">
                            <div>
                                <p class="text-md font-bold">{{ item.title }}</p>
                                <p class="text-xs">{{ item.description }}</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="filteredProductsMenuItems.length > 0" class="pb-6 mb-4 border-b border-gray-300">
                <h2 class="text-md font-bold mb-3">
                    Products Management
                </h2>
                <div class="grid grid-cols-3 gap-3">
                    <div v-for="item in filteredProductsMenuItems" :key="item.title" @click="item.method">
                        <button
                            class="h-full flex items-start text-left border border-gray-300 px-3 pb-3 pt-2 rounded shadow-sm bg-gray-200 hover:bg-gray-100 w-full">
                            <div>
                                <p class="text-md font-bold">{{ item.title }}</p>
                                <p class="text-xs">{{ item.description }}</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="filteredShoppingCartMenuItems.length > 0" class="pb-6 mb-4 border-b border-gray-300">
                <h2 class="text-md font-bold mb-3">
                    Shopping Cart Management
                </h2>
                <div class="grid grid-cols-3 gap-3">
                    <div v-for="item in filteredShoppingCartMenuItems" :key="item.title" @click="item.method">
                        <button
                            class="h-full flex items-start text-left border border-gray-300 px-3 pb-3 pt-2 rounded shadow-sm bg-gray-200 hover:bg-gray-100 w-full">
                            <div>
                                <p class="text-md font-bold">{{ item.title }}</p>
                                <p class="text-xs">{{ item.description }}</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="filteredScenesMenuItems.length > 0" class="">
                <h2 class="text-md font-bold mb-3">
                    3D Scenes Management
                </h2>
                <div class="grid grid-cols-3 gap-3">
                    <div v-for="item in filteredScenesMenuItems" :key="item.title" @click="item.method">
                        <button
                            class="h-full flex items-start text-left border border-gray-300 px-3 pb-3 pt-2 rounded shadow-sm bg-gray-200 hover:bg-gray-100 w-full">
                            <div>
                                <p class="text-md font-bold">{{ item.title }}</p>
                                <p class="text-xs">{{ item.description }}</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </FlexCenter>
</template>
