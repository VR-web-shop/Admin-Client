<template>
    <Restricted :permissions="['users:update']">
        <Content :links="[
        { name: 'Control Panel', path: '/' },
        { name: 'Product Entities', path: '/product_entities' },
        { name: productEntity?.uuid, path: '/product_entities/' + productEntity?.uuid },
        { name: 'Update' }
    ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    Update Product Entity
                </h1>
            </template>

            <p class="mb-3">
                Use the form below to update an existing product entity.
            </p>

            <div>
                <Form 
                    ref="formRef" 
                    buttonText="Update" 
                    :productUUIDInitialValue="productEntity?.product_uuid"
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
const productEntity = ref(null)
const uuid = router.currentRoute.value.params.uuid

const { sdk } = useProductSDK();
const { api, requests } = sdk
const { productEntities } = api
const { ProductEntityRequest } = requests

async function fetchProductEntity() {
    const req = new ProductEntityRequest.FindRequest({ uuid })
    const res = await productEntities.find(req)
    productEntity.value = res
    formRef.value.setProductEntity(res)
}

async function submit(data) {
    const req = new ProductEntityRequest.UpdateRequest({ uuid, ...data });
    await productEntities.update(req);
    const toastCtrl = useToast();
    toastCtrl.add('Product Entity updated', 5000, 'success');

    formRef.value.reset();
    await fetchProductEntity()
}

onBeforeMount(async () => {
    await fetchProductEntity()
})
</script>
