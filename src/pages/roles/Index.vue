<template>
    <Restricted :permissions="['roles:index']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Roles' }
        ]">

            <template v-slot:header>
                <h1 class="text-xl font-bold mb-3">
                    Roles
                </h1>

                <RestrictedElement :permissions="['roles:create']">
                    <router-link 
                        to="/roles/create" 
                        class="bg-blue-500 text-white px-3 py-1 rounded-md">Create Role</router-link>
                </RestrictedElement>
            </template>
            
            <Paginator 
                :request="sdk.requests.RoleRequest.AdminFindAllRequest" 
                :findAllMethod="sdk.api.adminRoles.findAll"
                :entitiesKey="'roles'">
                <template v-slot="{ entities }">
                    <table class="w-full border-l border-r border-gray-100">
                        <thead>
                            <tr class="border-b border-t border-gray-100">
                                <th class="text-left p-3">Name</th>
                                <th class="text-left">Description</th>
                                <th class="text-center">Is User Defined</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="role in entities" :key="role.name" class="border-b border-gray-100">
                                <td class="p-3">{{ role.name }}</td>
                                <td class="text-left">{{ role.description }}</td>
                                <td class="text-center">{{ role.is_user_defined }}</td>
                                <td class="text-center">
                                    <router-link :to="'/roles/' + role.name" class="text-blue-500">View</router-link>
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

const { sdk } = useAuthSDK()
</script>
