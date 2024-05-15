<template>
    <IndexTemplate 
        name="Cart States" 
        permissionName="cart-states" 
        path="/cart_states" 
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
import { useShoppingCart } from '../../composables/useShoppingCart.js';
const findAll = useShoppingCart().CartState.findAll
</script>
