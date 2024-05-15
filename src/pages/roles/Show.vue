<template>
    <ShowTemplate
        name="Roles"
        permissionName="roles"
        path="/roles"
        pkName="client_side_uuid"
        :canEdit="true"
        :canDelete="true"
        :keys="['client_side_uuid', 'name', 'description', 'defined_by_system', 'created_at', 'updated_at']"
        :find="find"
        :remove="remove"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
const sdk = useAuthSDK().sdk
const find = (client_side_uuid) => sdk.api.adminRoles.find(client_side_uuid)
const remove = (client_side_uuid) => sdk.api.adminRoles.destroy(client_side_uuid)
</script>
