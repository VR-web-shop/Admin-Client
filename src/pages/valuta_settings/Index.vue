<template>
    <IndexTemplate 
        name="Valuta Settings" 
        permissionName="valuta-settings" 
        path="/valuta_settings"
        pkName="clientSideUUID" 
        :keys="['clientSideUUID', 'name', 'short', 'symbol', 'active', 'created_at', 'updated_at']"
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
const findAll = useProducts().ValutaSetting.findAll
const remove = useProducts().ValutaSetting.remove
</script>
