<template>
    <div class="mb-3 bg-red-500 text-white p-3 rounded-md" v-if="canDelete">
        <h2 class="text-xl font-bold mb-3">
            Danger Zone
        </h2>

        <p class="mb-3">
            <slot name="description" />
        </p>

        <div>
            <div v-if="!isDeletable">
                <slot name="notDeleteable" />
            </div>

            <button v-else 
                @click="deleteEntity" 
                class="bg-white text-red-500 px-3 py-1 rounded-md">{{ buttonText }}</button>
        </div>
    </div>
</template>

<script setup>
import { router } from '../../router.js'
import { usePermission } from '../../composables/usePermission.js';
import { ref } from 'vue'

const props = defineProps({
    foreignKeyName: {
        type: String,
        required: true
    },
    foreignKeyValue: {
        type: String,
        required: true
    },
    request: {
        type: Function,
        required: true
    },
    destroyMethod: {
        type: Function,
        required: true
    },
    isDeletable: {
        type: Boolean,
        required: true
    },
    permission: {
        type: String,
        required: true
    },
    buttonText: {
        type: String,
        required: true
    },
    navigateOnDelete: {
        type: String,
        required: false
    }
})
const canDelete = ref(usePermission(props.permission))

async function deleteEntity() {
    if (!canDelete.value) return
    if (!props.isDeletable) return

    const body = {
        [props.foreignKeyName]: props.foreignKeyValue
    }

    const req = new props.request(body)
    await props.destroyMethod(req)
    
    if (props.navigateOnDelete) {
        router.push(props.navigateOnDelete)
    }
}
</script>
