<template>
    <Restricted :permissions="['product-order-states:show']">
        <div v-if="!productOrderState">
            Loading...
        </div>

        <Content v-else :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Product Order States', path: '/product_order_states' },
            { name: productOrderState.name }
        ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    {{ productOrderState.name }}
                </h1>
            </template>

        </Content>
    </Restricted>    
</template>

<script setup>
import Restricted from '../../components/UI/Restricted.vue';
import Content from '../../components/UI/Content.vue';
import { router } from '../../router.js';
import { useProductSDK } from '../../composables/useProductSDK.js';
import { ref, onBeforeMount } from 'vue'

const { sdk } = useProductSDK()
const productOrderState = ref(null)

onBeforeMount(async () => {
    const name = router.currentRoute.value.params.name
    const res = await sdk.api.ProductOrderStateController.find({ name })
    productOrderState.value = res
})
</script>
