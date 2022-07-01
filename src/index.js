const axios = require('axios');
const https = require('https');
const url = require('url');
const WallboxData = require('./wallbox');

// At instance level
const httpClient = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        keepAlive: true
    })
});

async function login() {
    const requestBody = {
        username: 'admin',
        password: 'azdTa29VZDlUazBq'
    };

    const response = await httpClient.post('https://192.168.2.232/api/login', requestBody, {
        headers: {
            'Content-Type': 'alfen/json; charset=utf-8'
        }
    });
    console.log(response.status);
}

async function getWallboxData() {
    const response = await httpClient.get(`https://192.168.2.232/api/prop?ids=2060_0,2056_0,2221_3,2221_4,2221_5,2221_A,2221_B,2221_C,2221_16,2201_0,2501_2,2221_22`, {
        headers: {
            'Content-Type': 'alfen/json; charset=utf-8'
        }
    });
    return response.data;
}

async function run() {
    try {
        await login();
        console.log('Login successful.');

        const wbRawData = await getWallboxData();
        //console.log(wbRawData);
        const wbData = new WallboxData(wbRawData);
        console.log('Uptime: ' + wbData.getUpTime());
        console.log('Bootups: ' + wbData.getBootUps());
        console.log('Voltage L1: ' + wbData.getVoltagePhase1());
        console.log('Voltage L2: ' + wbData.getVoltagePhase2());
        console.log('Voltage L3: ' + wbData.getVoltagePhase3());
        console.log('Current L1: ' + wbData.getCurrentPhase1());
        console.log('Current L2: ' + wbData.getCurrentPhase2());
        console.log('Current L3: ' + wbData.getCurrentPhase3());
        console.log('Active Power Total: ' + wbData.getActivePowerTotal());
        console.log('Temperature: ' + wbData.getTemperature());
        console.log('Status: ' + wbData.getStatus());
        console.log('Meter Reading: ' + wbData.getMeterReading());
    } catch (e) {
        console.error('Error occured during retrieving Wallbox data. Error Message: ' + e.message);
    } finally {
        console.log('Reschedule in 20 seconds');
        setTimeout(() => {
            return run();
        }, 20 * 1000);

    }
}

run();
