<template>
    <IndexTemplate 
        name="Product Orders" 
        permissionName="product-orders" 
        path="/product_orders" 
        pkName="clientSideUUID" 
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
        :findAll="findAll"
        :remove="remove"
        :canCreate="true"
        :canEdit="true"
        :canDelete="true"
        :canShow="true"
    />
</template>
<script setup>
import IndexTemplate from '../../components/page_templates/IndexTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const findAll = useProducts().ProductOrder.findAll
const remove = useProducts().ProductOrder.remove
</script>
