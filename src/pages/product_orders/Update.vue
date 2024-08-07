<template>
    <UpdateTemplate
        name="Product Orders"
        permissionName="product-orders"
        path="/product_orders"
        pkName="clientSideUUID"
        :submit="submit"
        :entity="entity"
    >
        <input type="text" placeholder="Name" name="name" ref="nameRef" class="p-3 w-full border border-gray-300 rounded-md" />
        <input type="email" placeholder="Email" name="email" ref="emailRef" class="p-3 w-full border border-gray-300 rounded-md" />
        <input type="text" placeholder="Address" name="address" ref="addressRef" class="p-3 w-full border border-gray-300 rounded-md" />
        <input type="text" placeholder="City" name="city" ref="cityRef" class="p-3 w-full border border-gray-300 rounded-md" />
        <input type="text" placeholder="Country" name="country" ref="countryRef" class="p-3 w-full border border-gray-300 rounded-md" />
        <input type="text" placeholder="Postal Code" name="postal_code" ref="postalCodeRef" class="p-3 w-full border border-gray-300 rounded-md" />
        <MeteorPaginator :findAllMethod="deliverOptionFindAll" :limit="10">
            <template #empty?>
                <div class="text-center text-gray-500">
                    No deliver options found.
                </div>
            </template>

            <template #default="{ entities }">
                <select name="deliver_option_client_side_uuid" ref="deliverOptionUUIDRef"
                    class="border border-gray-300 rounded-md py-1 w-full">
                    <option value="" disabled selected>Select Deliver Option</option>
                    <option v-for="option in entities" :key="option.clientSideUUID" :value="option.clientSideUUID">
                        {{ option.name }} (Price: {{ option.price }})
                    </option>
                </select>
            </template>
        </MeteorPaginator>
        <MeteorPaginator :findAllMethod="paymentOptionFindAll" :limit="10">
            <template #empty?>
                <div class="text-center text-gray-500">
                    No payment options found.
                </div>
            </template>

            <template #default="{ entities }">
                <select name="payment_option_client_side_uuid" ref="paymentOptionUUIDRef"
                    class="border border-gray-300 rounded-md py-1 w-full">
                    <option value="" disabled selected>Select Payment Option</option>
                    <option v-for="option in entities" :key="option.clientSideUUID" :value="option.clientSideUUID">
                        {{ option.name }} (Price: {{ option.price }})
                    </option>
                </select>
            </template>
        </MeteorPaginator>
        <MeteorPaginator :findAllMethod="productOrderStateFindAll" :limit="10">
            <template #empty?>
                <div class="text-center text-gray-500">
                    No states found.
                </div>
            </template>

            <template #default="{ entities }">
                <select name="product_order_state_name" ref="productOrderStateRef"
                    class="border border-gray-300 rounded-md py-1 w-full">
                    <option value="" disabled selected>Select State</option>
                    <option v-for="option in entities" :key="option.name" :value="option.name">
                        {{ option.name }} 
                    </option>
                </select>
            </template>
        </MeteorPaginator>
    </UpdateTemplate>
</template>

<script setup>
import MeteorPaginator from '../../components/UI/MeteorPaginator.vue';
import UpdateTemplate from '../../components/page_templates/UpdateTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
import { router } from '../../router.js';
import { ref, onBeforeMount } from 'vue';

const clientSideUUID = router.currentRoute.value.params.clientSideUUID
const entity = ref({});
const nameRef = ref(null);
const emailRef = ref(null);
const addressRef = ref(null);
const cityRef = ref(null);
const countryRef = ref(null);
const postalCodeRef = ref(null);
const deliverOptionUUIDRef = ref(null);
const paymentOptionUUIDRef = ref(null);
const productOrderStateRef = ref(null);
const ctrl = useProducts();
const deliverOptionFindAll = useProducts().DeliverOption.findAll
const paymentOptionFindAll = useProducts().PaymentOption.findAll
const productOrderStateFindAll = useProducts().ProductOrderState.findAll

function setEntity(newEntity) {
    entity.value = newEntity;
    nameRef.value.value = newEntity.name;
    emailRef.value.value = newEntity.email;
    addressRef.value.value = newEntity.address;
    cityRef.value.value = newEntity.city;
    countryRef.value.value = newEntity.country;
    postalCodeRef.value.value = newEntity.postal_code;
    deliverOptionUUIDRef.value.value = newEntity.deliver_option_client_side_uuid;
    paymentOptionUUIDRef.value.value = newEntity.payment_option_client_side_uuid;
    productOrderStateRef.value.value = newEntity.product_order_state_name;
}

async function submit(data) {
    const res = await ctrl.ProductOrder.put(data);
    setEntity(res)
}

onBeforeMount(async () => {
    const res = await ctrl.ProductOrder.find(clientSideUUID)
    setEntity(res)
})
</script>
