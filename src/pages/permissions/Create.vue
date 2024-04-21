<template>
    <CreateTemplate
        name="Permissions"
        permissionName="permissions"
        path="/permissions"
        :submit="submit"
    >
    <input type="text" name="name" placeholder="Name" class="input" />
    <input type="text" name="description" placeholder="Description" class="input" />
    </CreateTemplate>
</template>
<script setup>
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
const sdk = useAuthSDK().sdk
const submit = sdk.api.adminPermissions.create
</script>
