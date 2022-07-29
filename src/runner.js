const RestClient = require('./restclient');
const DataPublisher = require('./datapublisher');
const DataSubscriber = require('./datasubscriber');
const MqttHandler = require('./mqtt');
const Log = require('./logger');

class Runner {
    constructor(config) {
        this.config = config;
    }

    async start() {
        const mqtt = new MqttHandler(this.config);
        try {
            mqtt.connect();
        } catch (e) {
            Log.error('Error during connecting to mqtt broker: ' + e.message);
            process.exit(1);
        }
        const rest = new RestClient(this.config);
        this.publisher = new DataPublisher(rest, mqtt);
        new DataSubscriber(rest, mqtt);
        await this._run();
    }

    async _run() {
        try {
            await this.publisher.publishNewData();
        } catch (e) {
            Log.error('Error occured during retrieving / publishing Wallbox data. Error Message: ' + e.message);
        } finally {
            const refreshInterval = this.config.refreshIntervalSeconds * 1000;
            Log.info('Reschedule in ' + refreshInterval + ' ms');
            if (refreshInterval > 0) {
                setTimeout(() => {
                    return this._run();
                }, refreshInterval);
            }
        }
    }
}

module.exports = Runner;