<template>
    <CreateTemplate
        name="Deliver Options"
        permissionName="deliver-options"
        path="/deliver_options"
        :submit="submit"
    >
    <input type="text" name="name" placeholder="Name" class="input" />
    <input type="number" name="price" placeholder="Price" class="input" />
    </CreateTemplate>
</template>
<script setup>
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const submit = useProducts().DeliverOption.put
</script>
