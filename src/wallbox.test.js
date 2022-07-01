const WallboxData = require('./wallbox');

describe("Wallbox DAO testing", () => {
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
});