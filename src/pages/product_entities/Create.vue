<template>
    <CreateTemplate 
        name="Product Entities" 
        permissionName="product-entities" 
        path="/product_entities" 
        :submit="submit"
    >
        <MeteorPaginator :findAllMethod="findAll" :limit="10">

            <template #empty?>
                <div class="text-center text-gray-500">
                    No products found.
                </div>
            </template>

            <template #default="{ entities }">
                <select name="product_client_side_uuid" ref="productUUIDRef"
                    class="border border-gray-300 rounded-md py-1 w-full">
                    <option value="" disabled selected>Select Product</option>
                    <option v-for="product in entities" :key="product.clientSideUUID" :value="product.clientSideUUID">
                        {{ product.name }} - {{ product.description }}
                    </option>
                </select>
            </template>
        </MeteorPaginator>
    </CreateTemplate>
</template>
<script setup>
import MeteorPaginator from '../../components/UI/MeteorPaginator.vue';
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const findAll = useProducts().Product.findAll
const submit = (data) => {
    data.product_entity_state_name = 'AVAILABLE_FOR_PURCHASE'
    useProducts().ProductEntity.put(data)
}
</script>
