const WallboxLogger = require('./wallboxlogger');
const RestClient = require("./restclient");
const Log = require("./logger");

jest.mock('./restclient', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getWallboxData: async () => {
                return {
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
            }
        };
    });
});

let RestClientMock = new RestClient();

describe('Wallbox logging', () => {
    test('Log Wallbox Data', async () => {
        const logspy = jest.spyOn(Log, 'info');
        const wbRawData = await RestClientMock.getWallboxData();
        const logger = new WallboxLogger();
        await logger.logWallboxData(wbRawData);
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Uptime: 5569129173'));
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Bootups: 18'));
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Voltage L1: 231.29'));
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Voltage L2: 232.47'));
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Voltage L3: 232.1'));
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Current L1: 0'));
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Current L2: 0'));
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Current L3: 0'));
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Active Power Total: 0'));
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Temperature: 31.88'));
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Status Code: 4'));
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Status: Available'));
        expect(logspy).toHaveBeenCalledWith(expect.stringContaining('Meter Reading: 344.49'));
    });
});