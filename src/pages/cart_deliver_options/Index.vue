<template>
    <IndexTemplate 
        name="Cart Deliver Options (shopping-cart)" 
        permissionName="deliver-options" 
        path="/cart_deliver_options" 
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
const findAll = useShoppingCart().DeliverOption.findAll
</script>
