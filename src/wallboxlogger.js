const WallboxData = require('./wallbox');
const Log = require('./logger');

class WallboxLogger {
    constructor() {

    }

    logWallboxData(wbData) {
        Log.debug('Uptime: ' + wbData.getUpTime());
        Log.debug('Bootups: ' + wbData.getBootUps());
        Log.debug('Voltage L1: ' + wbData.getVoltagePhase1());
        Log.debug('Voltage L2: ' + wbData.getVoltagePhase2());
        Log.debug('Voltage L3: ' + wbData.getVoltagePhase3());
        Log.debug('Current L1: ' + wbData.getCurrentPhase1());
        Log.debug('Current L2: ' + wbData.getCurrentPhase2());
        Log.debug('Current L3: ' + wbData.getCurrentPhase3());
        Log.debug('Active Power Total: ' + wbData.getActivePowerTotal());
        Log.debug('Temperature: ' + wbData.getTemperature());
        Log.debug('Status Code: ' + wbData.getStatusCode());
        Log.debug('Status: ' + wbData.getStatusText());
        Log.debug('Meter Reading: ' + wbData.getMeterReading());
    }

    logWallboxDataRaw(wbRawData) {
        const wbData = new WallboxData(wbRawData);
        this.logWallboxData(wbData);
    }

}

module.exports = WallboxLogger;
