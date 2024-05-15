<template>
    <ShowTemplate
        name="Carts"
        permissionName="carts"
        path="/carts"
        pkName="client_side_uuid"
        :canEdit="true"
        :canDelete="false"
        :keys="['client_side_uuid', 'cart_state_name', 'product_order_client_side_uuid']"
        :find="find"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
import { useShoppingCart } from '../../composables/useShoppingCart.js';
const find = useShoppingCart().Cart.find
</script>
