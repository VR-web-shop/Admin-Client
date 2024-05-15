<template>
    <ShowTemplate
        name="Users"
        permissionName="users"
        path="/users"
        pkName="client_side_uuid"
        :canEdit="true"
        :canDelete="true"
        :keys="['client_side_uuid', 'first_name', 'last_name', 'email', 'created_at', 'updated_at']"
        :find="find"
        :remove="remove"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
const sdk = useAuthSDK().sdk
const find = (client_side_uuid) => sdk.api.adminUsers.find(client_side_uuid)
const remove = (client_side_uuid) => sdk.api.adminUsers.destroy(client_side_uuid)
</script>
