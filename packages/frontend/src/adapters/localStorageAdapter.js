
const localStorageAdapter  = {
    setItem: (key, value) => {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.removeItem(key);
        }
    },

    getItem: (key) => {
        return JSON.parse(localStorage.getItem(key));
    },

    removeItem: (key) => {
        localStorage.removeItem(key)
    },

    clear: () => {
        localStorage.clear()
    },
}

export default localStorageAdapter;