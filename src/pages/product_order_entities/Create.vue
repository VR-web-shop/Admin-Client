<template>
    <CreateTemplate 
        name="Product Order Entities" 
        permissionName="product-order-entities" 
        path="/product_order_entities" 
        :submit="submit"
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
                    <option v-for="order in entities" :key="order.clientSideUUID" :value="order.clientSideUUID">
                        {{ order.clientSideUUID }}
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
const findAllEntity = useProducts().ProductEntity.findAll
const findAllOrder = useProducts().ProductOrder.findAll
const submit = useProducts().ProductOrderEntity.put
</script>
