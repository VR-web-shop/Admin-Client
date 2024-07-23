import W3CWebSocket from 'websocket';
import { ref } from 'vue';

const URL = import.meta.env.VITE_SCENES_WEBSOCKET_URL
const client = new W3CWebSocket.w3cwebsocket(URL, 'echo-protocol');
const messages = ref([]);
const isConnected = ref(false);

client.onerror = function() {
    console.log('Connection Error');
};

client.onopen = function() {
    console.log('WebSocket Client Connected');
    isConnected.value = true;
};

client.onclose = function() {
    console.log('echo-protocol Client Closed');
    isConnected.value = false;
};

client.onmessage = function(e) {
    if (typeof e.data === 'string') {
        const data = JSON.parse(e.data);
        messages.value.push(data);
    }
};

export const useWebsockets = () => {

    return { 
        messages,
        isConnected
    }
}
