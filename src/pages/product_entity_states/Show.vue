<template>
    <Restricted :permissions="['product-entity-states:show']">
        <div v-if="!productEntityState">
            Loading...
        </div>

        <Content v-else :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Product Entity States', path: '/product_entity_states' },
            { name: productEntityState.name }
        ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    {{ productEntityState.name }}
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
const productEntityState = ref(null)

onBeforeMount(async () => {
    const name = router.currentRoute.value.params.name
    const req = new sdk.requests.ProductEntityStateRequest.FindRequest({ name })
    const res = await sdk.api.productEntityStates.find(req)
    productEntityState.value = res
})
</script>
