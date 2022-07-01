const WallboxData = require('./wallbox');

describe("Wallbox DAO testing", () => {
    test('Get uptime', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2060_0",
                    "value": 13423
                }
            ]
        };
        expect(new WallboxData(rawData).getUpTime()).toBe(13423);
    });

    test('Get voltage L1', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2221_3",
                    "value": 223.1256
                }
            ]
        };
        expect(new WallboxData(rawData).getVoltagePhase1()).toBe(223.13);
    });

    test('Get voltage L2', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2221_4",
                    "value": 223.1356
                }
            ]
        };
        expect(new WallboxData(rawData).getVoltagePhase2()).toBe(223.14);
    });

    test('Get voltage L3', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2221_5",
                    "value": 223.1456
                }
            ]
        };
        expect(new WallboxData(rawData).getVoltagePhase3()).toBe(223.15);
    });

    test('Get number of bootups', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2056_0",
                    "value": 18
                }
            ]
        };
        expect(new WallboxData(rawData).getBootUps()).toBe(18);
    });

    test('Get active power total', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2221_16",
                    "value": 123.456
                }
            ]
        };
        expect(new WallboxData(rawData).getActivePowerTotal()).toBe(123.46);
    });

    test('Get current L1', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2221_A",
                    "value": 12.456
                }
            ]
        };
        expect(new WallboxData(rawData).getCurrentPhase1()).toBe(12.46);
    });

    test('Get current L2', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2221_B",
                    "value": 12.556
                }
            ]
        };
        expect(new WallboxData(rawData).getCurrentPhase2()).toBe(12.56);
    });

    test('Get current L3', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2221_C",
                    "value": 12.656
                }
            ]
        };
        expect(new WallboxData(rawData).getCurrentPhase3()).toBe(12.66);
    });

    test('Get temperature', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2201_0",
                    "value": 31.656
                }
            ]
        };
        expect(new WallboxData(rawData).getTemperature()).toBe(31.66);
    });

    test('Get meter reading', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2221_22",
                    "value": 235.656
                }
            ]
        };
        expect(new WallboxData(rawData).getMeterReading()).toBe(0.24);
    });

    test('Get status as text (Available)', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2501_2",
                    "value": 4
                }
            ]
        };
        expect(new WallboxData(rawData).getStatusText()).toBe("Available");
    });

    test('Get status as text (Cable connected)', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2501_2",
                    "value": 7
                }
            ]
        };
        expect(new WallboxData(rawData).getStatusText()).toBe("Cable connected");
    });

    test('Get status as text (Vehicle connected)', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2501_2",
                    "value": 10
                }
            ]
        };
        expect(new WallboxData(rawData).getStatusText()).toBe("Vehicle connected");
    });

    test('Get status as text (Charging)', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2501_2",
                    "value": 11
                }
            ]
        };
        expect(new WallboxData(rawData).getStatusText()).toBe("Charging");
    });

    test('Get status as text (Unknown)', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2501_2",
                    "value": 1 // not a known status code
                }
            ]
        };
        expect(new WallboxData(rawData).getStatusText()).toBe("Unknown");
    });

    test('Get status code', () => {
        const rawData = {
            "properties": [
                {
                    "id": "2501_2",
                    "value": 4
                }
            ]
        };
        expect(new WallboxData(rawData).getStatusCode()).toBe(4);
    });
});