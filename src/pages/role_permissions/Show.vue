<template>
    <ShowTemplate
        name="Role Permissions"
        permissionName="role-permissions"
        path="/role_permissions"
        pkName="client_side_uuid"
        :canEdit="false"
        :canDelete="true"
        :keys="['client_side_uuid', 'role_client_side_uuid', 'permission_name']"
        :find="find"
        :remove="remove"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
const sdk = useAuthSDK().sdk
const find = (client_side_uuid) => sdk.api.adminRolePermissions.find(client_side_uuid)
const remove = (client_side_uuid) => sdk.api.adminRolePermissions.destroy(client_side_uuid)
</script>
