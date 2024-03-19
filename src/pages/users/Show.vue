<template>
    <Restricted :permissions="['users:show']">
        <div v-if="!user">
            Loading...
        </div>

        <Content v-else :links="[
        { name: 'Control Panel', path: '/' },
        { name: 'Users', path: '/users' },
        { name: user.uuid }
    ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    {{ user.email }}
                </h1>

                <RestrictedElement :permissions="['users:update']">
                    <router-link :to="'/users/' + user.uuid + '/edit'"
                        class="bg-blue-500 text-white px-3 py-1 rounded-md">Edit</router-link>
                </RestrictedElement>
            </template>

            <div class="bg-gray-500 text-white rounded-md p-3 mb-3">
                <h2 class="text-xl font-bold mb-3">
                    Information
                </h2>

                <div class="flex items-center justify-start gap-3">
                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Role</label>
                        <div class="capitalize">{{ user.role_name }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Created at</label>
                        <div class="capitalize">{{ user.created_at }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Updated at</label>
                        <div class="capitalize">{{ user.updated_at }}</div>
                    </div>
                </div>
            </div>

            <RestrictedElement :permissions="['users:show:permissions']"
                class="bg-gray-500 text-white rounded-md p-3 mb-3">
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
                navigateOnDelete="/users" 
                buttonText="Delete User" 
                permission="users:delete"
                foreignKeyName="uuid" 
                :foreignKeyValue="user.uuid"
                :request="sdk.requests.UserRequest.AdminDeleteRequest" 
                :destroyMethod="sdk.api.adminUsers.destroy"
                :isDeletable="me.uuid !== user.uuid">
                <template v-slot:description>
                    Be careful when deleting a user. This action is irreversible.
                </template>

                <template v-slot:notDeleteable>
                    Warning: You cannot delete yourself. Please contact another admin to delete your account.
                </template>
            </DeleteCard>
        </Content>
    </Restricted>
</template>

<script setup>
import RestrictedElement from '../../components/UI/RestrictedElement.vue';
import DeleteCard from '../../components/UI/DeleteCard.vue';
import Restricted from '../../components/UI/Restricted.vue';
import Content from '../../components/UI/Content.vue';
import { router } from '../../router.js'
import { useAuthSDK } from '../../composables/useAuthSDK.js';
import { usePermission } from '../../composables/usePermission.js';
import { ref, onBeforeMount } from 'vue'

const { sdk } = useAuthSDK()
const { api } = sdk
const { adminUsers, users } = api
const { UserRequest } = sdk.requests

const uuid = router.currentRoute.value.params.uuid
const permissions = ref([])
const user = ref(null)
const me = ref(null)

async function fetchUser() {
    const req = new UserRequest.AdminFindRequest({ uuid })
    const res = await adminUsers.find(req)
    const resMe = await users.findMe()
    me.value = resMe
    user.value = res
}

async function fetchPermissions() {
    if (!usePermission('users:show:permissions')) return

    const req = new UserRequest.AdminFindRequest({ uuid })
    const res = await adminUsers.findPermissions(req)

    permissions.value = res
}

onBeforeMount(async () => {
    await fetchUser()
    await fetchPermissions()
})
</script>
