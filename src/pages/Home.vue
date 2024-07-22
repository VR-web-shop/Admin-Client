<script setup>
import FlexCenter from '../components/UI/FlexCenter.vue';
import Button from '../components/UI/Button.vue';
import { useShoppingCart } from '../composables/useShoppingCart.js';
import { useToast } from '../composables/useToast.js';
import { useAuthSDK } from '../composables/useAuthSDK.js';
import { computed, onMounted, ref } from 'vue'
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
    {
        title: 'Inspect Deliver Options',
        description: 'Find deliver options',
        method: () => router.push('/cart_deliver_options'),
        permission: 'deliver-options:index'
    },
    {
        title: 'Inspect Payment Options',
        description: 'Find payment options',
        method: () => router.push('/cart_payment_options'),
        permission: 'payment-options:index'
    },
    {
        title: 'Inspect Products',
        description: 'Find products',
        method: () => router.push('/cart_products'),
        permission: 'products:index'
    },
    {
        title: 'Inspect Product Entities',
        description: 'Find product entities',
        method: () => router.push('/cart_entities'),
        permission: 'product-entities:index'
    },
    {
        title: 'Inspect Product Orders',
        description: 'Find product orders',
        method: () => router.push('/cart_product_orders'),
        permission: 'product-orders:index'
    },
]

const scenesMenuItems = [
    {
        title: 'Manage 3D Scenes',
        description: 'Find product entity states',
        method: () => {
            window.open(
                import.meta.env.VITE_SCENES_EDITOR_CLIENT_URL, 
                '_blank'
            )
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

const shoppingCartHealth = ref();
const { check } = useShoppingCart().Health;
onMounted(async () => {
    shoppingCartHealth.value = await check();
});
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
                <div class="flex items-center justify-between gap-3 bg-slate-100 mb-3 p-3">
                    <h2 class="text-xl font-bold">
                        Shopping Cart Service
                    </h2>

                    <div v-if="shoppingCartHealth" class="flex gap-3 items-center">
                        <div class="flex gap-1 items-center">
                            <p class="text-sm font-bold">MySQL Connected:</p>
                            <p class="text-xs font-bold border p-1 rounded-md" 
                                :class="shoppingCartHealth.mysql_connected == true ? 'text-green-600' : 'text-red-600'">
                                {{ shoppingCartHealth.mysql_connected == true ? 'Yes' : 'No' }}
                            </p>
                        </div>
                        <div class="flex gap-3 items-center">
                            <p class="text-sm font-bold">Message Broker Connected:</p>
                            <p class="text-xs font-bold border p-1 rounded-md" 
                                :class="shoppingCartHealth.broker_connected == true ? 'text-green-600' : 'text-red-600'">
                                {{ shoppingCartHealth.broker_connected == true ? 'Yes' : 'No' }}
                            </p>
                        </div>
                        <div class="flex gap-3 items-center">
                            <p class="text-sm font-bold">API:</p>
                            <p class="text-xs font-bold border p-1 rounded-md">
                                {{ shoppingCartHealth.api_type }}
                            </p>
                            <p class="text-xs font-bold border p-1 rounded-md">
                                {{ shoppingCartHealth.api_version }}
                            </p>
                        </div>
                        <div class="flex gap-3 items-center">
                            <p class="text-sm font-bold">Exception Handler:</p>
                            <p class="text-xs font-bold border p-1 rounded-md">
                                {{ shoppingCartHealth.exception_handler }}
                            </p>
                        </div>
                    </div>
                </div>
                
                <p class="text-sm mb-6">
                    The shopping cart service is responsible for managing the entities associated with shopping carts. Each shopping cart entity can hold multiple product entities, representing the items selected by the user. When the owner of a shopping cart decides to complete the purchase, the shopping cart service will generate a product order. This product order will consist of product order entities, each of which will reference the corresponding product entities within the shopping cart. This process ensures that all selected products are accurately included in the final order.
                </p>
                
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
