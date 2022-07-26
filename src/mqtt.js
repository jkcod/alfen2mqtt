const Mqtt = require('mqtt');
const Log = require('./logger');

class MqttHandler {
    constructor(config) {
        this.config = config;
    }

    connect() {
        this.client = Mqtt.connect(this.config.mqtt.server, {
            clientId: this.config.mqtt.clientId,
            connectTimeout: this.config.mqtt.connectTimeout,
            keepalive: this.config.mqtt.keepalive,
            password: this.config.mqtt.password,
            username: this.config.mqtt.username,
            reconnectPeriod: this.config.mqtt.reconnectPeriod,
            port: this.config.mqtt.port
        });

        this.client.on('error', (error) => {
            Log.error('mqtt error: ' + error.message);
        });
        this.client.on('close', () => {
            Log.error('mqtt close');
        });
        this.client.on('reconnect', () => {
            Log.error('mqtt reconnect');
        });
        this.client.on('connect', () => {
            Log.info('mqtt connected');
        });

    };

    publish(part, data) {
        if (typeof data === 'undefined') {
            throw new Error('data not defined')
        }
        if (data === null) {
            return;
        }
        const topic = 'wallbox/data/' + part;
        data = (typeof data === 'string' ? data : JSON.stringify(data));

        Log.debug('mqtt - publish on topic - ' + topic + ' ' + data);
        this.client.publish(topic, data, { qos: 2, retain: false });
    };

    subscribeTo(topic) {
        this.client.subscribe(topic);
    }
}

module.exports = MqttHandler;