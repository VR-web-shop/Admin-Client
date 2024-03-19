<template>
    <form @submit.prevent="submitProxy">

        <InputControl>
            <input type="text" placeholder="Email" v-model="email" class="w-full" />
            <small>
                <span v-if="existingUser">
                    The current email is: <strong>{{ emailInitialValue }}</strong>; <br /> Leave blank to keep the same.  
                </span>
                <span v-else>
                    E-mail's are used to identify the actor when authenticating.
                </span>
            </small>
        </InputControl>

        <InputControl>
            <input type="password" placeholder="Password" v-model="password" class="w-full" />
            <small>
                <span v-if="existingUser">
                    Leave blank to keep the same.
                </span>
                <span v-else>
                    Enter a secure password to protect the account.
                </span>
            </small>
        </InputControl>

        <InputControl>
            <input type="password" placeholder="Confirm Password" v-model="confirmPassword" class="w-full" />
            <small>
                <span v-if="existingUser">
                    Leave blank to keep the same.
                </span>
                <span v-else>
                    Confirm the password to ensure it was typed correctly.
                </span>
            </small>
        </InputControl>

        <InputControl>
            <Paginator
                :request="sdk.requests.RoleRequest.AdminFindAllRequest"
                :findAllMethod="sdk.api.adminRoles.findAll"
                :entitiesKey="'roles'">
                <template v-slot="{ entities }">
                    <select v-model="role_name" id="role" class="border border-gray-300 rounded-md py-1 w-full">
                        <option value="" disabled selected>Select Role</option>
                        <option v-for="role in entities" :key="role.name" :value="role.name">
                            {{ role.name }} - {{ role.description }}
                        </option>
                    </select>
                </template>
            </Paginator>

            <small>
                <span v-if="existingUser">
                    The current role is: <strong>{{ roleInitialValue }}</strong>; <br/> Leave blank to keep the same.  
                </span>
                <span v-else>
                    Roles are used to determine the actor's permissions within the system.
                </span>
            </small>
        </InputControl>

        <Button type="submit">{{ buttonText }}</Button>
    </form>
</template>

<script setup>
import Paginator from '../../components/UI/Paginator.vue';
import Button from '../../components/UI/Button.vue';
import InputControl from '../../components/UI/InputControl.vue';
import { ref, onBeforeMount, defineExpose } from 'vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
import { useToast } from '../../composables/useToast.js';

const props = defineProps({
    emailInitialValue: {
        type: String,
        required: false,
        default: ''
    },
    roleInitialValue: {
        type: String,
        required: false,
        default: ''
    },
    buttonText: {
        type: String,
        required: false,
        default: 'Create'
    },
    submit: {
        type: Function,
        required: true
    },
    validateInput: {
        type: Boolean,
        required: false,
        default: true
    }
});

const { sdk } = useAuthSDK();
const existingUser = ref(props.emailInitialValue !== '');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const role_name = ref('');

function reset() {
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    role_name.value = '';
}

async function submitProxy() {
    if (props.validateInput) {
        const toastCtrl = useToast();

        if (!email.value) {
            toastCtrl.add('Email is required', 5000, 'error');
            return;
        }

        if (!password.value) {
            toastCtrl.add('Password is required', 5000, 'error');
            return;
        }

        if (password.value !== confirmPassword.value) {
            toastCtrl.add('Passwords do not match', 5000, 'error');
            return;
        }

        if (!role_name.value) {
            toastCtrl.add('Role is required', 5000, 'error');
            return;
        }
    }

    const parameters = {}
    if (email.value) parameters.email = email.value;
    if (password.value) parameters.password = password.value;
    if (role_name.value) parameters.role_name = role_name.value;

    await props.submit(parameters);
}

defineExpose({ reset });
</script>
