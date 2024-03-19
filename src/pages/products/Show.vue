<template>
    <Restricted :permissions="['products:show']">
        <div v-if="!product">
            Loading...
        </div>

        <Content v-else :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Products', path: '/products' },
            { name: product.uuid }
        ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    {{ product.name }}
                </h1>

                <RestrictedElement :permissions="['products:update']">
                    <router-link
                        :to="'/products/' + product.uuid + '/edit'"
                        class="bg-blue-500 text-white px-3 py-1 rounded-md">Edit</router-link>
                </RestrictedElement>
            </template>

            <div class="bg-gray-500 text-white rounded-md p-3 mb-3">
                <h2 class="text-xl font-bold mb-3">
                    Information
                </h2>

                <div class="flex items-center justify-start gap-3">
                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Description</label>
                        <div class="capitalize">{{ product.description }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Created at</label>
                        <div class="capitalize">{{ product.created_at }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Updated at</label>
                        <div class="capitalize">{{ product.updated_at }}</div>
                    </div>
                </div>
            </div>

            <DeleteCard 
                navigateOnDelete="/products" 
                buttonText="Delete Product" 
                permission="products:delete"
                foreignKeyName="uuid" 
                :foreignKeyValue="product.uuid"
                :request="sdk.requests.ProductRequest.DeleteRequest" 
                :destroyMethod="sdk.api.products.destroy"
                :isDeletable="true">
                <template v-slot:description>
                    Be careful when deleting a product. This action is irreversible.
                </template>

                <template v-slot:notDeleteable>
                    Everything is fine.
                </template>
            </DeleteCard>
        </Content>
    </Restricted>    
</template>

<script setup>
import Restricted from '../../components/UI/Restricted.vue';
import RestrictedElement from '../../components/UI/RestrictedElement.vue';
import DeleteCard from '../../components/UI/DeleteCard.vue';
import Content from '../../components/UI/Content.vue';
import { router } from '../../router.js';
import { useProductSDK } from '../../composables/useProductSDK.js';
import { ref, onBeforeMount } from 'vue'

const { sdk } = useProductSDK()
const product = ref(null)

onBeforeMount(async () => {
    const uuid = router.currentRoute.value.params.uuid
    const req = new sdk.requests.ProductRequest.FindRequest({ uuid })
    const res = await sdk.api.products.find(req)
    product.value = res
})
</script>
