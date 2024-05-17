import { ref } from 'vue'
import ProductSDK from '@vr-web-shop/products'

/**
 * @deprecated
 */


const SERVER_URL = import.meta.env.VITE_PRODUCTS_SERVER_URL
const API_VERSION = 'v1'
const sdk = new ProductSDK(SERVER_URL, API_VERSION)

export function useProductSDK() {
    return {
        sdk
    }
}
