<template>
    <Restricted :permissions="['product-order-entities:show']">
        <div v-if="!productOrderEntity">
            Loading...
        </div>

        <Content v-else :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Product Order Entities', path: '/product_order_entities' },
            { name: productOrderEntity.uuid }
        ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    {{ productOrderEntity.uuid }}
                </h1>
            </template>

            <div class="bg-gray-500 text-white rounded-md p-3 mb-3">
                <h2 class="text-xl font-bold mb-3">
                    Information
                </h2>
                <div class="flex items-center justify-start gap-3">
                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Product Order</label>
                        <div class="capitalize">
                            <RestrictedElement :permissions="['product-orders:show']">
                                <router-link :to="'/product_orders/' + productOrderEntity.product_order_uuid" class="text-blue-500">
                                    {{ productOrderEntity.product_order_uuid }}
                                </router-link>
                            </RestrictedElement>
                        </div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Product Entity</label>
                        <div class="capitalize">
                            <RestrictedElement :permissions="['product-entities:show']">
                                <router-link :to="'/product_entities/' + productOrderEntity.product_entity_uuid" class="text-blue-500">
                                    {{ productOrderEntity.product_entity_uuid }}
                                </router-link>
                            </RestrictedElement>
                        </div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Created at</label>
                        <div class="capitalize">{{ productOrderEntity.created_at }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Updated at</label>
                        <div class="capitalize">{{ productOrderEntity.updated_at }}</div>
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
const productOrderEntity = ref(null)

onBeforeMount(async () => {
    const uuid = router.currentRoute.value.params.uuid
    const res = await sdk.api.ProductOrderEntityController.find({ uuid })
    productOrderEntity.value = res
})
</script>
