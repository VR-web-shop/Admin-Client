<template>
    <FlexCenter>
        <div class="m-10 p-3 w-full shadow-md bg-white rounded">
            <div class="flex justify-between items-center mb-1">
                <slot name="header" />
            </div>

            <Breadcrumb :links="links" />

            <slot />
        </div>
    </FlexCenter>
</template>

<script setup>
import FlexCenter from './FlexCenter.vue';
import Breadcrumb from './Breadcrumb.vue';
defineProps({
    links: {
        type: Array,
        required: true
    }
});
</script>