<template>
    <CreateTemplate
        name="Payment Options"
        permissionName="payment-options"
        path="/payment_options"
        :submit="submit"
    >
    <input type="text" name="name" placeholder="Name" class="input" />
    <input type="number" name="price" placeholder="Price" class="input" />
    </CreateTemplate>
</template>
<script setup>
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const submit = useProducts().PaymentOption.put
</script>
