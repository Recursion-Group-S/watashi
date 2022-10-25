import axios from 'axios';

const KEY = process.env.REACT_APP_FLATICON_API_KEY;

export default class FlaticonWrapper {
    url = "https://api.flaticon.com/v3";
    constructor() { }

    async getToken() {
        try {
            const headers = {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }

            const response = await axios.post(`${this.url}/app/authentication`, {
                apikey: KEY,
                headers: headers,
            });

            const { token, expires } = response.data.data;

            return token;
        } catch (error) {
            console.log(error);
        }
    }

    async searchIcons(token, q, orderBy = 'priority') {
        try {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }

            const response = await axios.get(`${this.url}/search/icons/${orderBy}`, {
                headers: headers,
                params: {
                    q: q,
                    styleShape: 'hand-drawn',
                    limit: 50
                }
            });

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}