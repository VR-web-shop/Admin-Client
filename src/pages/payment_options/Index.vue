<template>
    <Restricted :permissions="['payment-options:index']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Payment Options' }
        ]">

            <template v-slot:header>
                <h1 class="text-xl font-bold mb-3">
                    Payment Options
                </h1>
            </template>
            
            <MeteorPaginator 
                :findAllMethod="sdk.api.PaymentOptionController.findAll"
                :limit="10">
                <template #empty?>
                    <div class="text-center text-gray-500">
                        No payment options found.
                    </div>
                </template>

                <template #default="{ entities }">
                    <table class="w-full border-l border-r border-gray-100">
                        <thead>
                            <tr class="border-b border-t border-gray-100">
                                <th class="text-left p-3">Name</th>
                                <th class="text-center">Price</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="payment_option in entities" :key="payment_option.name" class="border-b border-gray-100">
                                <td class="text-left p-3">{{ payment_option.name }}</td>
                                <td class="text-center p-3">{{ payment_option.price }}</td>
                                <td class="text-center">
                                    <RestrictedElement :permissions="['deliver-options:show']">
                                        <router-link :to="'/payment_options/' + payment_option.name" class="text-blue-500">View</router-link>
                                    </RestrictedElement>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </template>
            </MeteorPaginator>
        </Content>
    </Restricted>
</template>
<script setup>
import Content from '../../components/UI/Content.vue';
import MeteorPaginator from '../../components/UI/MeteorPaginator.vue';
import Restricted from '../../components/UI/Restricted.vue';
import RestrictedElement from '../../components/UI/RestrictedElement.vue';
import { useProductSDK } from '../../composables/useProductSDK.js';

const { sdk } = useProductSDK()
</script>
