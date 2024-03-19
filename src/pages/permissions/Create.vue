<template>
    <Restricted :permissions="['permissions:create']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Permissions', path: '/permissions' },
            { name: 'Create' }
        ]">
            <template v-slot:header>
                <h1 class="text-2xl font-bold mb-3">
                    Create Permission
                </h1>
            </template>

            <p class="mb-3">
                Use the form below to create a new permission.
            </p>
            
            <Form ref="formRef" :submit="submit" />
        </Content>
    </Restricted>
</template>

<script setup>
import Restricted from '../../components/UI/Restricted.vue';
import Content from '../../components/UI/Content.vue';
import Form from './Form.vue';
import { ref, toRaw } from 'vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
import { useToast } from '../../composables/useToast.js';

const formRef = ref(null);

async function submit(data) {
    const toastCtrl = useToast();
    const { sdk } = useAuthSDK();

    try {
        const req = new sdk.requests.PermissionRequest.CreateRequest(data);
        await sdk.api.adminPermissions.create(req);
        toastCtrl.add('Permission created', 5000, 'success');
        formRef.value.reset();
    } catch (error) {
        if (error instanceof sdk.errors.SDKFetchError) {
            toastCtrl.add(error, 5000, 'error');
            return;
        }

        console.error(error);
    }
}
</script>
