<template>
    <IndexTemplate 
        name="Product Order Entities" 
        permissionName="product-order-entities" 
        path="/product_order_entities" 
        pkName="clientSideUUID" 
        :keys="['clientSideUUID', 'product_order_client_side_uuid', 'product_entity_client_side_uuid', 'created_at', 'updated_at']"
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
const findAll = useProducts().ProductOrderEntity.findAll
const remove = useProducts().ProductOrderEntity.remove
</script>
