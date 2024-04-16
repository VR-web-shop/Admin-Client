<template>
    <IndexTemplate 
        name="Product Entities" 
        permissionName="product-entities" 
        path="/product_entities" 
        pkName="clientSideUUID" 
        :keys="['clientSideUUID', 'product_entity_state_name', 'product_client_side_uuid', 'created_at', 'updated_at']"
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
const findAll = useProducts().ProductEntity.findAll
const remove = useProducts().ProductEntity.remove
</script>
