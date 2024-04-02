<template>
    <Restricted :permissions="['users:update']">
        <Content :links="[
        { name: 'Control Panel', path: '/' },
        { name: 'Products', path: '/products' },
        { name: uuid, path: '/products/' + uuid },
        { name: 'Update' }
    ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    Update Product
                </h1>
            </template>

            <p class="mb-3">
                Use the form below to update an existing product.
            </p>

            <div>
                <Form 
                    ref="formRef" 
                    buttonText="Update"
                    :submit="submit" 
                    :validateInput="false" 
                >
                    <input type="hidden" :value="uuid" name="uuid" />
                </Form>
            </div>
        </Content>
    </Restricted>
</template>

<script setup>
import Form from './Form.vue';
import Restricted from '../../components/UI/Restricted.vue';
import Content from '../../components/UI/Content.vue';
import { ref, onBeforeMount } from 'vue';
import { useProductSDK } from '../../composables/useProductSDK.js';
import { useToast } from '../../composables/useToast.js';
import { router } from '../../router.js';

const formRef = ref();
const uuid = router.currentRoute.value.params.uuid
const toastCtrl = useToast();
const { sdk } = useProductSDK();

async function fetchProduct() {
    const res = await sdk.api.ProductController.find({ uuid })
    formRef.value.setProduct(res)
}

async function submit(formData) {
    const res = await sdk.api.ProductController.update(formData);
    formRef.value.setProduct(res)
    toastCtrl.add('Product updated', 5000, 'success');
}

onBeforeMount(async () => await fetchProduct())
</script>
