<template>
    <CreateTemplate
        name="Users"
        permissionName="users"
        path="/users"
        :submit="submit"
    >
        <input type="text" name="first_name" placeholder="First name" class="p-3 w-full border border-gray-300 rounded-md" />
        <input type="text" name="last_name" placeholder="Last name" class="p-3 w-full border border-gray-300 rounded-md" />
        <input type="email" name="email" placeholder="Email" class="p-3 w-full border border-gray-300 rounded-md" />
        <input type="password" name="password" placeholder="Password" class="p-3 w-full border border-gray-300 rounded-md" />
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
    </CreateTemplate>
</template>
<script setup>
import MeteorPaginator from '../../components/UI/MeteorPaginator.vue';
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
const sdk = useAuthSDK().sdk
const findAllRoles = sdk.api.adminRoles.findAll
const submit = sdk.api.adminUsers.create
</script>
