<template>
    <UpdateTemplate
        name="Deliver Options"
        permissionName="deliver-options"
        path="/deliver_options"
        pkName="clientSideUUID"
        :submit="submit"
        :entity="entity"
    >
        <input type="text" name="name" ref="nameRef" placeholder="Name" class="p-3 w-full border border-gray-300 rounded-md" />
        <input type="number" name="price" ref="priceRef" placeholder="Price" class="p-3 w-full border border-gray-300 rounded-md" />
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
const priceRef = ref(null);
const ctrl = useProducts();

function setEntity(newEntity) {
    entity.value = newEntity;
    nameRef.value.value = newEntity.name;
    priceRef.value.value = newEntity.price;
}

async function submit(data) {
    data.price = parseFloat(data.price);
    const res = await ctrl.DeliverOption.put(data);
    setEntity(res)
}

onBeforeMount(async () => {
    const res = await ctrl.DeliverOption.find(clientSideUUID)
    setEntity(res)
})
</script>
