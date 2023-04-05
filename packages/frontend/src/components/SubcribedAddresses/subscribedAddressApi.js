import $api from "../../http";

const subscribedAddressApi = {
    subscribeOnAddress: async (address) => {
        return $api.post('/subscribed-addresses', {address})
    },
    getSubscribedAddress: async (address) => {
        return $api.get('/subscribed-addresses')
    }
}
export default subscribedAddressApi;