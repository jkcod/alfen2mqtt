const WallboxLogger = require('./wallboxlogger');
const WallboxData = require('./wallbox');
const Log = require('./logger');

class DataPublisher {
    constructor(rest, mqtt) {
        this.rest = rest;
        this.mqtt = mqtt;
        this.wallboxlogger = new WallboxLogger();
        this.currentData = {};
    }

    async publishNewData() {
        Log.info("Publish new data");
        const rawData = await this.rest.getWallboxData();
        const data = new WallboxData(rawData);
        this.wallboxlogger.logWallboxData(data);
        
        if(this._dataChanged(data)) {
            this._saveCurrentData(data);

            this.mqtt.publish("UpTime", data.getUpTime());
            this.mqtt.publish("Bootups", data.getBootUps());
            this.mqtt.publish("L1Current", data.getCurrentPhase1());
            this.mqtt.publish("L2Current", data.getCurrentPhase2());
            this.mqtt.publish("L3Current", data.getCurrentPhase3());
            this.mqtt.publish("L1Voltage", data.getVoltagePhase1());
            this.mqtt.publish("L2Voltage", data.getVoltagePhase2());
            this.mqtt.publish("L3Voltage", data.getVoltagePhase3());
            this.mqtt.publish("ActivePowerTotal", data.getActivePowerTotal());
            this.mqtt.publish("Temperature", data.getTemperature());
            this.mqtt.publish("StatusCode", data.getStatusCode());
            this.mqtt.publish("MeterReading", data.getMeterReading());
        }
    }

    _dataChanged(newData) {
        if (!this._hasCurrentData()) {
            Log.info('mqtt - data changed (is not set)');
            return true;
        }

        const currentData = this._getCurrentData();

        if (currentData.toString() !== newData.toString()) {
            Log.info('mqtt - data changed');
            return true;
        }
        Log.info('mqtt - data did not change -> no publish');
        return false;
    }

    _saveCurrentData(data) {
        this.currentData = data;
    }

    _hasCurrentData() {
        return !!this.currentData;
    }

    _getCurrentData() {
        return this.currentData;
    }
}

module.exports = DataPublisher;