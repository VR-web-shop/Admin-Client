<template>
    <CreateTemplate
        name="Roles"
        permissionName="roles"
        path="/roles"
        :submit="submit"
    >
    <input type="text" name="name" placeholder="Name" class="p-3 w-full border border-gray-300 rounded-md" />
    <input type="text" name="description" placeholder="Description" class="p-3 w-full border border-gray-300 rounded-md" />
    </CreateTemplate>
</template>
<script setup>
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
const sdk = useAuthSDK().sdk
const submit = sdk.api.adminRoles.create
</script>
