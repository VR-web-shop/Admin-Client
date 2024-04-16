<template>
    <ShowTemplate
        name="Valuta Settings"
        permissionName="valuta-settings"
        path="/valuta_settings"
        pkName="clientSideUUID"
        :canEdit="true"
        :canDelete="true"
        :keys="['clientSideUUID', 'name', 'short', 'symbol', 'active', 'created_at', 'updated_at']"
        :find="find"
        :remove="remove"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const find = useProducts().ValutaSetting.find
const remove = useProducts().ValutaSetting.remove
</script>
