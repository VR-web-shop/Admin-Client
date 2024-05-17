import { useAuthSDK } from "./useAuthSDK.js"
import { useToast } from "./useToast.js"

const toast = useToast()
const SERVER_URL = import.meta.env.VITE_SHOPPING_CART_SERVER_URL

export function useShoppingCart() {
    const request = async (endpoint, method='GET', body=null) => {
        const token = localStorage.getItem('auth')
        if (!token) throw new Error('No token found')

        const headers = {
            'Authorization': 'Bearer ' + token
        }

        const params = {
            method,
            headers
        }

        if (body) {
            params.body = JSON.stringify(body)
            params.headers['Content-Type'] = 'application/json'
        }

        const response = await fetch(`${SERVER_URL}${endpoint}`, params)

        if (!response.ok) {
            toast.add('Failed to fetch data', 5000, 'error')
            return
        }   

        if (method === 'DELETE') return
        
        const json = await response.json()
        return json
    }

    const api = (plural, singular) => {
        const find = async (pk) => {
            return await request(`${singular}/${pk}`)
        }

        const findAll = async ({limit, page}) => {
            return await request(`${plural}?limit=${limit}&page=${page}`)
        }

        const create = async (data) => {
            return await request(`${plural}`, 'POST', data)
        }

        const update = async (pk, data) => {
            return await request(`${singular}/${pk}`, 'PATCH', data)
        }

        const remove = async (pk) => {
            return await request(`${singular}/${pk}`, 'DELETE')
        }

        return {
            find,
            findAll,
            create,
            update,
            remove
        }
    }

    const Cart = api('/admin/carts', '/admin/cart')
    const CartProductEntity = api('/admin/cart_product_entities', '/admin/cart_product_entity')
    const CartState = api('/admin/cart_states', '/admin/cart_state')

    return {
        Cart,
        CartProductEntity,
        CartState
    }
}
