const baseUrl = process.env.REACT_APP_API_BACKENDURL
const fetchApiFunction = {
    BookMarkApiForPost: async (url, body) => {
        const response = await fetch(`${baseUrl}${url}`, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('uuid')}`
            }
        })
        return response
    },
    CopyPostLinkApi: async (payload) => {
        try {
            const res = await fetch(`${baseUrl}/blob/api/v1/_user/single/post/${payload.post}/`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('uuid')}`
                }
            })
            return res
        }
        catch (err) {
            return err
        }
    }
}
export default fetchApiFunction