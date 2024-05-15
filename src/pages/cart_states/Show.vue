<template>
    <ShowTemplate
        name="Cart States"
        permissionName="cart-states"
        path="/cart_states"
        pkName="name"
        :canEdit="false"
        :canDelete="false"
        :keys="['name']"
        :find="find"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
import { useShoppingCart } from '../../composables/useShoppingCart.js';
const find = useShoppingCart().CartState.find
</script>
