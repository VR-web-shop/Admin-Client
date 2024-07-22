<template>
    <IndexTemplate 
        name="Product Entities (shopping-cart)" 
        permissionName="product-entities" 
        path="/cart_entities" 
        pkName="client_side_uuid" 
        :keys="keys"
        :findAll="findAll"
        :canCreate="false"
        :canEdit="false"
        :canDelete="false"
        :canShow="false"
    />
</template>
<script setup>
import IndexTemplate from '../../components/page_templates/IndexTemplate.vue';
import { useShoppingCart } from '../../composables/useShoppingCart.js';
const keys = [
    'client_side_uuid', 
    'product_entity_state_name', 
    'product_client_side_uuid', 
    'transaction_state_name',
    'transaction_message',
    'created_at', 
    'updated_at'
]
const findAll = useShoppingCart().ProductEntity.findAll
</script>
