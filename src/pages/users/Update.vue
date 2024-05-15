<template>
    <UpdateTemplate
        name="Users"
        permissionName="users"
        path="/users"
        pkName="client_side_uuid"
        :submit="submit"
        :entity="entity"
    >
        <input type="text" name="first_name" placeholder="First name" ref="firstNameRef" class="input" />
        <input type="text" name="last_name" placeholder="Last name" ref="lastNameRef" class="input" />
        <input type="email" name="email" placeholder="Email" ref="emailRef" class="input" />
        <input type="password" name="password" placeholder="Password" ref="passwordRef" class="input" />
        <MeteorPaginator :findAllMethod="findAllRoles" :limit="10">

            <template #empty?>
                <div class="text-center text-gray-500">
                    No roles found.
                </div>
            </template>

            <template #default="{ entities }">
                <select name="role_client_side_uuid" ref="roleClientSideUUIDRef"
                    class="border border-gray-300 rounded-md py-1 w-full">
                    <option value="" disabled selected>Select Role</option>
                    <option v-for="role in entities" :key="role.client_side_uuid" :value="role.client_side_uuid">
                        {{ role.name }} - {{ role.description }}
                    </option>
                </select>
            </template>
        </MeteorPaginator>
    </UpdateTemplate>
</template>

<script setup>
import MeteorPaginator from '../../components/UI/MeteorPaginator.vue';
import UpdateTemplate from '../../components/page_templates/UpdateTemplate.vue';
import { router } from '../../router.js';
import { ref, onBeforeMount } from 'vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';

const sdk = useAuthSDK().sdk
const findAllRoles = sdk.api.adminRoles.findAll
const client_side_uuid = router.currentRoute.value.params.client_side_uuid
const entity = ref({});
const firstNameRef = ref(null);
const lastNameRef = ref(null);
const emailRef = ref(null);
const passwordRef = ref(null);
const roleClientSideUUIDRef = ref(null);

function setEntity(newEntity) {
    entity.value = newEntity;
    firstNameRef.value.value = newEntity.first_name;
    lastNameRef.value.value = newEntity.last_name;
    emailRef.value.value = newEntity.email;
    roleClientSideUUIDRef.value.value = newEntity.role_client_side_uuid;
}

async function submit(data) {
    const res = await sdk.api.adminUsers.update(client_side_uuid, data);
    setEntity(res)
}

onBeforeMount(async () => {
    const res = await sdk.api.adminUsers.find(client_side_uuid)
    setEntity(res)
})
</script>
