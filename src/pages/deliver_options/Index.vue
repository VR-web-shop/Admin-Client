<template>
    <IndexTemplate 
        name="Deliver Options" 
        permissionName="deliver-options" 
        path="/deliver_options" 
        pkName="clientSideUUID" 
        :keys="['clientSideUUID', 'name', 'price', 'created_at', 'updated_at']"
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
const findAll = useProducts().DeliverOption.findAll
const remove = useProducts().DeliverOption.remove
</script>
