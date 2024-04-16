<template>
    <IndexTemplate 
        name="Product Entity States" 
        permissionName="product-entity-states" 
        path="/product_entity_states" 
        pkName="name" 
        :keys="['name']"
        :findAll="findAll"
        :canCreate="true"
        :canEdit="false"
        :canDelete="false"
        :canShow="true"
    />
</template>
<script setup>
import IndexTemplate from '../../components/page_templates/IndexTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const findAll = useProducts().ProductEntityState.findAll
const remove = useProducts().ProductEntityState.remove
</script>
