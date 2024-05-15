<template>
    <CreateTemplate
        name="Cart Product Entities" 
        permissionName="cart-product-entities" 
        path="/cart_product_entities" 
        :submit="submit"
    >
    <MeteorPaginator :findAllMethod="findAllProductEntities" :limit="10">

        <template #empty?>
            <div class="text-center text-gray-500">
                No product entities found.
            </div>
        </template>

        <template #default="{ entities }">
            <select name="product_entity_client_side_uuid" ref="productEntityRef"
                class="border border-gray-300 rounded-md py-1 w-full">
                <option value="" disabled selected>Select Product Entity</option>
                <option v-for="entity in entities" :key="entity.clientSideUUID" :value="entity.clientSideUUID">
                    {{ entity.clientSideUUID }}
                </option>
            </select>
        </template>
    </MeteorPaginator>
    <MeteorPaginator :findAllMethod="findAllCarts" :limit="10">

        <template #empty?>
            <div class="text-center text-gray-500">
                No carts found.
            </div>
        </template>

        <template #default="{ entities }">
            <select name="cart_client_side_uuid" ref="productEntityRef"
                class="border border-gray-300 rounded-md py-1 w-full">
                <option value="" disabled selected>Select Cart</option>
                <option v-for="cart in entities" :key="cart.client_side_uuid" :value="cart.client_side_uuid">
                    {{ cart.client_side_uuid }}
                </option>
            </select>
        </template>
    </MeteorPaginator>
    </CreateTemplate>
</template>
<script setup>
import MeteorPaginator from '../../components/UI/MeteorPaginator.vue';
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useShoppingCart } from '../../composables/useShoppingCart.js';
import { useProducts } from '../../composables/useProducts.js';
const findAllProductEntities = useProducts().ProductEntity.findAll
const findAllCarts = useShoppingCart().Cart.findAll
const submit = useShoppingCart().CartProductEntity.create
</script>
