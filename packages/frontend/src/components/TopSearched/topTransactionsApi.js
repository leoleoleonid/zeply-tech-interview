import $api from "../../http";


const topTransactionsApi = {
    getTopTransactions: async () => {
        return $api.get('/transaction-search/top?limit=5')
    }
}
export default topTransactionsApi;