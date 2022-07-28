const config = require('config');
const MqttHandler = require('./mqtt');
const DataPublisher = require('./datapublisher');
const RestClient = require('./restclient');
const rest = new RestClient(config);
const Mqtt = require('mqtt');
const mqttHandler = new MqttHandler(config);
let publisher;

jest.mock('mqtt');
const mockedMqttClientImpl = {
    on(eventName, fnCallback) { },
    publish(topic, message, options) { }
}

Mqtt.connect.mockImplementation(() => {
    return mockedMqttClientImpl;
});

jest.mock('./restclient');

const dataFromWallbox = {
    "properties": [
        {
            "id": "2060_0",
            "value": 5569129173
        },
        {
            "id": "2056_0",
            "value": 18
        },
        {
            "id": "2221_3",
            "value": 231.2899932861328
        },
        {
            "id": "2221_4",
            "value": 232.47000122070312
        },
        {
            "id": "2221_5",
            "value": 232.09999084472656
        },
        {
            "id": "2221_A",
            "value": 0
        },
        {
            "id": "2221_B",
            "value": 0
        },
        {
            "id": "2221_C",
            "value": 0
        },
        {
            "id": "2221_16",
            "value": 0
        },
        {
            "id": "2201_0",
            "value": 31.875
        },
        {
            "id": "2501_2",
            "value": 4
        },
        {
            "id": "2221_22",
            "value": 344487
        }
    ]
}

const changedDataFromWallbox = {
    "properties": [
        {
            "id": "2060_0",
            "value": 5569129173
        },
        {
            "id": "2056_0",
            "value": 18
        },
        {
            "id": "2221_3",
            "value": 231.2899932861328
        },
        {
            "id": "2221_4",
            "value": 232.47000122070312
        },
        {
            "id": "2221_5",
            "value": 232.09999084472656
        },
        {
            "id": "2221_A",
            "value": 1
        },
        {
            "id": "2221_B",
            "value": 0
        },
        {
            "id": "2221_C",
            "value": 0
        },
        {
            "id": "2221_16",
            "value": 0
        },
        {
            "id": "2201_0",
            "value": 31.875
        },
        {
            "id": "2501_2",
            "value": 4
        },
        {
            "id": "2221_22",
            "value": 344488
        }
    ]
}

mqttHandler.connect();

describe("Data Publsiher testing", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        publisher = new DataPublisher(rest, mqttHandler);
    });

    test('Publish unchanged data only once', async () => {
        rest.getWallboxData.mockReturnValueOnce(dataFromWallbox)
            .mockReturnValueOnce(dataFromWallbox);
        const publishSpy = jest.spyOn(mockedMqttClientImpl, 'publish');
        await publisher.publishNewData();
        await publisher.publishNewData();
        expect(publishSpy.mock.calls.length).toBe(12);
    });


    test('Publish changed data twice', async () => {
        rest.getWallboxData.mockReturnValueOnce(dataFromWallbox)
            .mockReturnValueOnce(changedDataFromWallbox);
        const publishSpy = jest.spyOn(mockedMqttClientImpl, 'publish');
        await publisher.publishNewData();
        await publisher.publishNewData();
        expect(publishSpy.mock.calls.length).toBe(24);
    });

});
