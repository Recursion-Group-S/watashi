import axios from 'axios';

const KEY = '5b1a1206f7e855a53ac70e1f7ea9de1f3d98cd88';

export default class FlaticonWrapper {
    url = "https://api.flaticon.com/v3";
    constructor(){}

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

    async getStyles(token, page = 1, limit = 50) {
        try {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }

            const response = await axios.get(`${this.url}/styles?page=${page}&limit=${limit}`, {
                headers: headers,
            });

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}