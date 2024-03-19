<template>
    <form @submit.prevent="submitProxy">

        <InputControl>
            <input type="text" placeholder="Name" v-model="name" class="w-full" />
            <small>
                <span v-if="existingProduct">
                    The current name is: <strong>{{ nameInitialValue }}</strong>; <br /> Leave blank to keep the same.  
                </span>
                <span v-else>
                    A name are used by customers' to identify the product.
                </span>
            </small>
        </InputControl>

        <InputControl>
            <input type="text" placeholder="Description" v-model="description" class="w-full" />
            <small>
                <span v-if="existingProduct">
                    The current description is: <strong>{{ descriptionInitialValue }}</strong>; <br /> Leave blank to keep the same.  
                </span>
                <span v-else>
                    A description are used by customers' to understand the product.
                </span>
            </small>
        </InputControl>

        <Button type="submit">{{ buttonText }}</Button>
    </form>
</template>

<script setup>
import Button from '../../components/UI/Button.vue';
import InputControl from '../../components/UI/InputControl.vue';
import { ref, defineExpose } from 'vue';
import { useProductSDK } from '../../composables/useProductSDK.js';
import { useToast } from '../../composables/useToast.js';

const props = defineProps({
    nameInitialValue: {
        type: String,
        required: false,
        default: ''
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

const { sdk } = useProductSDK();
const existingProduct = ref(false);
const name = ref('');
const description = ref('');

function setProduct(product) {
    existingProduct.value = true;
    name.value = product.name;
    description.value = product.description;
}

function reset() {
    name.value = '';
    description.value = '';
}

async function submitProxy() {
    if (props.validateInput) {
        const toastCtrl = useToast();

        if (!name.value) {
            toastCtrl.add('Product name is required', 5000, 'error');
            return;
        }

        if (!description.value) {
            toastCtrl.add('Product description is required', 5000, 'error');
            return;
        }
    }

    const parameters = {}
    if (name.value) parameters.name = name.value;
    if (description.value) parameters.description = description.value;

    await props.submit(parameters);
}

defineExpose({ reset, setProduct });
</script>
