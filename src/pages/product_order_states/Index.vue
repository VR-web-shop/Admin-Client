<template>
    <IndexTemplate 
        name="Product Order States" 
        permissionName="product-order-states" 
        path="/product_order_states" 
        pkName="name" 
        :keys="['name']"
        :findAll="findAll"
        :canCreate="false"
        :canEdit="false"
        :canDelete="false"
        :canShow="true"
    />
</template>
<script setup>
import IndexTemplate from '../../components/page_templates/IndexTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const findAll = useProducts().ProductOrderState.findAll
</script>
