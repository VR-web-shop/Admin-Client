import { createRouter, createWebHashHistory } from 'vue-router'

import NotFound from './layout/NotFound.vue'
import Home from './pages/Home.vue'

import CreateUser from './pages/users/Create.vue'
import UpdateUser from './pages/users/Update.vue'
import IndexUser from './pages/users/Index.vue'
import ShowUser from './pages/users/Show.vue'

import CreateRole from './pages/roles/Create.vue'
import UpdateRole from './pages/roles/Update.vue'
import IndexRole from './pages/roles/Index.vue'
import ShowRole from './pages/roles/Show.vue'

import CreatePermission from './pages/permissions/Create.vue'
import UpdatePermission from './pages/permissions/Update.vue'
import IndexPermission from './pages/permissions/Index.vue'
import ShowPermission from './pages/permissions/Show.vue'

import CreateProduct from './pages/products/Create.vue'
import UpdateProduct from './pages/products/Update.vue'
import IndexProduct from './pages/products/Index.vue'
import ShowProduct from './pages/products/Show.vue'

import CreateProductEntity from './pages/product_entities/Create.vue'
import UpdateProductEntity from './pages/product_entities/Update.vue'
import IndexProductEntity from './pages/product_entities/Index.vue'
import ShowProductEntity from './pages/product_entities/Show.vue'

import IndexProductEntityState from './pages/product_entity_states/Index.vue'
import ShowProductEntityState from './pages/product_entity_states/Show.vue'

import IndexProductOrder from './pages/product_orders/Index.vue'
import ShowProductOrder from './pages/product_orders/Show.vue'

import IndexProductOrderEntity from './pages/product_order_entities/Index.vue'
import ShowProductOrderEntity from './pages/product_order_entities/Show.vue'

import IndexProductOrderState from './pages/product_order_states/Index.vue'
import ShowProductOrderState from './pages/product_order_states/Show.vue'

import IndexDeliverOption from './pages/deliver_options/Index.vue'
import ShowDeliverOption from './pages/deliver_options/Show.vue'

import IndexPaymentOption from './pages/payment_options/Index.vue'
import ShowPaymentOption from './pages/payment_options/Show.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },

    { path: '/users', component: IndexUser, name: 'users' },
    { path: '/users/create', component: CreateUser, name: 'users.create' },
    { path: '/users/:uuid', component: ShowUser, name: 'users.show' },
    { path: '/users/:uuid/edit', component: UpdateUser, name: 'users.edit' },

    { path: '/roles', component: IndexRole, name: 'roles' },
    { path: '/roles/create', component: CreateRole, name: 'roles.create' },
    { path: '/roles/:name', component: ShowRole, name: 'roles.show' },
    { path: '/roles/:name/edit', component: UpdateRole, name: 'roles.edit' },

    { path: '/permissions', component: IndexPermission, name: 'permissions' },
    { path: '/permissions/create', component: CreatePermission, name: 'permissions.create' },
    { path: '/permissions/:name', component: ShowPermission, name: 'permissions.show' },
    { path: '/permissions/:name/edit', component: UpdatePermission, name: 'permissions.edit' },   
    
    { path: '/products', component: IndexProduct, name: 'products' },
    { path: '/products/create', component: CreateProduct, name: 'products.create' },
    { path: '/products/:uuid', component: ShowProduct, name: 'products.show' },
    { path: '/products/:uuid/edit', component: UpdateProduct, name: 'products.edit' },

    { path: '/product_entities', component: IndexProductEntity, name: 'product_entities' },
    { path: '/product_entities/create', component: CreateProductEntity, name: 'product_entities.create' },
    { path: '/product_entities/:uuid', component: ShowProductEntity, name: 'product_entities.show' },
    { path: '/product_entities/:uuid/edit', component: UpdateProductEntity, name: 'product_entities.edit' },

    { path: '/product_entity_states', component: IndexProductEntityState, name: 'product_entity_states' },
    { path: '/product_entity_states/:name', component: ShowProductEntityState, name: 'product_entity_states.show' },

    { path: '/product_orders', component: IndexProductOrder, name: 'product_orders' },
    { path: '/product_orders/:uuid', component: ShowProductOrder, name: 'product_orders.show' },

    { path: '/product_order_entities', component: IndexProductOrderEntity, name: 'product_order_entities' },
    { path: '/product_order_entities/:uuid', component: ShowProductOrderEntity, name: 'product_order_entities.show' },

    { path: '/product_order_states', component: IndexProductOrderState, name: 'product_order_states' },
    { path: '/product_order_states/:name', component: ShowProductOrderState, name: 'product_order_states.show' },

    { path: '/deliver_options', component: IndexDeliverOption, name: 'deliver_options' },
    { path: '/deliver_options/:name', component: ShowDeliverOption, name: 'deliver_options.show' },

    { path: '/payment_options', component: IndexPaymentOption, name: 'payment_options' },
    { path: '/payment_options/:name', component: ShowPaymentOption, name: 'payment_options.show' },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
