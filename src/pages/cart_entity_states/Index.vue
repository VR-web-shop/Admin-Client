<template>
    <IndexTemplate 
        name="Product Entity States (shopping-cart)" 
        permissionName="product-entity-states" 
        path="/cart_product_entity_states" 
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
const findAll = useShoppingCart().ProductEntityState.findAll
</script>
