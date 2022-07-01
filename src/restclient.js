const axios = require('axios');
const https = require('https');

class RestClient {
    constructor(config) {
        this.config = config;
        this.httpClient = axios.create({
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
                keepAlive: true
            })
        });
    }

    async _login() {
        const requestBody = {
            username: 'admin',
            password: 'azdTa29VZDlUazBq'
        };

        const response = await this.httpClient.post('https://192.168.2.232/api/login', requestBody, {
            headers: {
                'Content-Type': 'alfen/json; charset=utf-8'
            }
        });
        console.log(response.status);
    }

    async getWallboxData() {
        this._login();
        const response = await this.httpClient.get(`https://192.168.2.232/api/prop?ids=2060_0,2056_0,2221_3,2221_4,2221_5,2221_A,2221_B,2221_C,2221_16,2201_0,2501_2,2221_22`, {
            headers: {
                'Content-Type': 'alfen/json; charset=utf-8'
            }
        });
        return response.data;
    }
}

module.exports = RestClient;
