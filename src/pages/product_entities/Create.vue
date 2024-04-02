<template>
    <Restricted :permissions="['product-entities:create']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Product Entities', path: '/product_entities' },
            { name: 'Create' }
        ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    Create Product Entity
                </h1>
            </template>

            <p class="mb-3">
                Use the form below to create a new product entity for a product.
                In other words, let the system know about a physical entity of a product.
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
import { useProductSDK } from '../../composables/useProductSDK.js';
import { useToast } from '../../composables/useToast.js';

const toastCtrl = useToast();
const formRef = ref(null);

async function submit(data) {
    const { sdk } = useProductSDK();
    await sdk.api.ProductEntityController.create({...data, product_entity_state_name: 'AVAILABLE_FOR_PURCHASE'});
    toastCtrl.add('Product Entity created', 5000, 'success');
    formRef.value.reset();
}
</script>
