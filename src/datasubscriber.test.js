const config = require('config');
const MqttHandler = require('./mqtt');
const DataSubscriber = require('./datasubscriber');
const RestClient = require('./restclient');
const rest = new RestClient(config);
const Mqtt = require('mqtt');
const mqttHandler = new MqttHandler(config);
const Log = require('./logger');

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

mqttHandler.connect();

describe("Data Subscriber testing", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        new DataSubscriber(rest, mqttHandler);
    });

    test('Handle message subscription for max current topic (lower than allowed)', async () => {
        const logspy = jest.spyOn(Log, 'warn');
        const setMaxCurrentSpy = jest.spyOn(rest, 'setMaxCurrent');
        mockedMqttClientImpl.callEvent('message', ['wallbox/data/MaxCurrent', 3]);
        expect(setMaxCurrentSpy).not.toHaveBeenCalled();
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Max current must be between 6 and 16 amp. Skipping it.'));
    });

    test('Handle message subscription unknow topic', async () => {
        const setMaxCurrentSpy = jest.spyOn(rest, 'setMaxCurrent');
        mockedMqttClientImpl.callEvent('message', ['wallbox/data/Unknown', 3]);
        expect(setMaxCurrentSpy).not.toHaveBeenCalled();
    });

    test('Handle message subscription for max current topic (higher than allowed)', async () => {
        const logspy = jest.spyOn(Log, 'warn');
        const setMaxCurrentSpy = jest.spyOn(rest, 'setMaxCurrent');
        mockedMqttClientImpl.callEvent('message', ['wallbox/data/MaxCurrent', 17]);
        expect(setMaxCurrentSpy).not.toHaveBeenCalled();
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Max current must be between 6 and 16 amp. Skipping it.'));
    });

    test('Handle message subscription for max current topic (min allowed)', async () => {
        const logspy = jest.spyOn(Log, 'info');
        const setMaxCurrentSpy = jest.spyOn(rest, 'setMaxCurrent');
        mockedMqttClientImpl.callEvent('message', ['wallbox/data/MaxCurrent', 6]);
        expect(setMaxCurrentSpy).toHaveBeenCalledWith(6);
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Setting max current to 6 amp'));
    });

    test('Handle message subscription for max current topic (max allowed)', async () => {
        const logspy = jest.spyOn(Log, 'info');
        const setMaxCurrentSpy = jest.spyOn(rest, 'setMaxCurrent');
        mockedMqttClientImpl.callEvent('message', ['wallbox/data/MaxCurrent', 16]);
        expect(setMaxCurrentSpy).toHaveBeenCalledWith(16);
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Setting max current to 16 amp'));
    });

});
