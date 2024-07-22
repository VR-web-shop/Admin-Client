<template>
    <IndexTemplate 
        name="Product Orders (shopping-cart)" 
        permissionName="product-orders" 
        path="/cart_product_orders" 
        pkName="client_side_uuid" 
        :keys="[
            'client_side_uuid', 
            'name', 
            'email', 
            'address', 
            'city', 
            'country', 
            'postal_code', 
            'product_order_state_name', 
            'deliver_option_client_side_uuid', 
            'payment_option_client_side_uuid', 
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
const findAll = useShoppingCart().ProductOrder.findAll
</script>
