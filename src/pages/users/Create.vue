<template>
    <Restricted :permissions="['users:create']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Users', path: '/users' },
            { name: 'Create' }
        ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    Create User
                </h1>
            </template>

            <p class="mb-3">
                Use the form below to create a new user to create new users
                for employees or regular users for customers.
            </p>

            <Form ref="formRef" :submit="submit" />
        </Content>
    </Restricted>
</template>

<script setup>
import Content from '../../components/UI/Content.vue';
import Restricted from '../../components/UI/Restricted.vue';
import Form from './Form.vue';
import { ref } from 'vue';
import { router } from '../../router.js';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
import { useToast } from '../../composables/useToast.js';

const formRef = ref(null);

async function submit(data) {
    const { sdk } = useAuthSDK();
    const { api, requests } = sdk;
    const { adminUsers } = api;
    const { UserRequest } = requests;

    const req = new UserRequest.AdminCreateRequest(data);
    await adminUsers.create(req);
    const toastCtrl = useToast();
    toastCtrl.add('User created', 5000, 'success');
    formRef.value.reset();
}
</script>
