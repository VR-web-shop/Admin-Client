<template>
    <form @submit.prevent="submitProxy">

        <InputControl>
            <span v-if="existingPermission">
                <p><small>The current name is: <strong>{{ nameInitialValue }}</strong>;</small></p>
                <p><small>The name cannot be updated</small></p>
            </span>
            <div v-else>
                <input type="text" placeholder="Name" v-model="name" class="w-full" />
                <small>A name is used to identify the permission.</small>
            </div>
        </InputControl>

        <InputControl>
            <input type="text" placeholder="Description" v-model="description" class="w-full" />
            <small>
                <span v-if="existingPermission">
                    The current description is: <strong>{{ descriptionInitialValue }}</strong>; <br /> Leave blank to keep the same.  
                </span>
                <span v-else>
                    Enter a description about the permission.
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
const existingPermission = ref();
const name = ref('');
const description = ref('');

function setPermission(permission) {
    existingPermission.value = true;
    name.value = permission.name;
    description.value = permission.description;
}

function reset() {
    name.value = '';
    description.value = '';
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
    }

    const parameters = {}
    if (name.value) parameters.name = toRaw(name.value);
    if (description.value) parameters.description = toRaw(description.value);

    await props.submit(parameters);
}

defineExpose({ reset, setPermission });
</script>
