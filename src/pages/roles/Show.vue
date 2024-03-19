<template>
    <Restricted :permissions="['roles:show']">
        <div v-if="!role">
            Loading...
        </div>

        <Content v-else :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Roles', path: '/roles' },
            { name: role.name }
        ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    {{ role.name }}
                </h1>

                <RestrictedElement :permissions="['roles:update']">
                    <router-link
                        :to="'/roles/' + role.name + '/edit'"
                        class="bg-blue-500 text-white px-3 py-1 rounded-md">Edit</router-link>
                </RestrictedElement>
            </template>

            <p class="mb-3">
                {{ role.description }}
            </p>

            <div class="bg-gray-500 text-white rounded-md p-3 mb-3">
                <h2 class="text-xl font-bold mb-3">
                    Information
                </h2>

                <div class="flex items-center justify-start gap-3">

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Is User Defined</label>
                        <div class="capitalize">{{ role.is_user_defined }}</div>
                    </div>
                </div>
            </div>

            <RestrictedElement :permissions="['roles:show:permissions']" class="bg-gray-500 text-white rounded-md p-3 mb-3">
                <h2 class="text-xl font-bold mb-3">
                    Permissions
                </h2>

                <div class="grid grid-cols-3 gap-3">
                    <div v-for="permission in permissions" :key="permission.name"
                        class="border border-gray-300 p-3 rounded-md shadow-md">
                        <div class="block text-sm font-bold mb-1 break-words">{{ permission.name }}</div>
                        <div class="break-words">{{ permission.description }}</div>
                    </div>
                </div>
            </RestrictedElement>

            <DeleteCard
                navigateOnDelete="/roles"
                buttonText="Delete Role"
                permission="roles:delete"
                foreignKeyName="name"
                :foreignKeyValue="role.name"
                :request="sdk.requests.RoleRequest.AdminDeleteRequest"
                :destroyMethod="sdk.api.adminRoles.destroy"
                :isDeletable="role.is_user_defined"
            >
                <template v-slot:description>
                    Be careful when deleting a role. This action is irreversible.
                </template>
                <template v-slot:notDeleteable>
                    Warning: You cannot delete a system role.
                </template>
            </DeleteCard>
        </Content>
    </Restricted>
</template>

<script setup>
import RestrictedElement from '../../components/UI/RestrictedElement.vue';
import Restricted from '../../components/UI/Restricted.vue';
import DeleteCard from '../../components/UI/DeleteCard.vue';
import Content from '../../components/UI/Content.vue';
import { router } from '../../router.js'
import { useAuthSDK } from '../../composables/useAuthSDK.js';
import { ref, onBeforeMount } from 'vue'

const { sdk } = useAuthSDK()
const { adminRoles } = sdk.api
const { RoleRequest } = sdk.requests

const name = router.currentRoute.value.params.name
const permissions = ref([])
const role = ref(null)

async function fetchEntity() {
    const req = new RoleRequest.AdminFindRequest({ name })
    const res = await adminRoles.find(req)
    role.value = res
}

async function fetchPermissions() {
    const req = new RoleRequest.AdminFindRequest({ name })
    const res = await adminRoles.findPermissions(req)

    permissions.value = res
}

onBeforeMount(async () => {
    await fetchEntity()
    await fetchPermissions()
})
</script>
