<template>
    <UpdateTemplate
        name="Valuta Settings"
        permissionName="valuta-settings"
        path="/valuta_settings"
        pkName="clientSideUUID"
        :submit="submit"
        :entity="entity"
    >
    <input type="text" name="name" placeholder="Name" class="p-3 w-full border border-gray-300 rounded-md" ref="nameRef" />
    <input type="text" name="short" placeholder="Short" class="p-3 w-full border border-gray-300 rounded-md" ref="shortRef" />
    <input type="text" name="symbol" placeholder="Symbol" class="p-3 w-full border border-gray-300 rounded-md" ref="symbolRef" />
    <div class="flex items-center justify-start gap-2">
        <label for="active" class="text-sm">Active</label>
        <input type="checkbox" name="active" class="input" ref="activeRef" />
    </div>
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
const shortRef = ref(null);
const symbolRef = ref(null);
const activeRef = ref(null);
const ctrl = useProducts();

function setEntity(newEntity) {
    entity.value = newEntity;
    nameRef.value.value = newEntity.name;
    shortRef.value.value = newEntity.short;
    symbolRef.value.value = newEntity.symbol;
    activeRef.value.checked = newEntity.active;
}

async function submit(data) {
    data.active = data.active === 'on' ? true : false;
    const res = await ctrl.ValutaSetting.put(data);
    setEntity(res)
}

onBeforeMount(async () => {
    const res = await ctrl.ValutaSetting.find(clientSideUUID)
    setEntity(res)
})
</script>
