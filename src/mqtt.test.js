const MqttHandler = require('./mqtt');
const Mqtt = require('mqtt');
const config = require('config');
const mqttHandler = new MqttHandler(config);
const Log = require("./logger");

jest.mock('mqtt');
const mockedMqttClientImpl = {
    callbacks: [],
    on(eventName, fnCallback) {
        this.callbacks[eventName] = fnCallback;
    },
    callEvent(eventName, args) {
        this.callbacks[eventName].apply(this, args);
    },
    publish(topic, message, options) { },
    subscribe(topic) { }
}

Mqtt.connect.mockImplementation(() => {
    return mockedMqttClientImpl;
});

describe("MQTT Handler testing", () => {
    test("Test 'error' event handling", () => {
        const logspy = jest.spyOn(Log, 'error');
        mqttHandler.connect();
        mockedMqttClientImpl.callEvent('error', [new Error('Whoops!')]);
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('mqtt error: Whoops!'));
    });

    test("Test 'close' event handling", () => {
        const logspy = jest.spyOn(Log, 'error');
        mqttHandler.connect();
        mockedMqttClientImpl.callEvent('close');
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('mqtt close'));
    });

    test("Test 'reconnect' event handling", () => {
        const logspy = jest.spyOn(Log, 'error');
        mqttHandler.connect();
        mockedMqttClientImpl.callEvent('reconnect');
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('mqtt reconnect'));
    });

    test("Test 'connect' event handling", () => {
        const logspy = jest.spyOn(Log, 'info');
        mqttHandler.connect();
        mockedMqttClientImpl.callEvent('connect');
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('mqtt connected'));
    });

    test("Test 'publish' with expected topic, data and options ", () => {
        const logspy = jest.spyOn(Log, 'debug');
        const publishSpy = jest.spyOn(mockedMqttClientImpl, 'publish');
        mqttHandler.publish("topicPart", "someValue");
        expect(publishSpy).toHaveBeenCalledWith("wallbox/data/topicPart", "someValue", { "qos": 2, "retain": false });
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('mqtt - publish on topic - wallbox/data/topicPart someValue'));
    });

    test("Test 'publish' throws error if data is undefined", () => {
        expect(() => mqttHandler.publish("topicPart")).toThrow();
    });

    test("Test 'publish' not publishing if data is null", () => {
        const publishSpy = jest.spyOn(mockedMqttClientImpl, 'publish');
        mqttHandler.publish("topicPart", null);
        expect(publishSpy).not.toHaveBeenCalled();
    });

    test("Test 'subscribeTo' is called", () => {
        const subscribeSpy = jest.spyOn(mockedMqttClientImpl, 'subscribe');
        mqttHandler.subscribeTo("topic");
        expect(subscribeSpy).toHaveBeenCalledWith(expect.stringContaining("topic"));
    });

});