<script setup>
import FlexCenter from '../components/UI/FlexCenter.vue';
import Button from '../components/UI/Button.vue';
import { useShoppingCart } from '../composables/useShoppingCart.js';
import { useProducts } from '../composables/useProducts.js';
import { useScenes } from '../composables/useScenes.js';
import { useWebsockets } from '../composables/useWebsockets.js';
import { useAuthSDK } from '../composables/useAuthSDK.js';
import { computed, onMounted, ref } from 'vue'
import { router } from '../router.js'

const { sdk } = useAuthSDK()

const authMenuItems = [
    {
        title: 'Users',
        description: 'A user is an entity that can log in to the system. Options: view, create, update, and delete users.',
        method: () => router.push('/users'),
        permission: 'users:index'
    },
    {
        title: 'Roles',
        description: 'A role defines a set of permissions that can be assigned to a user. Options: view, create, update, and delete users.',
        method: () => router.push('/roles'),
        permission: 'roles:index'
    },
    {
        title: 'Role Permissions',
        description: 'A role permission defines the relationship between a role and a permission. Options: view, create, update, and delete users.',
        method: () => router.push('/role_permissions'),
        permission: 'role-permissions:index'
    },
    {
        title: 'Permissions',
        description: 'A permission defines the access rights to a specific resource or action. Options: view, create, update, and delete users.',
        method: () => router.push('/permissions'),
        permission: 'permissions:index'
    },
]

const productsMenuItems = [
    {
        title: 'Products',
        description: 'A product defines the general parameters of a product. Options: view, create, update, and delete products.',
        method: () => router.push('/products'),
        permission: 'products:index'
    },
    {
        title: 'Product Entities',
        description: 'A product entity defines a specific entity of a product a customer can buy. Options: view, create, update, and delete product entities.',
        method: () => router.push('/product_entities'),
        permission: 'product-entities:index'
    },
    {
        title: 'Product Entity States',
        description: 'A product entity state defines the state of a product entity. Options: view product entity states.',
        method: () => router.push('/product_entity_states'),
        permission: 'product-entity-states:index'
    },
    {
        title: 'Product Orders',
        description: 'A product order is created when a user decides to buy the products in their cart. A product order holds references to the product entities in the cart. Options: view, create, update, and delete product orders.',
        method: () => router.push('/product_orders'),
        permission: 'product-orders:index'
    },
    {
        title: 'Product Order Entities',
        description: 'A product order entity holds a reference to a product entity and a product order. Options: view, create, update, and delete product order entities.',
        method: () => router.push('/product_order_entities'),
        permission: 'product-order-entities:index'
    },
    {
        title: 'Product Order States',
        description: 'A product order state defines the state of a product order. Options: view product order states.',
        method: () => router.push('/product_order_states'),
        permission: 'product-order-states:index'
    },
    {
        title: 'Deliver Options',
        description: 'A deliver option defines a type of delivery and its cost. Options: view, create, update, and delete deliver options.',
        method: () => router.push('/deliver_options'),
        permission: 'deliver-options:index'
    },
    {
        title: 'Payment Options',
        description: 'A payment option defines a type of payment and its cost. Options: view, create, update, and delete payment options.',
        method: () => router.push('/payment_options'),
        permission: 'payment-options:index'
    },
    {
        title: 'Valuta Settings',
        description: 'A valuta setting defines the currency and exchange rate for a specific valuta. Options: view, create, update, and delete valuta settings.',
        method: () => router.push('/valuta_settings'),
        permission: 'valuta-settings:index'
    }
]

