<template>
    <Restricted :permissions="['product-order-entities:index']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Product Order Entities' }
        ]">

            <template v-slot:header>
                <h1 class="text-xl font-bold mb-3">
                    Product Order Entities
                </h1>
            </template>
            
            <MeteorPaginator 
                :findAllMethod="sdk.api.ProductOrderEntityController.findAll"
                :limit="10">
                <template #empty?>
                    <div class="text-center text-gray-500">
                        No product order entities found.
                    </div>
                </template>

                <template #default="{ entities }">
                    <table class="w-full border-l border-r border-gray-100">
                        <thead>
                            <tr class="border-b border-t border-gray-100">
                                <th class="text-left p-3">UUID</th>
                                <th class="text-center">Product Order</th>
                                <th class="text-center">Product Entity</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr v-for="product_order_entity in entities" :key="product_order_entity.uuid" class="border-b border-gray-100">
                                <td class="text-left p-3">{{ product_order_entity.uuid }}</td>
                                <td class="text-left p-3">
                                    <RestrictedElement :permissions="['product-orders:show']">
                                        <router-link :to="'/product_orders/' + product_order_entity.product_order_uuid" class="text-blue-500">
                                            {{ product_order_entity.product_order_uuid }}
                                        </router-link>
                                    </RestrictedElement>
                                </td>
                                <td class="text-left p-3">
                                    <RestrictedElement :permissions="['product-entities:show']">
                                        <router-link :to="'/product_entities/' + product_order_entity.product_entity_uuid" class="text-blue-500">
                                            {{ product_order_entity.product_entity_uuid }}
                                        </router-link>
                                    </RestrictedElement>
                                </td>
                                <td class="text-center">
                                    <RestrictedElement :permissions="['product-order-entities:show']">
                                        <router-link :to="'/product_order_entities/' + product_order_entity.uuid" class="text-blue-500">View</router-link>
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
