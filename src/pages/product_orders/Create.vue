<template>
    <CreateTemplate 
        name="Product Orders" 
        permissionName="product-orders"
        path="/product_orders"
        :submit="submit"
    >
        <input type="text" placeholder="Name" name="name" ref="nameRef" class="w-full" />
        <input type="email" placeholder="Email" name="email" ref="emailRef" class="w-full" />
        <input type="text" placeholder="Address" name="address" ref="addressRef" class="w-full" />
        <input type="text" placeholder="City" name="city" ref="cityRef" class="w-full" />
        <input type="text" placeholder="Country" name="country" ref="countryRef" class="w-full" />
        <input type="text" placeholder="Postal Code" name="postal_code" ref="postalCodeRef" class="w-full" />
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
    </CreateTemplate>
</template>
<script setup>
import MeteorPaginator from '../../components/UI/MeteorPaginator.vue';
import CreateTemplate from '../../components/page_templates/CreateTemplate.vue';
import { useProducts } from '../../composables/useProducts.js';
const deliverOptionFindAll = useProducts().DeliverOption.findAll
const paymentOptionFindAll = useProducts().PaymentOption.findAll
const productOrderStateFindAll = useProducts().ProductOrderState.findAll
const submit = useProducts().ProductOrder.put
</script>
