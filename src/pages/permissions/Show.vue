<template>
    <Restricted :permissions="['roles:show']">
        <div v-if="!permission">
            Loading...
        </div>

        <Content v-else :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Permissions', path: '/permissions' },
            { name: permission.name }
        ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    {{ permission.name }}
                </h1>

                <RestrictedElement :permissions="['permissions:update']">
                    <router-link
                        :to="'/permissions/' + permission.name + '/edit'"
                        class="bg-blue-500 text-white px-3 py-1 rounded-md">Edit</router-link>
                </RestrictedElement>
            </template>

            <p class="mb-3">
                {{ permission.description }}
            </p >

            <div class="bg-gray-500 text-white rounded-md p-3 mb-3">
                <h2 class="text-xl font-bold mb-3">
                    Information
                </h2>

                <div class="flex items-center justify-start gap-3">

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Is User Defined</label>
                        <div class="capitalize">{{ permission.is_user_defined }}</div>
                    </div>
                </div>
            </div>

            <DeleteCard
                navigateOnDelete="/permissions"
                buttonText="Delete Permission"
                permission="permissions:delete"
                foreignKeyName="name"
                :foreignKeyValue="permission.name"
                :request="sdk.requests.PermissionRequest.DeleteRequest"
                :destroyMethod="sdk.api.adminPermissions.destroy"
                :isDeletable="permission.is_user_defined"
            >
                <template v-slot:description>
                    Be careful when deleting a permission. This action is irreversible.
                </template>
                <template v-slot:notDeleteable>
                    Warning: You cannot delete a system permission.
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
const permission = ref(null)

onBeforeMount(async () => {
    const name = router.currentRoute.value.params.name
    const req = new sdk.requests.PermissionRequest.FindRequest({ name })
    const res = await sdk.api.adminPermissions.find(req)
    permission.value = res
})
</script>
