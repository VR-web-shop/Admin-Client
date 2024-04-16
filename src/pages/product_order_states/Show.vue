<template>
    <ShowTemplate
        name="Product Order States"
        permissionName="product-order-states"
        path="/product_order_states"
        pkName="name"
        :canEdit="false"
        :canDelete="false"
        :keys="['name']"
        :find="find"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const find = useProducts().ProductOrderState.find
</script>
