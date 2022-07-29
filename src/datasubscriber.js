const Log = require('./logger');

const MAX_CURRENT_TOPIC = 'wallbox/data/MaxCurrent';

class DataSubscriber {
    constructor(rest, mqtt) {
        this.rest = rest;
        this.mqtt = mqtt;
        this._subscribeToMaxCurrentEvent();
    }

    _subscribeToMaxCurrentEvent() {
        this.mqtt.subscribeTo(MAX_CURRENT_TOPIC);
        this.mqtt.client.on('message', (topic, message) => {
            if (topic !== MAX_CURRENT_TOPIC) {
                return;
            }
            const maxCurrent = parseInt(message.toString(), 10);
            if (maxCurrent > 16 | maxCurrent < 6) {
                Log.warn("Max current must be between 6 and 16 amp. Skipping it.");
                return;
            }
            Log.info("Setting max current to " + maxCurrent + " amp");
            this.rest.setMaxCurrent(maxCurrent);
        });
    }
}

module.exports = DataSubscriber;