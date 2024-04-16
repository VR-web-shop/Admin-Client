<template>
    <Restricted :permissions="[`${permissionName}:show`]">
        <div v-if="!entity">
            Loading...
        </div>

        <Content v-else :links="[
            { name: 'Control Panel', path: '/' },
            { name, path },
            { name: pk }
        ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    {{ pk }}
                </h1>

                <div v-if="canEdit || canDelete" class="flex items-center gap-3">
                    <RestrictedElement v-if="canEdit" :permissions="[`${permissionName}:put`]">
                        <router-link :to="`${path}/${pk}/edit`"
                            class="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 block">
                            Edit
                        </router-link>
                    </RestrictedElement>

                    <RestrictedElement v-if="canDelete" :permissions="[`${permissionName}:delete`]">
                        <button 
                            @click="removeAndRoute" 
                            class="text-white bg-red-500 px-2 py-1 rounded-md hover:bg-red-600">
                            Delete
                        </button>
                    </RestrictedElement>
                </div>
            </template>

            <div class="border-t border-gray-300 w-full pt-3">
                <h2 class="text-xl font-bold mb-3">
                    Information
                </h2>

                <div class="flex flex-col items-start justify-start gap-3">
                    <div class="w-full bg-gray-100 p-3 rounded-md" v-for="key in keys" :key="entity[key]">
                        <label class="block text-xs font-bold mb-1 uppercase">
                            {{ key.replace(/_/, ' ') }}
                        </label>
                        <div class="capitalize text-md">
                            {{ entity[key] }}
                        </div>
                    </div>
                </div>
            </div>

        </Content>
    </Restricted>    
</template>

<script setup>
import Restricted from '../UI/Restricted.vue';
import RestrictedElement from '../UI/RestrictedElement.vue';
import Content from '../UI/Content.vue';
import { router } from '../../router.js';
import { ref, onBeforeMount } from 'vue'

const props = defineProps({
    pkName: {
        type: String,
        required: true
    },
    find: {
        type: Function,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    permissionName: {
        type: String,
        required: true
    },
    keys: {
        type: Array,
        required: true
    },
    canEdit: {
        type: Boolean,
        required: false,
        default: false
    },
    canDelete: {
        type: Boolean,
        required: false,
        default: false
    },
    remove: {
        type: Function,
        required: false
    }
})

const entity = ref(null)
const pk = router.currentRoute.value.params[props.pkName]
const removeAndRoute = async () => {
    await props.remove(pk)
    router.push(props.path)
}

onBeforeMount(async () => entity.value = await props.find(pk))
</script>
