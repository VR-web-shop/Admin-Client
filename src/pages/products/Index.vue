<template>
    <Restricted :permissions="['products:index']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Products' }
        ]">

            <template v-slot:header>
                <h1 class="text-xl font-bold mb-3">
                    Products
                </h1>

                <RestrictedElement :permissions="['products:create']">
                    <router-link 
                        to="/products/create" 
                        class="bg-blue-500 text-white px-3 py-1 rounded-md">Create Product</router-link>
                </RestrictedElement>
            </template>
            
            <Paginator 
                :request="sdk.requests.ProductRequest.FindAllRequest" 
                :findAllMethod="sdk.api.products.findAll"
                :entitiesKey="'products'">
                <template v-slot="{ entities }">
                    <table class="w-full border-l border-r border-gray-100">
                        <thead>
                            <tr class="border-b border-t border-gray-100">
                                <th class="text-left p-3">UUID</th>
                                <th class="text-left">Name</th>
                                <th class="text-left">Description</th>
                                <th class="text-center">Created at</th>
                                <th class="text-center">Updated at</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in entities" :key="product.uuid" class="border-b border-gray-100">
                                <td class="p-3">{{ product.uuid }}</td>
                                <td class="text-left">{{ product.name }}</td>
                                <td class="text-left">{{ product.description }}</td>
                                <td class="text-center">{{ product.created_at }}</td>
                                <td class="text-center">{{ product.updated_at }}</td>
                                <td class="text-center">
                                    <RestrictedElement :permissions="['products:show']">
                                        <router-link :to="'/products/' + product.uuid" class="text-blue-500">View</router-link>
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
console.log(sdk)
</script>
