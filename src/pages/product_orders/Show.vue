<template>
    <ShowTemplate
        name="Product Orders"
        permissionName="product-orders"
        path="/product_orders"
        pkName="clientSideUUID"
        :canEdit="true"
        :canDelete="true"
        :keys="[
            'clientSideUUID', 
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
        :find="find"
        :remove="remove"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const find = useProducts().ProductOrder.find
const remove = useProducts().ProductOrder.remove
</script>
