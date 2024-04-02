<template>
    <Restricted :permissions="['users:update']">
        <Content :links="[
        { name: 'Control Panel', path: '/' },
        { name: 'Product Entities', path: '/product_entities' },
        { name: uuid, path: '/product_entities/' + uuid },
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
const toastCtrl = useToast();
const uuid = router.currentRoute.value.params.uuid
const { sdk } = useProductSDK();

async function fetchProductEntity() {
    const res = await sdk.api.ProductEntityController.find({ uuid })
    formRef.value.setProductEntity(res)
}

async function submit(data) {
    const res = await sdk.api.ProductEntityController.update({ uuid, ...data });
    toastCtrl.add('Product Entity updated', 5000, 'success');
    formRef.value.setProductEntity(res)
}

onBeforeMount(async () => {
    await fetchProductEntity()
})
</script>
