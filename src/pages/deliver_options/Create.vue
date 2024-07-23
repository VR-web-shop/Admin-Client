<template>
    <CreateTemplate
        name="Deliver Options"
        permissionName="deliver-options"
        path="/deliver_options"
        :submit="submit"
    >
    <input type="text" name="name" placeholder="Name" class="p-3 w-full border border-gray-300 rounded-md" />
    <input type="number" name="price" placeholder="Price" class="p-3 w-full border border-gray-300 rounded-md" />
    </CreateTemplate>
</template>
<script setup>
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const submit = useProducts().DeliverOption.put
</script>
