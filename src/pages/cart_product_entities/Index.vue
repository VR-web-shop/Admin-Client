<template>
    <IndexTemplate 
        name="Cart Product Entities" 
        permissionName="cart-product-entities" 
        path="/cart_product_entities" 
        pkName="client_side_uuid" 
        :keys="['client_side_uuid', 'cart_client_side_uuid', 'product_entity_client_side_uuid']"
        :findAll="findAll"
        :remove="remove"
        :canCreate="true"
        :canEdit="false"
        :canDelete="true"
        :canShow="true"
    />
</template>
<script setup>
import IndexTemplate from '../../components/page_templates/IndexTemplate.vue';
import { useShoppingCart } from '../../composables/useShoppingCart.js';
const findAll = useShoppingCart().CartProductEntity.findAll
const remove = useShoppingCart().CartProductEntity.remove
</script>
