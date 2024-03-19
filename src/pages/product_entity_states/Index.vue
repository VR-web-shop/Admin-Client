<template>
    <Restricted :permissions="['product-entity-states:index']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Product Entity States' }
        ]">

            <template v-slot:header>
                <h1 class="text-xl font-bold mb-3">
                    Product Entity States
                </h1>
            </template>
            
            <Paginator 
                :request="sdk.requests.ProductEntityStateRequest.FindAllRequest" 
                :findAllMethod="sdk.api.productEntityStates.findAll"
                :entitiesKey="'product_entity_states'">
                <template v-slot="{ entities }">
                    <table class="w-full border-l border-r border-gray-100">
                        <thead>
                            <tr class="border-b border-t border-gray-100">
                                <th class="text-left p-3">Name</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product_entity_state in entities" :key="product_entity_state.name" class="border-b border-gray-100">
                                <td class="text-left p-3">{{ product_entity_state.name }}</td>
                                <td class="text-center">
                                    <RestrictedElement :permissions="['product-entity-states:show']">
                                        <router-link :to="'/product_entity_states/' + product_entity_state.name" class="text-blue-500">View</router-link>
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
