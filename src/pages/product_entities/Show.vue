<template>
    <Restricted :permissions="['product-entities:show']">
        <div v-if="!productEntity">
            Loading...
        </div>

        <Content v-else :links="[
        { name: 'Control Panel', path: '/' },
        { name: 'Product Entities', path: '/product_entities' },
        { name: uuid }
    ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    {{ uuid }}
                </h1>

                <RestrictedElement :permissions="['product-entities:update']">
                    <router-link :to="'/product_entities/' + uuid + '/edit'"
                        class="bg-blue-500 text-white px-3 py-1 rounded-md">Edit</router-link>
                </RestrictedElement>
            </template>

            <div class="bg-gray-500 text-white rounded-md p-3 mb-3">
                <h2 class="text-xl font-bold mb-3">
                    Information
                </h2>

                <div class="flex items-center justify-start gap-3">
                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">State</label>
                        <div class="capitalize">{{ productEntity.product_entity_state_name }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Product UUID</label>
                        <div class="capitalize">
                            <router-link :to="'/products/' + productEntity.product_uuid" class="text-blue-500">{{ productEntity.product_uuid }}</router-link>
                        </div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Created at</label>
                        <div class="capitalize">{{ productEntity.created_at }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Updated at</label>
                        <div class="capitalize">{{ productEntity.updated_at }}</div>
                    </div>
                </div>
            </div>

            <DeleteCard 
                navigateOnDelete="/product_entities" 
                buttonText="Delete Product Entity" 
                permission="product-entities:delete"
                foreignKeyName="uuid" 
                :foreignKeyValue="productEntity.uuid"
                :destroyMethod="sdk.api.ProductEntityController.destroy"
                :isDeletable="true">
                <template v-slot:description>
                    Be careful when deleting a product entity. This action is irreversible.
                </template>

                <template v-slot:notDeleteable>
                    Everything is fine.
                </template>
            </DeleteCard>
        </Content>
    </Restricted>
</template>

<script setup>
import RestrictedElement from '../../components/UI/RestrictedElement.vue';
import DeleteCard from '../../components/UI/DeleteCard.vue';
import Restricted from '../../components/UI/Restricted.vue';
import Content from '../../components/UI/Content.vue';
import { router } from '../../router.js'
import { useProductSDK } from '../../composables/useProductSDK.js';
import { ref, onBeforeMount } from 'vue'

const { sdk } = useProductSDK()

const uuid = router.currentRoute.value.params.uuid
const productEntity = ref(null)

async function fetchProductEntity() {
    const res = await sdk.api.ProductEntityController.find({ uuid })
    productEntity.value = res
}

onBeforeMount(async () => {
    await fetchProductEntity()
})
</script>
