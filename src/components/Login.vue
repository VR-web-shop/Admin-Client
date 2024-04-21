<template>
    <FlexCenter class="h-screen">
        <div v-if="!showIntro" class="bg-white p-3 rounded border border-gray-300 shadow-md">
            <Title>Login</Title>
            <form @submit.prevent="submit">

                <InputControl>
                    <input type="email" placeholder="E-mail" v-model="email" />
                </InputControl>

                <InputControl>
                    <input type="password" placeholder="Password" v-model="password" />
                </InputControl>

                <Button type="submit">Login</Button>
            </form>
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

const emits = defineEmits(['complete']);
const email = ref('userAdmin@example.com');
const password = ref('126345678');
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
