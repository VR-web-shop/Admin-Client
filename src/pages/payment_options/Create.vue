<template>
    <CreateTemplate
        name="Payment Options"
        permissionName="payment-options"
        path="/payment_options"
        :submit="submit"
    >
    <input type="text" name="name" placeholder="Name" class="p-3 w-full border border-gray-300 rounded-md" />
    <input type="number" name="price" placeholder="Price" class="p-3 w-full border border-gray-300 rounded-md" />
    </CreateTemplate>
</template>
<script setup>
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const submit = useProducts().PaymentOption.put
</script>
