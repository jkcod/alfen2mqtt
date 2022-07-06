const WallboxData = require('./wallbox');

class Logger {
    constructor(rest) {
        this.rest = rest;
    }

    async logWallboxData() {
        const wbRawData = await this.rest.getWallboxData();
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
        console.log('Status Code: ' + wbData.getStatusCode());
        console.log('Status: ' + wbData.getStatusText());
        console.log('Meter Reading: ' + wbData.getMeterReading());
    }

}

module.exports = Logger;
