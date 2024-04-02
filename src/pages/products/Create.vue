<template>
    <Restricted :permissions="['products:create']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Products', path: '/products' },
            { name: 'Create' }
        ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    Create Product
                </h1>
            </template>

            <p class="mb-3">
                Use the form below to create a new product.
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

const formRef = ref(null);

async function submit(formData) {
    const { sdk } = useProductSDK();
    await sdk.api.ProductController.create(formData);
    const toastCtrl = useToast();
    toastCtrl.add('Product created', 5000, 'success');
    formRef.value.reset();
}
</script>
