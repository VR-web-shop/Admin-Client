<template>
    <IndexTemplate 
        name="Cart Payment Options (shopping-cart)" 
        permissionName="payment-options" 
        path="/cart_payment_options" 
        pkName="client_side_uuid" 
        :keys="[
            'client_side_uuid', 
            'name', 
            'price', 
            'transaction_state_name',
            'transaction_message',
            'created_at', 
            'updated_at'
        ]"
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
const findAll = useShoppingCart().PaymentOption.findAll
</script>
