<template>
    <Restricted :permissions="['permissions:update']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Permissions', path: '/permissions' },
            { name }
        ]">
            <template v-slot:header>
                <h1 class="text-2xl font-bold mb-3">
                    Update Permission
                </h1>
            </template>

            <p class="mb-3">
                Use the form below to update an existing permission.
            </p>
            
            <div v-if="!permission?.is_user_defined">
                <div class="text-red-500 mb-3">
                    <p class="mb-3">
                        You cannot update a system permission.
                    </p>
                </div>
            </div>

            <div v-show="permission?.is_user_defined">
                <Form 
                    ref="formRef"
                    buttonText="Update"
                    :nameInitialValue="permission?.name"
                    :descriptionInitialValue="permission?.description"
                    :submit="submit" 
                    :validateInput="false"
                />
            </div>
        </Content>
    </Restricted>
</template>

<script setup>
import Form from './Form.vue';
import Content from '../../components/UI/Content.vue';
import Restricted from '../../components/UI/Restricted.vue';
import { ref, onBeforeMount } from 'vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
import { useToast } from '../../composables/useToast.js';
import { router } from '../../router.js';

const formRef = ref();
const permission = ref(null)
const name = router.currentRoute.value.params.name

const { sdk } = useAuthSDK();
const { api, requests } = sdk
const { adminPermissions } = api
const { PermissionRequest } = requests

async function fetchPermission() {
    const req = new PermissionRequest.FindRequest({ name })
    const res = await adminPermissions.find(req)
    permission.value = res
    formRef.value.setPermission(res)
}

async function submit(data) {
    const req = new PermissionRequest.UpdateRequest({ name, ...data });
    await adminPermissions.update(req);
    const toastCtrl = useToast();
    toastCtrl.add('Permission updated', 5000, 'success');

    formRef.value.reset();

    await fetchPermission()
}

onBeforeMount(async () => {
    await fetchPermission()
})
</script>
