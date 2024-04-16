<template>
    <UpdateTemplate
        name="Product Order Entities"
        permissionName="product-order-entities"
        path="/product_order_entities"
        pkName="clientSideUUID"
        :submit="submit"
        :entity="entity"
    >
    <MeteorPaginator :findAllMethod="findAllEntity" :limit="10">

        <template #empty?>
            <div class="text-center text-gray-500">
                No product entities found.
            </div>
        </template>

        <template #default="{ entities }">
            <select name="product_entity_client_side_uuid" ref="productEntityUUIDRef"
                class="border border-gray-300 rounded-md py-1 w-full">
                <option value="" disabled selected>Select Product Entity</option>
                <option v-for="entity in entities" :key="entity.clientSideUUID" :value="entity.clientSideUUID">
                    {{ entity.clientSideUUID }}
                </option>
            </select>
        </template>
    </MeteorPaginator>

    <MeteorPaginator :findAllMethod="findAllOrder" :limit="10">

        <template #empty?>
            <div class="text-center text-gray-500">
                No product orders found.
            </div>
        </template>

        <template #default="{ entities }">
            <select name="product_order_client_side_uuid" ref="productOrderUUIDRef"
                class="border border-gray-300 rounded-md py-1 w-full">
                <option value="" disabled selected>Select Product Order</option>
                <option v-for="order in entities" :key="order.clientSideUUID" :value="entity.clientSideUUID">
                    {{ order.clientSideUUID }}
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
const productEntityUUIDRef = ref(null);
const productOrderUUIDRef = ref(null);
const ctrl = useProducts();
const findAllEntity = ctrl.ProductEntity.findAll
const findAllOrder = ctrl.ProductOrder.findAll

function setEntity(newEntity) {
    entity.value = newEntity;
    productEntityUUIDRef.value.value = newEntity.product_entity_client_side_uuid;
    productOrderUUIDRef.value.value = newEntity.product_order_client_side_uuid;
}

async function submit(data) {
    const res = await ctrl.ProductOrderEntity.put(data);
    setEntity(res)
}

onBeforeMount(async () => {
    const res = await ctrl.ProductOrderEntity.find(clientSideUUID)
    setEntity(res)
})
</script>
