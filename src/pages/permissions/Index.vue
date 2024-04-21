<template>
    <IndexTemplate 
        name="Permissions" 
        permissionName="permissions" 
        path="/permissions" 
        pkName="name" 
        :keys="['name', 'description', 'defined_by_system', 'created_at', 'updated_at']"
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
import { useAuthSDK } from '../../composables/useAuthSDK.js';
const sdk = useAuthSDK().sdk
const findAll = sdk.api.adminPermissions.findAll
const remove = (name) => sdk.api.adminPermissions.destroy({ name })
</script>
