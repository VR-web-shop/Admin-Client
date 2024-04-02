<template>
    <Restricted :permissions="['payment-options:show']">
        <div v-if="!paymentOption">
            Loading...
        </div>

        <Content v-else :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Payment Options', path: '/payment_options' },
            { name: paymentOption.name }
        ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    {{ paymentOption.name }}
                </h1>
            </template>

            <div class="bg-gray-500 text-white rounded-md p-3 mb-3">
                <h2 class="text-xl font-bold mb-3">
                    Information
                </h2>
                <div class="flex items-center justify-start gap-3">
                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Price</label>
                        <div class="capitalize">{{ paymentOption.price }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Created at</label>
                        <div class="capitalize">{{ paymentOption.created_at }}</div>
                    </div>

                    <div class="border border-gray-300 p-3 rounded-md shadow-md">
                        <label class="block text-sm font-bold mb-1">Updated at</label>
                        <div class="capitalize">{{ paymentOption.updated_at }}</div>
                    </div>
                </div>
            </div>

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
const paymentOption = ref(null)

onBeforeMount(async () => {
    const name = router.currentRoute.value.params.name
    const res = await sdk.api.PaymentOptionController.find({ name })
    paymentOption.value = res
})
</script>
