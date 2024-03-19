<template>
    <Restricted :permissions="['users:update']">
        <Content :links="[
        { name: 'Control Panel', path: '/' },
        { name: 'Users', path: '/users' },
        { name: user?.uuid, path: '/users/' + user?.uuid },
        { name: 'Update' }
    ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    Update User
                </h1>
            </template>

            <p class="mb-3">
                Use the form below to update an existing user
                for employees or customers.
            </p>
            <div v-if="user?.uuid === me?.uuid">
                <div class="text-red-500 mb-3">
                    <p class="mb-3">
                        You cannot update yourself. Please contact another admin to update your account.
                    </p>
                </div>
            </div>

            <div v-else>
                <Form 
                    ref="formRef" 
                    buttonText="Update" 
                    :emailInitialValue="user?.email"
                    :roleInitialValue="user?.role_name" 
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
const user = ref(null)
const me = ref(null)
const uuid = router.currentRoute.value.params.uuid

const { sdk } = useAuthSDK();
const { api, requests } = sdk
const { adminUsers, users } = api
const { UserRequest } = requests

async function fetchUser() {
    const req = new UserRequest.AdminFindRequest({ uuid })
    const res = await adminUsers.find(req)
    const resMe = await users.findMe()
    me.value = resMe
    user.value = res
}

async function submit(data) {
    const req = new UserRequest.AdminUpdateRequest({ uuid, ...data });
    await adminUsers.update(req);
    const toastCtrl = useToast();
    toastCtrl.add('User updated', 5000, 'success');

    formRef.value.reset();
    await fetchUser()
}

onBeforeMount(async () => {
    await fetchUser()
})
</script>
