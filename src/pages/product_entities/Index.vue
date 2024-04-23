<template>
    <IndexTemplate 
        name="Product Entities" 
        permissionName="product-entities" 
        path="/product_entities" 
        pkName="clientSideUUID" 
        :keys="keys"
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
const keys = [
    'clientSideUUID', 
    'product_entity_state_name', 
    'product_client_side_uuid', 
    'transaction_state_name',
    'transaction_message',
    'created_at', 
    'updated_at'
]
const findAll = useProducts().ProductEntity.findAll
const remove = useProducts().ProductEntity.remove
</script>
