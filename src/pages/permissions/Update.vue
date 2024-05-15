<template>
    <UpdateTemplate
        name="Permissions"
        permissionName="permissions"
        path="/permissions"
        pkName="name"
        :submit="submit"
        :entity="entity"
    >
        <input type="text" name="name" placeholder="Name" ref="nameRef" class="input" />
        <input type="text" name="description" placeholder="Description" ref="descriptionRef" class="input" />
    </UpdateTemplate>
</template>

<script setup>
import UpdateTemplate from '../../components/page_templates/UpdateTemplate.vue';
import { router } from '../../router.js';
import { ref, onBeforeMount } from 'vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';

const sdk = useAuthSDK().sdk
const name = router.currentRoute.value.params.name
const entity = ref({});
const nameRef = ref(null);
const descriptionRef = ref(null);

function setEntity(newEntity) {
    entity.value = newEntity;
    nameRef.value.value = newEntity.name;
    descriptionRef.value.value = newEntity.description;
}

async function submit(data) {
    const res = await sdk.api.adminPermissions.update(name, data);
    setEntity(res)
}

onBeforeMount(async () => {
    const res = await sdk.api.adminPermissions.find(name)
    setEntity(res)
})
</script>
