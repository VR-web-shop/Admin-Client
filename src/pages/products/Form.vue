<template>
    <form @submit.prevent="submitProxy" ref="formRef">

        <InputControl>
            <input type="text" placeholder="Name" name="name" ref="nameRef" class="w-full" />
            <small>
                <span>
                    A name are used by customers' to identify the product.
                </span>
            </small>
        </InputControl>

        <InputControl>
            <input type="text" placeholder="Description" name="description" ref="descRef" class="w-full" />
            <small>
                <span>
                    A description are used by customers' to understand the product.
                </span>
            </small>
        </InputControl>

        <InputControl>
            <input type="number" placeholder="Price" name="price" ref="priceRef" class="w-full" />
            <small>
                <span>
                    The price determines the cost of one unit of the product.
                </span>
            </small>
        </InputControl>

        <InputControl>
            <input type="file" placeholder="File" name="thumbnail_source" ref="fileRef" class="w-full" />
            <small>
                <span>
                    The thumbnail is used to represent the product in the store as a 2D image.
                </span>
            </small>
        </InputControl>

        <slot />

        <Button :disabled="btnDisabled" type="submit">{{ buttonText }}</Button>
    </form>
</template>

<script setup>
import Button from '../../components/UI/Button.vue';
import InputControl from '../../components/UI/InputControl.vue';
import { ref, defineExpose } from 'vue';
import { useProductSDK } from '../../composables/useProductSDK.js';
import { useToast } from '../../composables/useToast.js';

const formRef = ref(null);
const props = defineProps({
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

const btnDisabled = ref(false);
const nameRef = ref(null);
const descRef = ref(null);
const priceRef = ref(null);
const fileRef = ref(null);

const reset = () => {
    nameRef.value.value = props.nameInitialValue;
    descRef.value.value = props.descriptionInitialValue;
    priceRef.value.value = props.priceInitialValue;
    fileRef.value.value = '';
}

const setProduct = (product) => {
    nameRef.value.value = product.name;
    descRef.value.value = product.description;
    priceRef.value.value = product.price;
}

async function submitProxy() {
    btnDisabled.value = true;
    const formData = new FormData(formRef.value);

    if (props.validateInput) {
        const toastCtrl = useToast();

        if (!formData.get('name')) {
            toastCtrl.add('Product name is required', 5000, 'error');
            return;
        }

        if (!formData.get('description')) {
            toastCtrl.add('Product description is required', 5000, 'error');
            return;
        }

        if (!formData.get('price')) {
            toastCtrl.add('Product price is required', 5000, 'error');
            return;
        }

        const size = formData.get('thumbnail_source').size;
        if (size === 0) {
            toastCtrl.add('Product thumbnail is required', 5000, 'error');
            return;
        }
    }
    
    await props.submit(formData);
    btnDisabled.value = false;
}

defineExpose({
    reset,
    setProduct
})

</script>
