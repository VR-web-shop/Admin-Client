<template>
    <IndexTemplate 
        name="Products (shopping-cart)" 
        permissionName="products" 
        path="/cart_products" 
        pkName="client_side_uuid" 
        :keys="[
            'client_side_uuid', 
            'name', 
            'description', 
            'thumbnail_source', 
            'price', 
            'transaction_state_name',
            'transaction_message', 
            'created_at', 
            'updated_at'
        ]"
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
const findAll = useShoppingCart().Product.findAll
</script>
