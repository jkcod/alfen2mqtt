const config = require('config');
const Mqtt = require('mqtt');
const Runner = require('./runner');
let runner;

jest.mock('mqtt');
const mockedMqttClientImpl = {
    callbacks: [],
    on(eventName, fnCallback) {
        this.callbacks[eventName] = fnCallback;
    },
    callEvent(eventName, args) {
        this.callbacks[eventName].apply(this, args);
    },
    subscribe(topic) { }
}

Mqtt.connect.mockImplementation(() => {
    return mockedMqttClientImpl;
});

jest.mock('./restclient');

describe("Runner testing", () => {

    beforeEach(() => {
        runner = new Runner(config);
        jest.clearAllMocks();
    });

    test('Test start()', async () => {
        await runner.start();
    });

});