const shoppingCartMenuItems = [
    {
        title: 'Carts',
        description: 'A cart is the main parent entity that holds all the product entities selected by the user. A cart is defined by a state and a link to a product order. Options: view, update, and create carts.',
        method: () => router.push('/carts'),
        permission: 'carts:index'
    },
    {
        title: 'Cart Product Entities',
        description: 'A cart product entity is a child entity of a cart. It holds a reference to a product entity and a cart. Options: view, delete, and create cart product entities.',
        method: () => router.push('/cart_product_entities'),
        permission: 'cart-product-entities:index'
    },
    {
        title: 'Cart States',
        description: 'A cart state defines the state of a cart. Options: View cart states.',
        method: () => router.push('/cart_states'),
        permission: 'cart-states:index'
    },
    {
        title: 'Deliver Options',
        description: 'A deliver option defines a type of delivery and its cost. Options: view deliver options.',
        method: () => router.push('/cart_deliver_options'),
        permission: 'deliver-options:index'
    },
    {
        title: 'Payment Options',
        description: 'A payment option defines a type of payment and its cost. Options: view payment options.',
        method: () => router.push('/cart_payment_options'),
        permission: 'payment-options:index'
    },
    {
        title: 'Products',
        description: 'A product defines the general parameters of a product. Product entities can be created for a product to define an entity of the product a customer can buy. Options: view products.',
        method: () => router.push('/cart_products'),
        permission: 'products:index'
    },
    {
        title: 'Product Entities',
        description: 'A product entity defines a specific entity of a product a customer can buy. Options: view product entities.',
        method: () => router.push('/cart_entities'),
        permission: 'product-entities:index'
    },
    {
        title: 'Product Entity States',
        description: 'A product entity state defines the state of a product entity. Options: view product entity states.',
        method: () => router.push('/cart_product_entity_states'),
        permission: 'product-entity-states:index'
    },
    {
        title: 'Product Orders',
        description: 'A product order is created when a user decides to buy the products in their cart. A product order holds references to the product entities in the cart. Options: view product orders.',
        method: () => router.push('/cart_product_orders'),
        permission: 'product-orders:index'
    },
    {
        title: 'Product Order Entity',
        description: 'A product order entity holds a reference to a product entity and a product order. Options: view product order entities.',
        method: () => router.push('/cart_product_order_entities'),
        permission: 'product-order-entities:index'
    },
    {
        title: 'Product Order States',
        description: 'A product order state defines the state of a product order. Options: view product order states.',
        method: () => router.push('/cart_product_order_states'),
        permission: 'product-order-states:index'
    },
]

