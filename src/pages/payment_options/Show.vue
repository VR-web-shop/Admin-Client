<template>
    <ShowTemplate
        name="Payment Options"
        permissionName="payment-options"
        path="/payment_options"
        pkName="clientSideUUID"
        :canEdit="true"
        :canDelete="true"
        :keys="['clientSideUUID', 'name', 'price', 'created_at', 'updated_at']"
        :find="find"
        :remove="remove"
    />  
</template>
<script setup>
import ShowTemplate from '../../components/page_templates/ShowTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const find = useProducts().PaymentOption.find
const remove = useProducts().PaymentOption.remove
</script>
