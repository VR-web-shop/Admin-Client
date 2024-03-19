import { ref } from 'vue'
import ProductSDK from '@vr-web-shop/products'

const SERVER_URL = 'http://localhost:3002'
const API_VERSION = 'v1'
const sdk = new ProductSDK(SERVER_URL, API_VERSION)

export function useProductSDK() {
    return {
        sdk
    }
}
