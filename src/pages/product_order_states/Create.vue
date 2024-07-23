<template>
    <CreateTemplate 
        name="Product Order States" 
        permissionName="product-order-states" 
        path="/product_order_states" 
        :submit="submit"
    >
        <input type="text" name="name" placeholder="Name" class="p-3 w-full border border-gray-300 rounded-md" />
    </CreateTemplate>
</template>
<script setup>
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const submit = useProducts().ProductOrderState.create
</script>
