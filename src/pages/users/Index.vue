<template>
    <IndexTemplate 
        name="Users" 
        permissionName="users" 
        path="/users" 
        pkName="client_side_uuid" 
        :keys="['client_side_uuid', 'first_name', 'last_name', 'email', 'created_at', 'updated_at']"
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
const findAll = sdk.api.adminUsers.findAll
const remove = (client_side_uuid) => sdk.api.adminUsers.destroy(client_side_uuid)
</script>
