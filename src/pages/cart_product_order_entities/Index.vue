<template>
    <IndexTemplate 
        name="Product Order Entities (shopping-cart)" 
        permissionName="product-order-entities" 
        path="/cart_product_order_entities" 
        pkName="client_side_uuid" 
        :keys="[
            'client_side_uuid', 
            'product_order_client_side_uuid', 
            'product_entity_client_side_uuid', 
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
const findAll = useShoppingCart().ProductOrderEntity.findAll
</script>
