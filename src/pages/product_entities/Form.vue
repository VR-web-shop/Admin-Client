<template>
    <form @submit.prevent="submitProxy">

        <InputControl>
            <Paginator
                :request="sdk.requests.ProductRequest.FindAllRequest"
                :findAllMethod="sdk.api.products.findAll"
                :entitiesKey="'products'">
                <template v-slot="{ entities }">
                    <select v-model="product_uuid" id="product_uuid" class="border border-gray-300 rounded-md py-1 w-full">
                        <option value="" disabled selected>Select Product</option>
                        <option v-for="product in entities" :key="product.uuid" :value="product.uuid">
                            [{{ product.uuid }}] - {{ product.name }} - {{ product.description }}
                        </option>
                    </select>
                </template>
            </Paginator>

            <small>
                <span v-if="existingProductEntity">
                    The current product is: <strong>{{ productUUIDInitialValue }}</strong>; <br/> Leave blank to keep the same.  
                </span>
                <span v-else>
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
import Paginator from '../../components/UI/Paginator.vue';
import Button from '../../components/UI/Button.vue';
import InputControl from '../../components/UI/InputControl.vue';
import { ref, onBeforeMount, defineExpose } from 'vue';
import { useProductSDK } from '../../composables/useProductSDK.js';
import { useToast } from '../../composables/useToast.js';

const props = defineProps({
    productUUIDInitialValue: {
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
const existingProductEntity = ref(false);
const product_uuid = ref('');

function setProductEntity(productEntity) {
    existingProductEntity.value = true;
    product_uuid.value = productEntity.product_uuid;
}

function reset() {
    product_uuid.value = '';
}

async function submitProxy() {
    if (props.validateInput) {
        const toastCtrl = useToast();

        if (!product_uuid.value) {
            toastCtrl.add('Product UUID is required', 5000, 'error');
            return;
        }
    }

    const parameters = {}
    if (product_uuid.value) parameters.product_uuid = product_uuid.value;

    await props.submit(parameters);
}

defineExpose({ reset, setProductEntity });
</script>