const scenesMenuItems = [
    {
        title: '3D Scene Editor',
        description: 'Use the 3D scene editor to create and manage 3D scenes for your application.',
        method: () => {
            window.open(
                import.meta.env.VITE_SCENES_EDITOR_CLIENT_URL, 
                '_blank'
            )
        },
        permission: 'scenes-editor:client:access'
    },
    {
        title: 'Scene VR Client',
        description: 'Use the scene VR client to view 3D scenes in virtual reality.',
        method: () => {
            window.open(
                import.meta.env.VITE_SCENES_VR_CLIENT_URL, 
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
const productsHealth = ref();
const authHealth = ref();
const scenesHealth = ref();
const websockets = useWebsockets()

onMounted(async () => {
    shoppingCartHealth.value = await useShoppingCart().Health.check();
    productsHealth.value = await useProducts().Health.check();
    authHealth.value = await sdk.api.adminHealth.check();
    scenesHealth.value = await useScenes().Health.check();
});
</script>

<template>
    <FlexCenter>
        <div class="m-10 p-3 w-full shadow-md bg-white rounded">
            <div class="p-6">
                <div class="flex justify-between items-center">
                    <h1 class="text-3xl font-bold mb-3">
                        Control Panel
                    </h1>
                </div>

                <p class="text-sm">
                    Welcome to the control panel. <br />
                    Find the menu items below to manage your application.
                </p>
            </div>

            <div v-if="filteredAuthMenuItems.length > 0" class="p-6 mb-6">
                <div class="flex items-center justify-between gap-3 bg-slate-100 mb-6 p-3">
                    <h2 class="text-xl font-bold">
                        Auth Service
                    </h2>

                    <div v-if="authHealth" class="flex gap-3 items-center">
                        <div class="flex gap-1 items-center">
                            <p class="text-sm font-bold">MySQL Connected:</p>
                            <p class="text-xs font-bold border p-1 rounded-md" 
                                :class="authHealth.mysql_connected == true ? 'text-green-600' : 'text-red-600'">
                                {{ authHealth.mysql_connected == true ? 'Yes' : 'No' }}
                            </p>
                        </div>
                        <div class="flex gap-3 items-center">
                            <p class="text-sm font-bold">API:</p>
                            <p class="text-xs font-bold border p-1 rounded-md">
                                {{ authHealth.api_type }}
                            </p>
                            <p class="text-xs font-bold border p-1 rounded-md">
                                {{ authHealth.api_version }}
                            </p>
                        </div>
                        <div class="flex gap-3 items-center">
                            <p class="text-sm font-bold">Exception Handler:</p>
                            <p class="text-xs font-bold border p-1 rounded-md">
                                {{ authHealth.exception_handler }}
                            </p>
                        </div>
                    </div>
                    <div v-else>
                        <p class="text-sm font-bold text-red-600">
                            Service Inaccessible
                        </p>
                    </div>
                </div>

                <div class="mb-6">
                    <p class="text-sm mb-3">
                        The auth service is responsible for managing the entities associated with user authentication and authorization. This service includes the management of users, roles, permissions, and role permissions. Users can be assigned roles, which in turn grant them specific permissions. Permissions can be assigned to roles, allowing users with those roles to access specific resources or perform certain actions. Role permissions define the relationship between roles and permissions, ensuring that users are granted the appropriate access rights based on their assigned roles.
                    </p>

                    <p class="text-sm">
                        <strong>Managable items:</strong> Users; Roles; Role Permissions; Permissions;
                    </p>
                </div>

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

            <div v-if="filteredProductsMenuItems.length > 0" class="p-6 mb-6">
                <div class="flex items-center justify-between gap-3 bg-slate-100 mb-6 p-3">
                    <h2 class="text-xl font-bold">
                        Products Service
                    </h2>

                    <div v-if="productsHealth" class="flex gap-3 items-center">
                        <div class="flex gap-1 items-center">
                            <p class="text-sm font-bold">MySQL Connected:</p>
                            <p class="text-xs font-bold border p-1 rounded-md" 
                                :class="productsHealth.mysql_connected == true ? 'text-green-600' : 'text-red-600'">
                                {{ productsHealth.mysql_connected == true ? 'Yes' : 'No' }}
                            </p>
                        </div>
                        <div class="flex gap-3 items-center">
                            <p class="text-sm font-bold">Message Broker Connected:</p>
                            <p class="text-xs font-bold border p-1 rounded-md" 
                                :class="productsHealth.broker_connected == true ? 'text-green-600' : 'text-red-600'">
                                {{ productsHealth.broker_connected == true ? 'Yes' : 'No' }}
                            </p>
                        </div>
                        <div class="flex gap-3 items-center">
                            <p class="text-sm font-bold">API:</p>
                            <p class="text-xs font-bold border p-1 rounded-md">
                                {{ productsHealth.api_type }}
                            </p>
                        </div>
                        <div class="flex gap-3 items-center">
                            <p class="text-sm font-bold">Exception Handler:</p>
                            <p class="text-xs font-bold border p-1 rounded-md">
                                {{ productsHealth.exception_handler }}
                            </p>
                        </div>
                    </div>
                    <div v-else>
                        <p class="text-sm font-bold text-red-600">
                            Service Inaccessible
                        </p>
                    </div>
                </div>

                <div class="mb-6">
                    <p class="text-sm mb-3">
                        The products service is responsible for managing product entities, each of which represents a specific item available for purchase by a customer. Each product entity is linked to a product, which defines the general attributes of the item. Additionally, the products service handles product orders, which are created when a user decides to purchase the items in their cart. A product order contains references to the product entities in the cart, ensuring that all selected items are accurately included in the final order.                        
                    </p>

                    <p class="text-sm">
                        <strong>Managable items:</strong> Products; Product Entities; Product Orders; Product Order Entities; Payment Options; Deliver Options; Valuta Settings;
                    </p>
                </div>

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

            <div v-if="filteredShoppingCartMenuItems.length > 0" class="p-6 mb-6">
                <div class="flex items-center justify-between gap-3 bg-slate-100 mb-6 p-3">
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
                    <div v-else>
                        <p class="text-sm font-bold text-red-600">
                            Service Inaccessible
                        </p>
                    </div>
                </div>
                
                <div class="mb-6">
                    <p class="text-sm mb-3">
                        The shopping cart service is responsible for managing the entities associated with shopping carts. Each shopping cart entity can hold multiple product entities, representing the items selected by the user. When the owner of a shopping cart decides to complete the purchase, the shopping cart service will generate a product order. This product order will consist of product order entities, each of which will reference the corresponding product entities within the shopping cart. This process ensures that all selected products are accurately included in the final order.
                    </p>

                    <p class="text-sm">
                        <strong>Managable items:</strong> Carts; Cart Product Entities;
                    </p>
                </div>
                
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

            <div v-if="filteredScenesMenuItems.length > 0" class="p-6">
                <div class="flex items-center justify-between gap-3 bg-slate-100 mb-6 p-3">
                    <h2 class="text-xl font-bold">
                        Scenes Service
                    </h2>

                    <div v-if="scenesHealth" class="flex gap-3 items-center">
                        <div class="flex gap-1 items-center">
                            <p class="text-sm font-bold">MySQL Connected:</p>
                            <p class="text-xs font-bold border p-1 rounded-md" 
                                :class="scenesHealth.mysql_connected == true ? 'text-green-600' : 'text-red-600'">
                                {{ scenesHealth.mysql_connected == true ? 'Yes' : 'No' }}
                            </p>
                        </div>
                        <div class="flex gap-3 items-center">
                            <p class="text-sm font-bold">Message Broker Connected:</p>
                            <p class="text-xs font-bold border p-1 rounded-md" 
                                :class="scenesHealth.broker_connected == true ? 'text-green-600' : 'text-red-600'">
                                {{ scenesHealth.broker_connected == true ? 'Yes' : 'No' }}
                            </p>
                        </div>
                        <div class="flex gap-3 items-center">
                            <p class="text-sm font-bold">Elasticsearch Connected:</p>
                            <p class="text-xs font-bold border p-1 rounded-md" 
                                :class="scenesHealth.elastic_connected == true ? 'text-green-600' : 'text-red-600'">
                                {{ scenesHealth.elastic_connected == true ? 'Yes' : 'No' }}
                            </p>
                        </div>
                        <div class="flex gap-3 items-center">
                            <p class="text-sm font-bold">Websocket Connected:</p>
                            <p class="text-xs font-bold border p-1 rounded-md" 
                                :class="websockets.isConnected.value == true ? 'text-green-600' : 'text-red-600'">
                                {{ websockets.isConnected.value == true ? 'Yes' : 'No' }}
                            </p>
                        </div>
                        <div class="flex gap-3 items-center">
                            <p class="text-sm font-bold">API:</p>
                            <p class="text-xs font-bold border p-1 rounded-md">
                                {{ scenesHealth.api_type }}
                            </p>
                            <p class="text-xs font-bold border p-1 rounded-md">
                                {{ scenesHealth.api_version }}
                            </p>
                        </div>
                        <div class="flex gap-3 items-center">
                            <p class="text-sm font-bold">Exception Handler:</p>
                            <p class="text-xs font-bold border p-1 rounded-md">
                                {{ scenesHealth.exception_handler }}
                            </p>
                        </div>
                    </div>
                    <div v-else>
                        <p class="text-sm font-bold text-red-600">
                            Service Inaccessible
                        </p>
                    </div>
                </div>

                <div class="mb-6">
                    <p class="text-sm mb-3">
                        The scenes service provides a 3D scene editor that allows you to create and manage 3D scenes for your application. You can use the editor to design custom scenes, add objects, and define checkout and products. The scenes service is ideal for creating immersive experiences and visualizations that enhance user engagement and interactivity.
                    </p>
                </div>

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
