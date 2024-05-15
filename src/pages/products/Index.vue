<template>
    <IndexTemplate 
        name="Products" 
        permissionName="products" 
        path="/products" 
        pkName="clientSideUUID" 
        :keys="[
            'clientSideUUID', 
            'name', 
            'description', 
            'thumbnail_source', 
            'price', 
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
const findAll = useProducts().Product.findAll
const remove = useProducts().Product.remove
</script>
