<template>
    <CreateTemplate
        name="Carts"
        permissionName="carts"
        path="/carts"
        :submit="submit"
    >
    <MeteorPaginator :findAllMethod="findAllStates" :limit="10">

        <template #empty?>
            <div class="text-center text-gray-500">
                No cart states found.
            </div>
        </template>

        <template #default="{ entities }">
            <select name="cart_state_name" ref="cartStateNameRef"
                class="border border-gray-300 rounded-md py-1 w-full">
                <option value="" disabled selected>Select State</option>
                <option v-for="state in entities" :key="state.name" :value="state.name">
                    {{ state.name }}
                </option>
            </select>
        </template>
    </MeteorPaginator>
    </CreateTemplate>
</template>
<script setup>
import MeteorPaginator from '../../components/UI/MeteorPaginator.vue';
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useShoppingCart } from '../../composables/useShoppingCart.js';
const findAllStates = useShoppingCart().CartState.findAll
async function submit(data) {
    data = {
        ...data,
        product_order: {
            name: 'test',
            email: 'test@test.test',
            address: 'test',
            postal_code: 'test',
            city: 'test',
            country: 'test',
            payment_option_client_side_uuid: 'aaa-bbb-ccc',
            deliver_option_client_side_uuid: 'aaa-bbb-ccc',
        }
    }
    await useShoppingCart().Cart.create(data);
}
</script>
