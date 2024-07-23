<template>
    <CreateTemplate 
        name="Products" 
        permissionName="products" 
        path="/products"
        :provideFormData="true"
        :submit="submit"
    >
        <input type="text" placeholder="Name" name="name" ref="nameRef" class="p-3 w-full border border-gray-300 rounded-md" />
        <input type="text" placeholder="Description" name="description" ref="descRef" class="p-3 w-full border border-gray-300 rounded-md" />
        <input type="number" placeholder="Price" name="price" ref="priceRef" class="p-3 w-full border border-gray-300 rounded-md" />
        <input type="file" placeholder="File" name="file" ref="fileRef" class="p-3 w-full border border-gray-300 rounded-md" />
    </CreateTemplate>
</template>
<script setup>
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const submit = async (data) => {
    const ctrl = useProducts();
    const version = new Date().getTime();
    data.thumbnail_source = await ctrl.Product.upload(data.file, data.clientSideUUID, version);
    delete data.file;
    await ctrl.Product.put(data)
}
</script>
