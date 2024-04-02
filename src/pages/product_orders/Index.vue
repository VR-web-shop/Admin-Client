<template>
    <Restricted :permissions="['product-order-entities:index']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Product Orders' }
        ]">

            <template v-slot:header>
                <h1 class="text-xl font-bold mb-3">
                    Product Orders
                </h1>
            </template>
            
            <MeteorPaginator 
                :findAllMethod="sdk.api.ProductOrderController.findAll"
                :limit="10">
                <template #empty?>
                    <div class="text-center text-gray-500">
                        No product orders found.
                    </div>
                </template>

                <template #default="{ entities }">
                    <table class="w-full border-l border-r border-gray-100">
                        <thead>
                            <tr class="border-b border-t border-gray-100">
                                <th class="text-left p-3">UUID</th>
                                <th class="text-center">State</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product_order in entities" :key="product_order.uuid" class="border-b border-gray-100">
                                <td class="text-left p-3">{{ product_order.uuid }}</td>
                                <td class="text-center p-3">{{ product_order.product_order_state_name }}</td>
                                <td class="text-center">
                                    <RestrictedElement :permissions="['product-order-entities:show']">
                                        <router-link :to="'/product_orders/' + product_order.uuid" class="text-blue-500">View</router-link>
                                    </RestrictedElement>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </template>
            </MeteorPaginator>
        </Content>
    </Restricted>
</template>
<script setup>
import Content from '../../components/UI/Content.vue';
import MeteorPaginator from '../../components/UI/MeteorPaginator.vue';
import Restricted from '../../components/UI/Restricted.vue';
import RestrictedElement from '../../components/UI/RestrictedElement.vue';
import { useProductSDK } from '../../composables/useProductSDK.js';

const { sdk } = useProductSDK()
</script>
