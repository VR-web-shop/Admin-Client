<template>
    <ShowTemplate
        name="Product Entity States"
        permissionName="product-entity-states"
        path="/product_entity_states"
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
const find = useProducts().ProductEntityState.find
</script>
