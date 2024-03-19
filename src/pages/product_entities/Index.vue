<template>
    <Restricted :permissions="['product-entities:index']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Product Entity' }
        ]">

            <template v-slot:header>
                <h1 class="text-xl font-bold mb-3">
                    Product Entity
                </h1>

                <RestrictedElement :permissions="['product-entities:create']">
                    <router-link 
                        to="/product_entities/create" 
                        class="bg-blue-500 text-white px-3 py-1 rounded-md">Create Product Entity</router-link>
                </RestrictedElement>
            </template>

            <Paginator 
                :request="sdk.requests.ProductEntityRequest.FindAllRequest" 
                :findAllMethod="sdk.api.productEntities.findAll"
                :entitiesKey="'product_entities'">
                <template v-slot="{ entities }">
                    <table class="w-full border-l border-r border-gray-100">
                        <thead>
                            <tr class="border-b border-t border-gray-100">
                                <th class="text-left p-3">UUID</th>
                                <th class="text-left">State</th>
                                <th class="text-center">Product UUID</th>
                                <th class="text-center">Created at</th>
                                <th class="text-center">Updated at</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product_entity in entities" :key="product_entity.uuid" class="border-b border-gray-100">
                                <td class="text-left p-3">{{ product_entity.uuid }}</td>
                                <td class="text-left">{{ product_entity.product_entity_state_name }}</td>
                                <td class="text-center">
                                    <router-link :to="'/products/' + product_entity.product_uuid" class="text-blue-500">{{ product_entity.product_uuid }}</router-link>
                                </td>
                                <td class="text-center">{{ product_entity.created_at }}</td>
                                <td class="text-center">{{ product_entity.updated_at }}</td>
                                <td class="text-center">
                                    <RestrictedElement :permissions="['product-entities:show']">
                                        <router-link :to="'/product_entities/' + product_entity.uuid" class="text-blue-500">View</router-link>
                                    </RestrictedElement>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </template>
            </Paginator>
        </Content>
    </Restricted>
</template>
<script setup>
import Content from '../../components/UI/Content.vue';
import Paginator from '../../components/UI/Paginator.vue';
import Restricted from '../../components/UI/Restricted.vue';
import RestrictedElement from '../../components/UI/RestrictedElement.vue';
import { useProductSDK } from '../../composables/useProductSDK.js';

const { sdk } = useProductSDK()
</script>
