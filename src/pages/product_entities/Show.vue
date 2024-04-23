<template>
    <ShowTemplate
        name="Product Entities"
        permissionName="product-entities"
        path="/product_entities"
        pkName="clientSideUUID"
        :canEdit="true"
        :canDelete="true"
        :keys="keys"
        :find="find"
        :remove="remove"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
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
const find = useProducts().ProductEntity.find
const remove = useProducts().ProductEntity.remove
</script>
