<template>
    <CreateTemplate
        name="Role Permissions"
        permissionName="role-permissions"
        path="/role_permissions"
        :submit="submit"
    >
        <MeteorPaginator :findAllMethod="findAllRoles" :limit="10">

            <template #empty?>
                <div class="text-center text-gray-500">
                    No roles found.
                </div>
            </template>

            <template #default="{ entities }">
                <select name="role_client_side_uuid"
                    class="border border-gray-300 rounded-md py-1 w-full">
                    <option value="" disabled selected>Select Role</option>
                    <option v-for="role in entities" :key="role.client_side_uuid" :value="role.client_side_uuid">
                        {{ role.name }} - {{ role.description }}
                    </option>
                </select>
            </template>
        </MeteorPaginator>
        <MeteorPaginator :findAllMethod="findAllPermissions" :limit="10">

            <template #empty?>
                <div class="text-center text-gray-500">
                    No permissions found.
                </div>
            </template>

            <template #default="{ entities }">
                <select name="permission_name" ref="productUUIDRef"
                    class="border border-gray-300 rounded-md py-1 w-full">
                    <option value="" disabled selected>Select Permission</option>
                    <option v-for="permission in entities" :key="permission.name" :value="permission.name">
                        {{ permission.name }} - {{ permission.description }}
                    </option>
                </select>
            </template>
        </MeteorPaginator>
    </CreateTemplate>
</template>
<script setup>
import MeteorPaginator from '../../components/UI/MeteorPaginator.vue';
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
const sdk = useAuthSDK().sdk
const findAllRoles = sdk.api.adminRoles.findAll
const findAllPermissions = sdk.api.adminPermissions.findAll
const submit = sdk.api.adminRolePermissions.create
</script>
