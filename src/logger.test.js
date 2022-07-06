const Logger = require('./logger');
const RestClient = require("./restclient");

jest.mock('./restclient', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getWallboxData: async () => {
                return {
                    "version": 2,
                    "properties": [
                        {
                            "id": "2060_0",
                            "access": 1,
                            "type": 27,
                            "len": 0,
                            "cat": "generic",
                            "value": 5569129173
                        },
                        {
                            "id": "2056_0",
                            "access": 1,
                            "type": 7,
                            "len": 0,
                            "cat": "generic",
                            "value": 18
                        },
                        {
                            "id": "2221_3",
                            "access": 1,
                            "type": 8,
                            "len": 0,
                            "cat": "meter1",
                            "value": 231.2899932861328
                        },
                        {
                            "id": "2221_4",
                            "access": 1,
                            "type": 8,
                            "len": 0,
                            "cat": "meter1",
                            "value": 232.47000122070312
                        },
                        {
                            "id": "2221_5",
                            "access": 1,
                            "type": 8,
                            "len": 0,
                            "cat": "meter1",
                            "value": 232.09999084472656
                        },
                        {
                            "id": "2221_A",
                            "access": 1,
                            "type": 8,
                            "len": 0,
                            "cat": "meter1",
                            "value": 0
                        },
                        {
                            "id": "2221_B",
                            "access": 1,
                            "type": 8,
                            "len": 0,
                            "cat": "meter1",
                            "value": 0
                        },
                        {
                            "id": "2221_C",
                            "access": 1,
                            "type": 8,
                            "len": 0,
                            "cat": "meter1",
                            "value": 0
                        },
                        {
                            "id": "2221_16",
                            "access": 1,
                            "type": 8,
                            "len": 0,
                            "cat": "meter1",
                            "value": 0
                        },
                        {
                            "id": "2201_0",
                            "access": 1,
                            "type": 8,
                            "len": 0,
                            "cat": "temp",
                            "value": 31.875
                        },
                        {
                            "id": "2501_2",
                            "access": 1,
                            "type": 2,
                            "len": 0,
                            "cat": "states",
                            "value": 4
                        },
                        {
                            "id": "2221_22",
                            "access": 1,
                            "type": 8,
                            "len": 0,
                            "cat": "meter1",
                            "value": 344487
                        }
                    ],
                    "offset": 0,
                    "total": 12
                }
            }
        };
    });
});

let RestClientMock = new RestClient();

describe("Wallbox logging", () => {
    test('Log Wellbox Data', async () => {
        const logger = new Logger(RestClientMock);

        await logger.logWallboxData();
    });

});