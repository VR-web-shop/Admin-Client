import { useAuthSDK } from "./useAuthSDK.js"
import { useToast } from "./useToast.js"

const toast = useToast()
const SERVER_URL = 'http://localhost:3002'

export const useProducts = () => {
    const post = async (body, endpoint='/graphql', extraHeaders=null, authRefreshes=0) => {
        const token = localStorage.getItem('auth')
        if (!token) throw new Error('No token found')

        const headers = {
            'Authorization': 'Bearer ' + token
        }

        if (extraHeaders) {
            Object.keys(extraHeaders).forEach(key => {
                headers[key] = extraHeaders[key]
            })
        }        

        const response = await fetch(`${SERVER_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body 
        })

        if (!response.ok) {
            toast.add('Failed to fetch data', 5000, 'error')
            return
        }   

        const json = await response.json()
        if (json.errors) {
            toast.add(json.errors[0].message, 5000, 'error')
            return
        }

        const key = (() => {
            if (!json.data) return null
            return Object.keys(json.data)[0]
        })()

        if (key && json.data[key].__typename === 'RequestError') {
            const { code, message } = json.data[key]

            /**
             * The first time we get a 401, we try to refresh the token
             * to get a new one. If it fails a second time, it means
             * the refresh token is expired and we need to log in again.
             */
            if (code === '401' && authRefreshes < 1) {
                const refresh = await useAuthSDK().sdk.api.authentication.refresh()
                localStorage.setItem('auth', refresh.access_token)
                return post(query, endpoint, extraHeaders, authRefreshes + 1)
            }

            toast.add(`Code: ${code} - ${message}`, 5000, 'error')
            return
        }

        return json
    }

    const postJSON = async (query, endpoint='/graphql') => {
        return await post(JSON.stringify({ query }), endpoint, {
            'Content-Type': 'application/json'
        })
    }

    const api = function(singularName, pluralName, pkName, putParams, returnParams) {
        const lowercasedSingularName = singularName.slice(0, 1).toLowerCase() + singularName.slice(1, singularName.length)
        const lowercasedPluralName = pluralName.slice(0, 1).toLowerCase() + pluralName.slice(1, pluralName.length)
        
        for (let i = 0; i < putParams.length; i++) {
            if (putParams[i] === 'transaction_state_name:string') {
                // Slice out the transaction_state_name and transaction_message
                putParams.splice(i, 2)
                break
            }
        }
        for (let i = 0; i < putParams.length; i++) {
            if (putParams[i] === 'transaction_message:string') {
                // Slice out the transaction_state_name and transaction_message
                putParams.splice(i, 2)
                break
            }
        }
        console.log(putParams)
        const find = async (pk) => {
            const response = await postJSON(`{ ${lowercasedSingularName}(${pkName}: "${pk}") {
                __typename
                ... on ${singularName} {
                    ${returnParams}
                }
                ... on RequestError {
                    message
                    code
                }
            }}`)

            return response.data[lowercasedSingularName]
        }

        const findAll = async (options = {}) => {
            const limit = options.limit || 10
            const page = options.page || 1

            const response = await postJSON(`{ ${lowercasedPluralName}(limit: ${limit}, page: ${page}) {
                __typename
                ... on ${pluralName} {
                    rows {
                        ${returnParams}
                    }
                    pages
                    count
                }
                ... on RequestError {
                    message
                    code
                }
            }}`)
            return response.data[`${lowercasedPluralName}`]
        }

        const create = async (input) => {
            const params = putParams.map(param => {
                const [name, type] = param.split(':')
                return `${name}: ${type === 'string' ? `"${input[name]}"` : input[name]}`
            }).join(', ')

            const response = await postJSON(`mutation {
                create${singularName}(input: { ${params} }) {
                    __typename
                    ... on ${singularName} {
                        ${returnParams}
                    }
                    ... on RequestError {
                        message
                        code
                    }
                }
            }`)
            return response.data[`create${singularName}`]
        }

        const put = async (input) => {
            const params = putParams.map(param => {
                const [name, type] = param.split(':')
                return `${name}: ${type === 'string' ? `"${input[name]}"` : input[name]}`
            }).join(', ')

            const response = await postJSON(`mutation {
                put${singularName}(input: { ${params} }) {
                    __typename
                    ... on ${singularName} {
                        ${returnParams}
                    }
                    ... on RequestError {
                        message
                        code
                    }
                }
            }`)
            return response.data[`put${singularName}`]
        }

        const remove = async (pk) => {
            const response = await postJSON(`mutation {
                delete${singularName}(${pkName}: "${pk}") {
                    __typename
                    ... on BooleanResult {
                        result
                    }
                    ... on RequestError {
                        message
                        code
                    }
                }
            }`)

            return response.data[`delete${singularName}`].result
        }

        const upload = async (file, clientSideUUID, version, oldURL) => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('clientSideUUID', clientSideUUID)
            formData.append('version', version)
            formData.append('prefix', lowercasedSingularName)
            if (oldURL) formData.append('oldURL', oldURL)

            const data = await post(formData, '/upload')
            
            return data.url
        }

        return {
            find,
            findAll,
            create,
            put,
            remove,
            upload
        }
    }

    const DeliverOption = api(
        'DeliverOption', 
        'DeliverOptions',
        'clientSideUUID', 
        ['clientSideUUID:string', 'name:string', 'price:float'], 
        'clientSideUUID name price created_at updated_at'
    )

    const PaymentOption = api(
        'PaymentOption', 
        'PaymentOptions',
        'clientSideUUID', 
        ['clientSideUUID:string', 'name:string', 'price:float'], 
        'clientSideUUID name price created_at updated_at'
    )

    const Product = api(
        'Product',
        'Products',
        'clientSideUUID',
        ['clientSideUUID:string', 'name:string', 'description:string', 'price:float', 'thumbnail_source:string'],
        'clientSideUUID name description price thumbnail_source created_at updated_at'
    )

    const ProductEntity = api(
        'ProductEntity',
        'ProductEntities',
        'clientSideUUID',
        ['clientSideUUID:string', 'product_entity_state_name:string', 'product_client_side_uuid:string', 'transaction_state_name:string', 'transaction_message:string'],
        'clientSideUUID product_entity_state_name product_client_side_uuid transaction_state_name transaction_message created_at updated_at'
    )

    const ProductOrder = api(
        'ProductOrder',
        'ProductOrders',
        'clientSideUUID',
        ['clientSideUUID:string', 'name:string', 'email:string', 'address:string', 'city:string', 'country:string', 'postal_code:string', 'product_order_state_name:string', 'deliver_option_client_side_uuid:string', 'payment_option_client_side_uuid:string'],
        'clientSideUUID name email address city country postal_code product_order_state_name deliver_option_client_side_uuid payment_option_client_side_uuid created_at updated_at'
    )

    const ProductOrderEntity = api(
        'ProductOrderEntity',
        'ProductOrderEntities',
        'clientSideUUID',
        ['clientSideUUID:string', 'product_entity_client_side_uuid:string', 'product_order_client_side_uuid:string'],
        'clientSideUUID product_entity_client_side_uuid product_order_client_side_uuid created_at updated_at'
    )

    const ProductEntityState = api(
        'ProductEntityState',
        'ProductEntityStates',
        'name',
        ['name:string'],
        'name created_at updated_at'
    )

    const ProductOrderState = api(
        'ProductOrderState',
        'ProductOrderStates',
        'name',
        ['name:string'],
        'name created_at updated_at'
    )

    const ValutaSetting = api(
        'ValutaSetting',
        'ValutaSettings',
        'clientSideUUID',
        ['clientSideUUID:string', 'name:string', 'symbol:string', 'short:string', 'active:boolean'],
        'clientSideUUID name symbol symbol short active created_at updated_at'
    )

    return {
        DeliverOption,
        PaymentOption,
        Product,
        ProductEntity,
        ProductEntityState,
        ProductOrder,
        ProductOrderEntity,
        ProductOrderState,
        ValutaSetting
    }
}
