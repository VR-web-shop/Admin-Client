<template>
    <form @submit.prevent="submitProxy">

        <InputControl>
            <MeteorPaginator
                :findAllMethod="sdk.api.ProductController.findAll"
                :limit="10">

                <template #empty?>
                    <div class="text-center text-gray-500">
                        No products found.
                    </div>
                </template>

                <template #default="{ entities }">
                    <select name="product_uuid" ref="productUUIDRef" id="product_uuid" class="border border-gray-300 rounded-md py-1 w-full">
                        <option value="" disabled selected>Select Product</option>
                        <option v-for="product in entities" :key="product.uuid" :value="product.uuid">
                            [{{ product.uuid }}] - {{ product.name }} - {{ product.description }}
                        </option>
                    </select>
                </template>
            </MeteorPaginator>

            <small>
                <span>
                    The product determines the type of product entity.
                    A product can have many product entities, 
                    but a product entity can only belong to one product.
                </span>
            </small>
        </InputControl>

        <Button type="submit">{{ buttonText }}</Button>
    </form>
</template>

<script setup>
import MeteorPaginator from '../../components/UI/MeteorPaginator.vue';
import Button from '../../components/UI/Button.vue';
import InputControl from '../../components/UI/InputControl.vue';
import { ref, onBeforeMount, defineExpose } from 'vue';
import { useProductSDK } from '../../composables/useProductSDK.js';
import { useToast } from '../../composables/useToast.js';

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

const { sdk } = useProductSDK();
const productUUIDRef = ref(null);
const btnDisabled = ref(false);

function setProductEntity(productEntity) {
    productUUIDRef.value.value = productEntity.product_uuid;
}

function reset() {
    productUUIDRef.value.value = '';
}

async function submitProxy() {
    btnDisabled.value = true;

    if (props.validateInput) {
        const toastCtrl = useToast();

        if (!productUUIDRef.value.value) {
            toastCtrl.add('Product UUID is required', 5000, 'error');
            return;
        }
    }

    await props.submit({ product_uuid: productUUIDRef.value.value });

    btnDisabled.value = false;
}

defineExpose({ reset, setProductEntity });
</script>
