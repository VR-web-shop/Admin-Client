<template>
    <Restricted :permissions="['users:index']">
        <Content :links="[
        { name: 'Control Panel', path: '/' },
        { name: 'Users' }
    ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold">
                    Users
                </h1>

                <RestrictedElement :permissions="['users:create']">
                    <router-link 
                        to="/users/create" 
                        class="bg-blue-500 text-white px-3 py-1 rounded-md">Create User</router-link>
                </RestrictedElement>
            </template>

            <Paginator 
                :request="request"
                :findAllMethod="findAllMethod" 
                :entitiesKey="entitiesKey">
                <template v-slot="{ entities }">
                    <table class="w-full border-l border-r border-gray-100">
                        <thead>
                            <tr class="border-b border-t border-gray-100">
                                <th class="text-left p-3">UUID</th>
                                <th class="text-left">Email</th>
                                <th class="text-center">Role</th>
                                <th class="text-center">Created At</th>
                                <th class="text-center">Updated At</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in entities" :key="user.uuid" class="border-b border-gray-100">
                                <td class="p-3">{{ user.uuid }}</td>
                                <td class="text-left">{{ user.email }}</td>
                                <td class="text-center">{{ user.role_name }}</td>
                                <td class="text-center">{{ user.created_at }}</td>
                                <td class="text-center">{{ user.updated_at }}</td>
                                <td class="text-center">
                                    <router-link :to="'/users/' + user.uuid" class="text-blue-500">View</router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </template>
            </Paginator>
        </Content>
    </Restricted>
</template>

<script setup>
import Content from '../../components/UI/Content.vue';
import Paginator from '../../components/UI/Paginator.vue';
import Restricted from '../../components/UI/Restricted.vue';
import RestrictedElement from '../../components/UI/RestrictedElement.vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';
import { router } from '../../router.js';
import { onBeforeMount } from 'vue'

const { sdk } = useAuthSDK()
const request = sdk.requests.UserRequest.AdminFindAllRequest
const findAllMethod = sdk.api.adminUsers.findAll
const entitiesKey = 'users'
</script>
