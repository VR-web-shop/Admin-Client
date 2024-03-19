<template>
    <Restricted :permissions="['roles:update']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Roles', path: '/roles' },
            { name }
        ]">
            <template v-slot:header>
                <h1 class="text-2xl font-bold mb-3">
                    Update Role
                </h1>
            </template>

            <p class="mb-3">
                Use the form below to update an existing role.
            </p>
            <div v-if="!role?.is_user_defined">
                <div class="text-red-500 mb-3">
                    <p class="mb-3">
                        You cannot update a system role.
                    </p>
                </div>
            </div>

            <div v-show="role?.is_user_defined">
                <Form 
                    ref="formRef"
                    buttonText="Update"
                    :nameInitialValue="role?.name"
                    :descriptionInitialValue="role?.description"
                    :submit="submit" 
                    :validateInput="false"
                />
            </div>
        </Content>
    </Restricted>
</template>

<script setup>
import Form from './Form.vue';
import Restricted from '../../components/UI/Restricted.vue';
import Content from '../../components/UI/Content.vue';
import { ref, onBeforeMount } from 'vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
import { useToast } from '../../composables/useToast.js';
import { router } from '../../router.js';

const formRef = ref();
const role = ref(null)
const name = router.currentRoute.value.params.name

const { sdk } = useAuthSDK();
const { api, requests } = sdk
const { adminRoles } = api
const { RoleRequest } = requests

async function fetchRole() {
    const req = new RoleRequest.AdminFindRequest({ name })
    const res = await adminRoles.find(req)
    role.value = res
    formRef.value.setRole(res)
}

async function fetchPermissions() {
    const req = new RoleRequest.AdminFindRequest({ name })
    const res = await adminRoles.findPermissions(req)
    formRef.value.setPermissionNames(res.map(p => p.name))
}

async function submit(data) {
    const req = new RoleRequest.AdminUpdateRequest({ name, ...data });
    await adminRoles.update(req);
    const toastCtrl = useToast();
    toastCtrl.add('Role updated', 5000, 'success');

    formRef.value.reset();

    await fetchRole()
    await fetchPermissions()
}

onBeforeMount(async () => {
    await fetchRole()
    await fetchPermissions()
})
</script>
