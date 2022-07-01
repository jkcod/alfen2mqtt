class WallboxData {
    constructor(rawData) {
        this.rawData = rawData;
        this.sensorMapping = {
            'uptime': '2060_0',
            'bootups': '2056_0',
            'voltage_l1': '2221_3',
            'voltage_l2': '2221_4',
            'voltage_l3': '2221_5',
            'current_l1': '2221_A',
            'current_l2': '2221_B',
            'current_l3': '2221_C',
            'active_power_total': '2221_16',
            'temperature': '2201_0',
            'status': '2501_2',
            'meter_reading': '2221_22'
        };
        this.statusMapping = {
            4: "Available",
            7: "Cable connected",
            10: "Vehicle connected",
            11: "Charging",
        };
    }

    getSensorValue(sensorName) {
        return this.rawData.properties.find(sensor => sensor.id === this.sensorMapping[sensorName]).value;
    }

    getUpTime() {
        return Number(this.getSensorValue('uptime'));
    }

    getBootUps() {
        return Number(this.getSensorValue('bootups'));
    }

    getCurrentPhase1() {
        return Number(this.getSensorValue('current_l1').toFixed(2));
    }

    getCurrentPhase2() {
        return Number(this.getSensorValue('current_l2').toFixed(2));
    }

    getCurrentPhase3() {
        return Number(this.getSensorValue('current_l3').toFixed(2));
    }

    getVoltagePhase1() {
        return Number(this.getSensorValue('voltage_l1').toFixed(2));
    }

    getVoltagePhase2() {
        return Number(this.getSensorValue('voltage_l2').toFixed(2));
    }

    getVoltagePhase3() {
        return Number(this.getSensorValue('voltage_l3').toFixed(2));
    }

    getActivePowerTotal() {
        return Number(this.getSensorValue('active_power_total').toFixed(2));
    }

    getTemperature() {
        return Number(this.getSensorValue('temperature').toFixed(2));
    }

    getStatusText() {
        return this.statusMapping[this.getSensorValue('status')] || "Unknown";
    }

    getStatusCode() {
        return Number(this.getSensorValue('status'));
    }

    getMeterReading() {
        return Number((this.getSensorValue('meter_reading') / 1000).toFixed(2));
    }
}

module.exports = WallboxData;