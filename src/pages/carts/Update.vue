<template>
    <UpdateTemplate
        name="Carts"
        permissionName="carts"
        path="/carts"
        pkName="client_side_uuid"
        :submit="submit"
        :entity="entity"
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
    </UpdateTemplate>
</template>

<script setup>
import MeteorPaginator from '../../components/UI/MeteorPaginator.vue';
import UpdateTemplate from '../../components/page_templates/UpdateTemplate.vue';
import { useShoppingCart } from '../../composables/useShoppingCart.js';
import { router } from '../../router.js';
import { ref, onBeforeMount } from 'vue';

const ctrl = useShoppingCart();
const findAllStates = ctrl.CartState.findAll;
const clientSideUUID = router.currentRoute.value.params.client_side_uuid;
const entity = ref({});
const cartStateNameRef = ref(null);

function setEntity(newEntity) {
    entity.value = newEntity;
    cartStateNameRef.value.value = newEntity.cart_state_name;
}

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
    const res = await ctrl.Cart.update(clientSideUUID, data);
    setEntity(res)
}

onBeforeMount(async () => {
    const res = await ctrl.Cart.find(clientSideUUID)
    setEntity(res)
})
</script>
