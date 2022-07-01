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
        this.baseUrl = 'https://' + this.config.get('wallbox.host') + '/api';
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    async _login() {
        const requestBody = {
            username: this.config.get('wallbox.user'),
            password: this.config.get('wallbox.password')
        };
        try {
            const response = await this.httpClient.post(this.baseUrl + '/login', requestBody, {
                headers: {
                    'Content-Type': 'alfen/json; charset=utf-8'
                }
            });
        } catch(e) {
            throw new Error("Login failed: " + e);
        }

    }

    async getWallboxData() {
        await this._login();
        const response = await this.httpClient.get(this.baseUrl + '/prop?ids=2060_0,2056_0,2221_3,2221_4,2221_5,2221_A,2221_B,2221_C,2221_16,2201_0,2501_2,2221_22', {
            headers: {
                'Content-Type': 'alfen/json; charset=utf-8'
            }
        });
        return response.data;
    }

    getAxiosClientInstance() {
        return this.httpClient;
    }
}

module.exports = RestClient;
