<template>
    <Restricted :permissions="[`${permissionName}:put`]">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name, path },
            { name: pk, path: `${path}/${pk}` },
            { name: 'Update' }
        ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    Update {{ name }}
                </h1>
            </template>

            <p class="mb-3">
                Use the form below to update an existing {{ name }}.
            </p>

            <form ref="formRef" @submit.prevent="submit">
                <div class="flex flex-col gap-3">

                    <slot></slot>

                    <button type="submit" class="bg-blue-500 text-white px-3 py-1 rounded-md">Update {{ name }}</button>
                </div>
            </form>
        </Content>
    </Restricted>
</template>

<script setup>
import Content from '../UI/Content.vue';
import Restricted from '../UI/Restricted.vue';
import { router } from '../../router.js';
import { useToast } from '../../composables/useToast.js';
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
    },
    pkName: {
        type: String,
        required: true
    },
    entity: {
        type: Object,
        required: true
    }
});

const pk = router.currentRoute.value.params[props.pkName];
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
    
    const keys = Object.keys(props.entity).filter(k => {
        if (typeof props.entity[k] === 'boolean')
            return true;
        return data[k];
    })
    const inputString = keys.map(k => {
        let val = data[k];
        if (typeof props.entity[k] === 'boolean') {
            val = val === 'on' ? true : false;
        }
        return `${k}: ${val}`;
    }).join(', ');
    const currentString = keys.map(k => `${k}: ${props.entity[k]}`).join(', ');
    if (inputString === currentString) {
        toastCtrl.add('No changes detected', 5000, 'warning');
        return;
    }
    
    await props.submit({ [props.pkName]: pk, ...data });
    toastCtrl.add(`${props.name} updated`, 5000, 'success');
}
</script>
