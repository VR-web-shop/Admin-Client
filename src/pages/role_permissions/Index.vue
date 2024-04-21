<template>
    <IndexTemplate 
        name="Role Permissions" 
        permissionName="role-permissions" 
        path="/role_permissions" 
        pkName="client_side_uuid" 
        :keys="['client_side_uuid', 'role_client_side_uuid', 'permission_name']"
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
const findAll = sdk.api.adminRolePermissions.findAll
const remove = (client_side_uuid) => sdk.api.adminRolePermissions.destroy({ client_side_uuid })
</script>
