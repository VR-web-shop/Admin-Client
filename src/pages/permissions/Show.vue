<template>
    <ShowTemplate
        name="Permissions"
        permissionName="permissions"
        path="/permissions"
        pkName="name"
        :canEdit="true"
        :canDelete="true"
        :keys="['name', 'description', 'defined_by_system', 'created_at', 'updated_at']"
        :find="find"
        :remove="remove"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
const sdk = useAuthSDK().sdk
const find = (name) => sdk.api.adminPermissions.find(name)
const remove = (name) => sdk.api.adminPermissions.destroy(name)
</script>
