<template>
    <UpdateTemplate
        name="Products"
        permissionName="products"
        path="/products"
        pkName="clientSideUUID"
        :submit="submit"
        :entity="entity"
    >
        <input type="text" placeholder="Name" name="name" ref="nameRef" class="w-full" />
        <input type="text" placeholder="Description" name="description" ref="descRef" class="w-full" />
        <input type="number" placeholder="Price" name="price" ref="priceRef" class="w-full" />
        <input type="file" placeholder="File" name="file" ref="fileRef" class="w-full" />
    </UpdateTemplate>
</template>

<script setup>
import UpdateTemplate from '../../components/page_templates/UpdateTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
import { router } from '../../router.js';
import { ref, onBeforeMount } from 'vue';

const clientSideUUID = router.currentRoute.value.params.clientSideUUID
const entity = ref({});
const nameRef = ref(null);
const descRef = ref(null);
const priceRef = ref(null);
const fileRef = ref(null);
const ctrl = useProducts();

function setEntity(newEntity) {
    entity.value = newEntity;
    nameRef.value.value = newEntity.name;
    descRef.value.value = newEntity.description;
    priceRef.value.value = newEntity.price;
}

async function submit(data) {
    if (data.file.size > 0) {
        const version = new Date().getTime();
        const oldURL = entity.value.thumbnail_source
        const clientSideUUID = entity.value.clientSideUUID
        data.thumbnail_source = await ctrl.Product.upload(data.file, clientSideUUID, version, oldURL);
        delete data.file;
    } else {
        data.thumbnail_source = entity.value.thumbnail_source
    }

    const res = await ctrl.Product.put(data)
    setEntity(res)
}

onBeforeMount(async () => {
    const res = await ctrl.Product.find(clientSideUUID)
    setEntity(res)
})
</script>
