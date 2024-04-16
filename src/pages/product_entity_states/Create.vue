<template>
    <CreateTemplate 
        name="Product Entity States" 
        permissionName="product-entity-states" 
        path="/product_entity_states" 
        :submit="submit"
    >
        <input type="text" name="name" placeholder="Name" class="input" />
    </CreateTemplate>
</template>
<script setup>
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const submit = useProducts().ProductEntityState.create
</script>
