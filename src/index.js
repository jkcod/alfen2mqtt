const RestClient = require('./restclient');
const DataPublisher = require('./datapublisher');
const DataSubscriber = require('./datasubscriber');
const MqttHandler = require('./mqtt');
const Log = require('./logger');
const config = require('config');

const mqtt = new MqttHandler(config);
try {
    mqtt.connect();
} catch (e) {
    Log.error('Error during connecting to mqtt broker: ' + e.message);
    process.exit(1);
}
const rest = new RestClient(config);
const publisher = new DataPublisher(rest, mqtt);
new DataSubscriber(rest, mqtt);

async function run() {
    try {
        await publisher.publishNewData();
    } catch (e) {
        Log.error('Error occured during retrieving / publishing Wallbox data. Error Message: ' + e.message);
    } finally {
        Log.info('Reschedule in 20 seconds');
        setTimeout(() => {
            return run();
        }, 20 * 1000);
    }
}

run();
