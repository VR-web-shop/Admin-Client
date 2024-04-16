<template>
    <ShowTemplate
        name="Product Order Entities"
        permissionName="product-order-entities"
        path="/product_order_entities"
        pkName="clientSideUUID"
        :canEdit="true"
        :canDelete="true"
        :keys="['clientSideUUID', 'product_order_client_side_uuid', 'product_entity_client_side_uuid', 'created_at', 'updated_at']"
        :find="find"
        :remove="remove"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const find = useProducts().ProductOrderEntity.find
const remove = useProducts().ProductOrderEntity.remove
</script>
