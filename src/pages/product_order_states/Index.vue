<template>
    <IndexTemplate 
        name="Product Order States" 
        permissionName="product-order-states" 
        path="/product_order_states" 
        pkName="name" 
        :keys="['name']"
        :findAll="findAll"
        :canCreate="true"
        :canEdit="true"
        :canDelete="true"
        :canShow="true"
        :remove="remove"
    />
</template>
<script setup>
import IndexTemplate from '../../components/page_templates/IndexTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const findAll = useProducts().ProductOrderState.findAll
const remove = useProducts().ProductOrderState.remove
</script>
