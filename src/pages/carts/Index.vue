<template>
    <IndexTemplate 
        name="Carts" 
        permissionName="carts" 
        path="/carts" 
        pkName="client_side_uuid" 
        :keys="['client_side_uuid', 'cart_state_name', 'product_order_client_side_uuid']"
        :findAll="findAll"
        :canCreate="true"
        :canEdit="true"
        :canDelete="false"
        :canShow="true"
    />
</template>
<script setup>
import IndexTemplate from '../../components/page_templates/IndexTemplate.vue';
import { useShoppingCart } from '../../composables/useShoppingCart.js';
const findAll = useShoppingCart().Cart.findAll
</script>
