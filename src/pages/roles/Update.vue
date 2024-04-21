<template>
    <UpdateTemplate
        name="Roles"
        permissionName="roles"
        path="/roles"
        pkName="client_side_uuid"
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
const client_side_uuid = router.currentRoute.value.params.client_side_uuid
const entity = ref({});
const nameRef = ref(null);
const descriptionRef = ref(null);

function setEntity(newEntity) {
    entity.value = newEntity;
    nameRef.value.value = newEntity.name;
    descriptionRef.value.value = newEntity.description;
}

async function submit(data) {
    const res = await sdk.api.adminRoles.update(data);
    setEntity(res)
}

onBeforeMount(async () => {
    const res = await sdk.api.adminRoles.find({client_side_uuid})
    setEntity(res)
})
</script>
