<template>
    <Restricted :permissions="['users:update']">
        <Content :links="[
        { name: 'Control Panel', path: '/' },
        { name: 'Products', path: '/products' },
        { name: product?.uuid, path: '/products/' + product?.uuid },
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
                    :nameInitialValue="product?.name"
                    :descriptionInitialValue="product?.description"
                    :submit="submit" 
                    :validateInput="false" 
                />
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
const product = ref(null)
const uuid = router.currentRoute.value.params.uuid

const { sdk } = useProductSDK();
const { api, requests } = sdk
const { products } = api
const { ProductRequest } = requests

async function fetchProduct() {
    const req = new ProductRequest.FindRequest({ uuid })
    const res = await products.find(req)
    product.value = res
    formRef.value.setProduct(res)
}

async function submit(data) {
    const req = new ProductRequest.UpdateRequest({ uuid, ...data });
    await products.update(req);
    const toastCtrl = useToast();
    toastCtrl.add('Product updated', 5000, 'success');

    formRef.value.reset();
    await fetchProduct()
}

onBeforeMount(async () => {
    await fetchProduct()
})
</script>
