<template>
    <Restricted :permissions="[`${permissionName}:put`, `${permissionName}:create`]">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name, path },
            { name: 'Create' }
        ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    Create {{ name }}
                </h1>
            </template>

            <p class="mb-3">
                Use the form below to create a new {{ name }}.
            </p>

            <form ref="formRef" @submit.prevent="submit">
                <div class="flex flex-col gap-3">

                    <slot></slot>
                    <button type="submit" class="bg-blue-500 text-white px-3 py-1 rounded-md">Create {{ name }}</button>
                </div>
            </form>
        </Content>
    </Restricted>
</template>

<script setup>
import Content from '../UI/Content.vue';
import Restricted from '../UI/Restricted.vue';
import { useToast } from '../../composables/useToast.js';
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    permissionName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    submit: {
        type: Function,
        required: true
    }
});

const toastCtrl = useToast();
const formRef = ref(null);

async function submit() {
    const formData = new FormData(formRef.value);
    const data = Object.fromEntries(formData.entries());
    
    for (const key in data) {
        if (data[key] === '') {
            toastCtrl.add(`${key} is required`, 5000, 'error');
            return;
        }
    }

    await props.submit({ ...data, clientSideUUID: uuidv4() });
    toastCtrl.add(`${props.name} created`, 5000, 'success');
    formRef.value.reset();
}
</script>
