<template>
    <CreateTemplate 
        name="Cart States" 
        permissionName="cart-states" 
        path="/cart_states" 
        :submit="submit"
    >
        <input type="text" name="name" placeholder="Name" class="p-3 w-full border border-gray-300 rounded-md" />
    </CreateTemplate>
</template>
<script setup>
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useShoppingCart } from '../../composables/useShoppingCart.js';
const submit = useShoppingCart().CartState.create
</script>
