<template>
    <form @submit.prevent="submitProxy">

        <InputControl>
            <span v-if="existingRole">
                <p><small>The current name is: <strong>{{ nameInitialValue }}</strong>;</small></p>
                <p><small>The name cannot be updated</small></p>
            </span>
            <div v-else>
                <input type="text" placeholder="Name" v-model="name" class="w-full" />
                <small>A name is used to identify the role.</small>
            </div>
        </InputControl>

        <InputControl>
            <input type="text" placeholder="Description" v-model="description" class="w-full" />
            <small>
                <span v-if="existingRole">
                    The current description is: <strong>{{ descriptionInitialValue }}</strong>; <br /> Leave blank to keep the same.  
                </span>
                <span v-else>
                    Enter a description about the role's permissions.
                </span>
            </small>
        </InputControl>

        <InputControl>
            <p class="mb-1">Permissions</p>
            <Paginator
                :request="sdk.requests.PermissionRequest.FindAllRequest"
                :findAllMethod="sdk.api.adminPermissions.findAll"
                :entitiesKey="'permissions'"
                :limit="4">
                <template v-slot="{ entities }">
                    <div class="grid grid-cols-2 w-full">
                        <div v-for="permission in entities" :key="permission.name" class="break-words border border-gray-300 p-1">
                            <p class="text-xs font-bold">{{ permission.name }}</p>
                            <p class="text-xs">{{ permission.description }}</p>
                            <Button 
                                type="button" 
                                class="text-white text-xs border border-black"
                                :class="isPermissionSelected(permission.name) ? 'bg-red-500' : 'bg-green-500'"
                                @click="togglePermission(permission.name)">
                                {{ isPermissionSelected(permission.name) ? 'Remove' : 'Add' }}
                            </Button>
                        </div>
                    </div>
                </template>
            </Paginator>

            <div v-if="existingRole">
                <p class="mb-1 mt-3">The current permissions is:</p>
                <div class="grid grid-cols-2 w-full">
                    <div v-for="permission in permissionNames" :key="permission" class="break-words border border-gray-300 p-1">
                        <p class="text-xs font-bold">{{ permission }}</p>

                        <Button 
                            type="button" 
                            class="text-white text-xs border border-black bg-red-500"
                            @click="togglePermission(permission)">
                            Remove
                        </Button>
                    </div>
                </div>
                <small>
                    Leave blank to keep the same.  
                    A role can have one or more permissions.
                </small>
            </div>
        </InputControl>

        <Button type="submit">{{ buttonText }}</Button>
    </form>
</template>

<script setup>
import Paginator from '../../components/UI/Paginator.vue';
import Button from '../../components/UI/Button.vue';
import InputControl from '../../components/UI/InputControl.vue';
import { ref, toRaw, onBeforeMount, defineExpose } from 'vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
import { useToast } from '../../composables/useToast.js';

const props = defineProps({
    nameInitialValue: {
        type: String,
        required: false
    },
    descriptionInitialValue: {
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
const existingRole = ref();
const permissionNames = ref([]);
const name = ref('');
const description = ref('');

function togglePermission(permissionName) {
    if (permissionNames.value.includes(permissionName)) {
        permissionNames.value = permissionNames.value.filter(n => n !== permissionName);
    } else {
        permissionNames.value.push(permissionName);
    }
}

function isPermissionSelected(permissionName) {
    return permissionNames.value.includes(permissionName);
}

function setPermissionNames(names) {
    permissionNames.value = names;
}

function setRole(role) {
    existingRole.value = true;
    name.value = role.name;
    description.value = role.description;
}

function reset() {
    name.value = '';
    description.value = '';
    permissionNames.value = [];
}

async function submitProxy() {
    if (props.validateInput) {
        const toastCtrl = useToast();

        if (!name.value) {
            toastCtrl.add('Name is required', 5000, 'error');
            return;
        }

        if (!description.value) {
            toastCtrl.add('Description is required', 5000, 'error');
            return;
        }

        if (permissionNames.value.length === 0) {
            toastCtrl.add('At least one permission is required', 5000, 'error');
            return;
        }
    }

    const parameters = {}
    if (name.value) parameters.name = toRaw(name.value);
    if (description.value) parameters.description = toRaw(description.value);
    if (permissionNames.value.length > 0) parameters.permissionNames = toRaw(permissionNames.value);

    await props.submit(parameters);
}

defineExpose({ reset, setPermissionNames, setRole });
</script>
