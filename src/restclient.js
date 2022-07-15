const axios = require('axios');
const https = require('https');

const HEADERS = { 'Content-Type': 'application/json; charset=utf-8' };

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
            await this.httpClient.post(this.baseUrl + '/login', requestBody, {
                headers: HEADERS
            });
        } catch(e) {
            throw new Error("Login failed: " + e);
        }
    }

    async _logout() {
        const requestBody = {};
        try {
            await this.httpClient.post(this.baseUrl + '/logout', requestBody, {
                headers: HEADERS
            });
        } catch(e) {
            throw new Error("Logout failed: " + e);
        }
    }

    async getWallboxData() {
        await this._login();
        const response = await this.httpClient.get(this.baseUrl + '/prop?ids=2060_0,2056_0,2221_3,2221_4,2221_5,2221_A,2221_B,2221_C,2221_16,2201_0,2501_2,2221_22', {
            headers: HEADERS
        });
        await this._logout();
        return response.data;
    }

    async setMaxCurrent(maxCurrent) {
        await this._login();
        const requestBody = {
            '2062_0': {'id': '2062_0', 'value': maxCurrent}
        }
        await this.httpClient.post(this.baseUrl + '/prop', requestBody, {
            headers: HEADERS
        });
        await this._logout();
    }

    getAxiosClientInstance() {
        return this.httpClient;
    }
}

module.exports = RestClient;
