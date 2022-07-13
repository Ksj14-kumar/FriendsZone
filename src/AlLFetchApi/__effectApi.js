const baseURL = process.env.REACT_APP_BASE_URL;
const EffectApi = {
    isBookMarked: async (url, body) => {
        const response = await fetch(`${baseURL}${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('uuid')}`
            }
        })
        return response
    },
    
}