<template>
    <FlexCenter class="h-screen">
        <div v-if="!showIntro" class="bg-white p-6 rounded border border-gray-300 shadow-md">
            <h1 class="text-center text-3xl mb-1">Admin Client</h1>
            <p class="text-center text-sm mb-6">
                Please enter your credentials to login.
            </p>
            <form @submit.prevent="submit" class="mb-6">

                <InputControl>
                    <label for="email" class="block mb-1">E-mail</label>
                    <input type="email" placeholder="E-mail" v-model="email" class="p-3 w-full border border-gray-300 rounded-md" />
                </InputControl>

                <InputControl>
                    <label for="password" class="block mb-1">Password</label>
                    <input type="password" placeholder="Password" v-model="password" class="p-3 w-full border border-gray-300 rounded-md" />
                </InputControl>

                <Button type="submit" class="w-full">Login</Button>
            </form>

            <div class="text-center mt-4 flex flex-col gap-3">
                <a :href="scenesVrClientURL" target="_blank" class="text-blue-500">Customer Website</a>
                <a :href="scenesEditorClientURL" target="_blank" class="text-blue-500">3D Scene Editor</a>
            </div>
        </div>

        <Transition name="fade-in">
            <div v-if="showIntro" class="w-45">
                <Title class="uppercase">
                    <div>Welcome back</div>
                </Title>

                <p class="uppercase text-xs">Message of the day:</p>
                <p class="italic">{{ introMsg }}</p>
            </div>
        </Transition>
    </FlexCenter>
</template>

<script setup>
import Button from './UI/Button.vue';
import Title from './UI/Title.vue';
import InputControl from './UI/InputControl.vue';
import FlexCenter from './UI/FlexCenter.vue';

import { ref, defineEmits } from 'vue';
import { useToast } from '../composables/useToast.js';
import { useAuthSDK } from '../composables/useAuthSDK.js';

const scenesVrClientURL = import.meta.env.VITE_SCENES_VR_CLIENT_URL;
const scenesEditorClientURL = import.meta.env.VITE_SCENES_EDITOR_CLIENT_URL;

const emits = defineEmits(['complete']);
const email = ref('');
const password = ref('');
const showIntro = ref(null);
const introMsg = ref('')
const introShowTime = 6000;

const { add } = useToast();
const { sdk } = useAuthSDK();

async function submit() {
    if (!email.value) {
        add('Email is required', 5000, 'error');
        return;
    }

    if (!password.value) {
        add('Password is required', 5000, 'error');
        return;
    }

    try {
        await sdk.api.authentication.login({
            email: email.value,
            password: password.value,
        })
        introMsg.value = await msgOfTheDay();
        showIntro.value = true;
        setTimeout(() => {
            emits('complete')
        }, introShowTime);
    } catch (e) {
        add('Invalid credentials', 5000, 'error');
        return;
    }
}

async function msgOfTheDay() {
    return "Hello world!";
}

</script>

<style>

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.fade-in-enter-active {
    animation: fadeIn 2.5s;
}

.fade-in-leave-active {
    animation: fadeIn 0.5s reverse;
}


</style>
