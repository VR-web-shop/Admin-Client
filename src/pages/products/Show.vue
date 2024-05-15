<template>
    <ShowTemplate
        name="Products"
        permissionName="products"
        path="/products"
        pkName="clientSideUUID"
        :canEdit="true"
        :canDelete="true"
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
        :find="find"
        :remove="remove"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const find = useProducts().Product.find
const remove = useProducts().Product.remove
</script>
