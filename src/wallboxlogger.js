const WallboxData = require('./wallbox');
const Log = require('./logger');

class WallboxLogger {
    constructor() {

    }

    async logWallboxData(wbRawData) {
        const wbData = new WallboxData(wbRawData);
        Log.info('Uptime: ' + wbData.getUpTime());
        Log.info('Bootups: ' + wbData.getBootUps());
        Log.info('Voltage L1: ' + wbData.getVoltagePhase1());
        Log.info('Voltage L2: ' + wbData.getVoltagePhase2());
        Log.info('Voltage L3: ' + wbData.getVoltagePhase3());
        Log.info('Current L1: ' + wbData.getCurrentPhase1());
        Log.info('Current L2: ' + wbData.getCurrentPhase2());
        Log.info('Current L3: ' + wbData.getCurrentPhase3());
        Log.info('Active Power Total: ' + wbData.getActivePowerTotal());
        Log.info('Temperature: ' + wbData.getTemperature());
        Log.info('Status Code: ' + wbData.getStatusCode());
        Log.info('Status: ' + wbData.getStatusText());
        Log.info('Meter Reading: ' + wbData.getMeterReading());
    }

}

module.exports = WallboxLogger;
