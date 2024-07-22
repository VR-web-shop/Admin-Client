<template>
    <IndexTemplate 
        name="Product Order States (shopping-cart)" 
        permissionName="product-order-states" 
        path="/cart_product_order_states" 
        pkName="name" 
        :keys="['name']"
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
const findAll = useShoppingCart().ProductOrderState.findAll
</script>
