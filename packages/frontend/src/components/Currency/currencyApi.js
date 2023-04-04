import axios from "axios";

const currencyApi = {
    getTickers: async () => axios.get(process.env.REACT_APP_TICKERS_URL)
}
export default currencyApi;