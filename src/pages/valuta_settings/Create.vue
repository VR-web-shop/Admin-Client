<template>
    <CreateTemplate
        name="Valuta Settings"
        permissionName="valuta-settings"
        path="/valuta_settings"
        :submit="submit"
    >
    <input type="text" name="name" placeholder="Name" class="p-3 w-full border border-gray-300 rounded-md" />
    <input type="text" name="short" placeholder="Short" class="p-3 w-full border border-gray-300 rounded-md" />
    <input type="text" name="symbol" placeholder="Symbol" class="p-3 w-full border border-gray-300 rounded-md" />
    <div class="flex items-center justify-start gap-2">
        <label for="active" class="text-sm">Active</label>
        <input type="checkbox" name="active" class="input" />
    </div>
    </CreateTemplate>
</template>
<script setup>
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const submit = (data) => {
    data.active = data.active === 'on' ? true : false;
    useProducts().ValutaSetting.put(data);
}
</script>
