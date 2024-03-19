<template>
    <Restricted :permissions="['roles:create']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Roles', path: '/roles' },
            { name: 'Create' }
        ]">
            <template v-slot:header>
                <h1 class="text-2xl font-bold mb-3">
                    Create Role
                </h1>
            </template>
            
            <p class="mb-3">
                Use the form below to create a new role with different permissions than existing roles.
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
    const { sdk } = useAuthSDK();
    const req = new sdk.requests.RoleRequest.AdminCreateRequest(data);
    await sdk.api.adminRoles.create(req);
    const toastCtrl = useToast();
    toastCtrl.add('Role created', 5000, 'success');
    formRef.value.reset();
}
</script>
