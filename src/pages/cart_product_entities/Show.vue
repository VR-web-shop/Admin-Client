<template>
    <ShowTemplate
        name="Cart Product Entities"
        permissionName="cart-product-entities"
        path="/cart_product_entities"
        pkName="client_side_uuid"
        :canEdit="false"
        :canDelete="true"
        :keys="['client_side_uuid', 'cart_client_side_uuid', 'product_entity_client_side_uuid']"
        :find="find"
        :remove="remove"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
import { useShoppingCart } from '../../composables/useShoppingCart.js';
const find = useShoppingCart().CartProductEntity.find
const remove = useShoppingCart().CartProductEntity.remove
</script>
