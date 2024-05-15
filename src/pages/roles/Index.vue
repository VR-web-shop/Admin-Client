<template>
    <IndexTemplate 
        name="Roles" 
        permissionName="roles" 
        path="/roles" 
        pkName="client_side_uuid" 
        :keys="['client_side_uuid', 'name', 'description', 'defined_by_system', 'created_at', 'updated_at']"
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
const findAll = sdk.api.adminRoles.findAll
const remove = (client_side_uuid) => sdk.api.adminRoles.destroy(client_side_uuid)
</script>
