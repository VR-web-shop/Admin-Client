<template>
    <div class="mb-3 text-sm flex items-center justify-start gap-1">

        <div v-for="link in links" :key="link">
            <button 
                v-if="link.path"
                class="text-blue-500 hover:underline" 
                @click="router.push(link.path)">{{ link.name }}</button>

            <span v-else class="font-bold">{{ link.name }}</span>
            
            <span v-if="!isLast(link)" class="ml-1">></span>
        </div>
    </div>
</template>

<script setup>
import { router } from '../../router.js'
const props = defineProps({
    links: {
        type: Array,
        required: true
    }
})

const isLast = (link) => {
    return link === props.links[props.links.length - 1]
}
</script>