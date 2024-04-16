<template>
    <ShowTemplate
        name="Deliver Options"
        permissionName="deliver-options"
        path="/deliver_options"
        pkName="clientSideUUID"
        :canEdit="true"
        :canDelete="true"
        :keys="['clientSideUUID', 'name', 'price', 'created_at', 'updated_at']"
        :find="find"
        :remove="remove"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const find = useProducts().DeliverOption.find
const remove = useProducts().DeliverOption.remove
</script>
