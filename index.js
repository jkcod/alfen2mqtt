const axios = require('axios');
const https = require('https');
const url = require('url');

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

class WallboxData {
    constructor(rawData) {
        this.rawData = rawData;
        this.sensorMapping = {
            'uptime': '2060_0',
            'bootups': '2056_0',
            'voltage_l1': '2221_3',
            'voltage_l2': '2221_4',
            'voltage_l3': '2221_5',
            'current_l1': '2221_A',
            'current_l2': '2221_B',
            'current_l3': '2221_C',
            'active_power_total': '2221_16',
            'temperature': '2201_0',
            'status': '2501_2',
            'meter_reading': '2221_22'
        };
        this.statusMapping = {
            4: "Available",
            7: "Cable connected",
            10: "Vehicle connected",
            11: "Charging",
        };
    }

    getSensorValue(sensorName) {
        return this.rawData.properties.find(sensor => sensor.id === this.sensorMapping[sensorName]).value;
    }

    getUpTime() {
        return this.getSensorValue('uptime');
    }

    getBootUps() {
        return this.getSensorValue('bootups');
    }

    getCurrentPhase1() {
        return this.getSensorValue('current_l1').toFixed(2);
    }

    getCurrentPhase2() {
        return this.getSensorValue('current_l2').toFixed(2);
    }

    getCurrentPhase3() {
        return this.getSensorValue('current_l3').toFixed(2);
    }

    getVoltagePhase1() {
        return this.getSensorValue('voltage_l1').toFixed(2);
    }

    getVoltagePhase2() {
        return this.getSensorValue('voltage_l2').toFixed(2);
    }

    getVoltagePhase3() {
        return this.getSensorValue('voltage_l3').toFixed(2);
    }

    getActivePowerTotal() {
        return this.getSensorValue('active_power_total').toFixed(2);
    }

    getTemperature() {
        return this.getSensorValue('temperature').toFixed(2);
    }

    getStatus() {
        return this.statusMapping[this.getSensorValue('status')];
    }

    getMeterReading() {
        return (this.getSensorValue('meter_reading') / 1000).toFixed(2);
    }
}