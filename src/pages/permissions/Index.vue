<template>
    <Restricted :permissions="['permissions:index']">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name: 'Permissions' }
        ]">
            <template v-slot:header>
                <h1 class="text-xl font-bold mb-3">
                    Permissions
                </h1>

                <RestrictedElement :permissions="['permissions:create']">
                    <router-link 
                        to="/permissions/create" 
                        class="bg-blue-500 text-white px-3 py-1 rounded-md">Create Permission</router-link>
                </RestrictedElement>
            </template>

            <Paginator 
                :request="sdk.requests.PermissionRequest.FindAllRequest"
                :findAllMethod="sdk.api.adminPermissions.findAll" 
                :entitiesKey="'permissions'">
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
                            <tr v-for="permission in entities" :key="permission.name" class="border-b border-gray-100">
                                <td class="p-3">{{ permission.name }}</td>
                                <td class="text-left">{{ permission.description }}</td>
                                <td class="text-center">{{ permission.is_user_defined }}</td>
                                <td class="text-center">
                                    <RestrictedElement :permissions="['permissions:show']">
                                        <router-link 
                                            :to="'/permissions/' + permission.name"
                                            class="text-blue-500">View</router-link>
                                    </RestrictedElement>
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
import Restricted from '../../components/UI/Restricted.vue';
import RestrictedElement from '../../components/UI/RestrictedElement.vue';
import Paginator from '../../components/UI/Paginator.vue';
import Content from '../../components/UI/Content.vue';
import { useAuthSDK } from '../../composables/useAuthSDK.js';

const { sdk } = useAuthSDK()
</script>