<template>
    <UpdateTemplate
        name="Product Entities"
        permissionName="product-entities"
        path="/product_entities"
        pkName="clientSideUUID"
        :submit="submit"
        :entity="entity"
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
    </UpdateTemplate>
</template>

<script setup>
import MeteorPaginator from '../../components/UI/MeteorPaginator.vue';
import UpdateTemplate from '../../components/page_templates/UpdateTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
import { router } from '../../router.js';
import { ref, onBeforeMount } from 'vue';

const clientSideUUID = router.currentRoute.value.params.clientSideUUID
const entity = ref({});
const productUUIDRef = ref(null);
const ctrl = useProducts();
const findAll = useProducts().Product.findAll

function setEntity(newEntity) {
    entity.value = newEntity;
    productUUIDRef.value.value = newEntity.product_client_side_uuid;
}

async function submit(data) {
    const res = await ctrl.ProductEntity.put(data);
    setEntity(res)
}

onBeforeMount(async () => {
    const res = await ctrl.ProductEntity.find(clientSideUUID)
    setEntity(res)
})
</script>
