import $api from "../../http";


const authApi = {
    getUserById: async (userId) => {
        return $api.get(`/auth/getUserById/${userId}`)
    },
    login: async (username) => {
        return $api.post(`auth/login`, {username})
    },
}
export default authApi;