<template>
    <Restricted :permissions="['product-orders:show']">
        <div v-if="!productOrder">
            Loading...
        </div>

        <Content v-else :links="[
        { name: 'Control Panel', path: '/' },
        { name: 'Product Orders', path: '/product_orders' },
        { name: productOrder.uuid }
    ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    {{ productOrder.uuid }}
                </h1>

                <div>
                    <RestrictedElement :permissions="['product-orders:update']" class="flex gap-3">
                        <button v-if="productOrder.product_order_state_name === 'WAITING_FOR_SHIPMENT'" @click="markAsShipped" class="bg-green-500 text-white p-2 rounded-md shadow-md">
                            Mark as shipped
                        </button>

                        <button v-if="productOrder.product_order_state_name === 'SHIPPED_TO_CUSTOMER'" @click="markAsDelivered" class="bg-green-500 text-white p-2 rounded-md shadow-md">
                            Mark as delivered
                        </button>

                        <button v-if="productOrder.product_order_state_name !== 'DISCARDED_BY_EMPLOYEE' && productOrder.product_order_state_name !== 'CANCELLED_BY_CUSTOMER'" @click="markAsDiscarded" class="bg-red-500 text-white p-2 rounded-md shadow-md">
                            Mark as discarded
                        </button>
                    </RestrictedElement>
                </div>
            </template>

            <div class="bg-gray-100 text-black rounded-md p-3 mb-3">
                <h2 class="text-xl font-bold mb-3">
                    Information
                </h2>
                <div class="flex items-center justify-start gap-3">
                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">State</label>
                        <div class="capitalize">{{ productOrder.product_order_state_name }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Name</label>
                        <div class="capitalize">{{ productOrder.name }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">E-mail</label>
                        <div class="capitalize">{{ productOrder.email }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Address</label>
                        <div class="capitalize">{{ productOrder.address }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">City</label>
                        <div class="capitalize">{{ productOrder.city }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Country</label>
                        <div class="capitalize">{{ productOrder.country }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Postal code</label>
                        <div class="capitalize">{{ productOrder.postal_code }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Delivery option</label>
                        <div class="capitalize">{{ productOrder.deliver_option_name }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Payment option</label>
                        <div class="capitalize">{{ productOrder.payment_option_name }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Created at</label>
                        <div class="capitalize">{{ productOrder.created_at }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Updated at</label>
                        <div class="capitalize">{{ productOrder.updated_at }}</div>
                    </div>
                </div>
            </div>

            <div class="bg-gray-100 text-black rounded-md p-3 mb-3">
                <h2 class="text-xl font-bold mb-3">
                    Product entities
                </h2>

                <div class="flex items-center justify-start gap-3">
                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Product entities</label>
                        <div class="capitalize">
                            <div v-for="entity in productOrder.ProductEntities" :key="entity.uuid" class="flex flex-col">
                                <router-link :to="'/product_entities/' + entity.uuid" class="text-blue-500">
                                    Product Entity: {{ entity.uuid }}
                                </router-link>

                                <router-link :to="'/products/' + entity.product_uuid" class="text-blue-500">
                                    Product: {{ entity.product_uuid }}
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Content>
    </Restricted>
</template>

<script setup>
import RestrictedElement from '../../components/UI/RestrictedElement.vue';
import Restricted from '../../components/UI/Restricted.vue';
import Content from '../../components/UI/Content.vue';
import { router } from '../../router.js';
import { useProductSDK } from '../../composables/useProductSDK.js';
import { ref, onBeforeMount } from 'vue'

const { sdk } = useProductSDK()
const productOrder = ref(null)

const markAsShipped = async () => {
    await sdk.api.ProductOrderController.update({ uuid: productOrder.value.uuid, product_order_state_name: 'SHIPPED_TO_CUSTOMER' })
    await fetchProductOrder()
}

const markAsDelivered = async () => {
    await sdk.api.ProductOrderController.update({ uuid: productOrder.value.uuid, product_order_state_name: 'DELIVERED_TO_CUSTOMER' })
    await fetchProductOrder()
}

const markAsDiscarded = async () => {
    await sdk.api.ProductOrderController.update({ uuid: productOrder.value.uuid, product_order_state_name: 'DISCARDED_BY_EMPLOYEE' })
    await fetchProductOrder()
}

const fetchProductOrder = async () => {
    const uuid = router.currentRoute.value.params.uuid
    const res = await sdk.api.ProductOrderController.find({ uuid }, { include: 'product_entities' })
    productOrder.value = res
}

onBeforeMount(async () => fetchProductOrder())
</script>
