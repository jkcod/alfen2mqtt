const config = require('config');
const MqttHandler = require('./mqtt');
const DataSubscriber = require('./datasubscriber');
const RestClient = require('./restclient');
const rest = new RestClient(config);
const Mqtt = require('mqtt');
const mqttHandler = new MqttHandler(config);

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
        const setMaxCurrentSpy = jest.spyOn(rest, 'setMaxCurrent');
        mockedMqttClientImpl.callEvent('message', ['wallbox/data/MaxCurrent', 3]);
        expect(setMaxCurrentSpy).not.toHaveBeenCalled();
    });

    test('Handle message subscription unknow topic', async () => {
        const setMaxCurrentSpy = jest.spyOn(rest, 'setMaxCurrent');
        mockedMqttClientImpl.callEvent('message', ['wallbox/data/Unknown', 3]);
        expect(setMaxCurrentSpy).not.toHaveBeenCalled();
    });

    test('Handle message subscription for max current topic (higher than allowed)', async () => {
        const setMaxCurrentSpy = jest.spyOn(rest, 'setMaxCurrent');
        mockedMqttClientImpl.callEvent('message', ['wallbox/data/MaxCurrent', 17]);
        expect(setMaxCurrentSpy).not.toHaveBeenCalled();
    });

    test('Handle message subscription for max current topic (min allowed)', async () => {
        const setMaxCurrentSpy = jest.spyOn(rest, 'setMaxCurrent');
        mockedMqttClientImpl.callEvent('message', ['wallbox/data/MaxCurrent', 6]);
        expect(setMaxCurrentSpy).toHaveBeenCalledWith(6);
    });

    test('Handle message subscription for max current topic (max allowed)', async () => {
        const setMaxCurrentSpy = jest.spyOn(rest, 'setMaxCurrent');
        mockedMqttClientImpl.callEvent('message', ['wallbox/data/MaxCurrent', 16]);
        expect(setMaxCurrentSpy).toHaveBeenCalledWith(16);
    });

});
