<template>
    <Restricted :permissions="[`${permissionName}:index`]">
        <Content :links="[
            { name: 'Control Panel', path: '/' },
            { name }
        ]">

            <template v-slot:header>
                <h1 class="text-xl font-bold mb-3">
                    {{ name }}
                </h1>

                <RestrictedElement v-if="canCreate" :permissions="[`${permissionName}:put`, `${permissionName}:create`]">
                    <router-link 
                        :to="`${path}/create`"
                        class="bg-blue-500 text-white px-3 py-1 rounded-md block hover:bg-blue-600">
                        Create {{ name }}
                    </router-link>
                </RestrictedElement>
            </template>
            
            <MeteorPaginator
                ref="paginatorRef"
                :findAllMethod="findAll"
                :limit="10">
                <template #empty?>
                    <div class="text-center text-gray-500">
                        No {{ name }} Found.
                    </div>
                </template>

                <template #default="{ entities }">
                    <table class="w-full border-l border-r border-gray-100">
                        <thead>
                            <tr class="border-b border-t border-gray-100 capitalize text-xs font-bold">
                                <th v-for="key in keys" class="text-center p-3" :key="key">{{ key.replace(/_/, ' ') }}</th>
                                <th v-if="canShow || canEdit || canDelete" class="text-center p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="entity in entities" :key="entity[pkName]" class="border-b border-gray-100">
                                <td v-for="key in keys" class="text-center p-3 text-xs" :key="entity[key]">{{ entity[key] }}</td>
                                <td class="text-center p-2">
                                    <RestrictedElement v-if="canShow" :permissions="[`${permissionName}:show`]">
                                        <router-link 
                                            :to="`${path}/${entity[pkName]}`" 
                                            class="text-white bg-blue-500 px-1 py-1 text-xs rounded-md block hover:bg-blue-600">
                                            View
                                        </router-link>
                                    </RestrictedElement>
                                    <RestrictedElement v-if="canEdit" :permissions="[`${permissionName}:put`]">
                                        <router-link 
                                            :to="`${path}/${entity[pkName]}/edit`" 
                                            class="text-white bg-blue-500 px-1 py-1 text-xs rounded-md block mt-1 hover:bg-blue-600">
                                            Edit
                                        </router-link>
                                    </RestrictedElement>
                                    <RestrictedElement v-if="canDelete" :permissions="[`${permissionName}:delete`]">
                                        <button 
                                            @click="remove(entity[pkName])" 
                                            class="text-white bg-red-500 px-1 py-1 text-xs rounded-md w-full mt-1 hover:bg-red-600">
                                            Delete
                                        </button>
                                    </RestrictedElement>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </MeteorPaginator>
        </Content>
    </Restricted>
</template>

<script setup>
import MeteorPaginator from '../UI/MeteorPaginator.vue';
import RestrictedElement from '../UI/RestrictedElement.vue';
import Restricted from '../UI/Restricted.vue';
import Content from '../UI/Content.vue';
import { ref } from 'vue';

const paginatorRef = ref(null);
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
    pkName: {
        type: String,
        required: true
    },
    keys: {
        type: Array,
        required: true
    },
    findAll: {
        type: Function,
        required: true
    },
    remove: {
        type: Function,
        required: false
    },
    canCreate: {
        type: Boolean,
        required: false,
        default: false
    },
    canEdit: {
        type: Boolean,
        required: false,
        default: false
    },
    canDelete: {
        type: Boolean,
        required: false,
        default: false
    },
    canShow: {
        type: Boolean,
        required: false,
        default: false
    }
});

const remove = async (pk) => {
    if (confirm('Are you sure you want to delete this item?')) {
        await props.remove(pk);
        paginatorRef.value.paginator.refresh();
    }
}
</script>
