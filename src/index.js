
const WallboxData = require('./wallbox');
const RestClient = require('./restclient');
const config = require('config');

async function run() {
    try {
        const rest = new RestClient(config);
        const wbRawData = await rest.getWallboxData();
        const wbData = new WallboxData(wbRawData);

        console.log('Uptime: ' + wbData.getUpTime());
        console.log('Bootups: ' + wbData.getBootUps());
        console.log('Voltage L1: ' + wbData.getVoltagePhase1());
        console.log('Voltage L2: ' + wbData.getVoltagePhase2());
        console.log('Voltage L3: ' + wbData.getVoltagePhase3());
        console.log('Current L1: ' + wbData.getCurrentPhase1());
        console.log('Current L2: ' + wbData.getCurrentPhase2());
        console.log('Current L3: ' + wbData.getCurrentPhase3());
        console.log('Active Power Total: ' + wbData.getActivePowerTotal());
        console.log('Temperature: ' + wbData.getTemperature());
        console.log('Status: ' + wbData.getStatus());
        console.log('Meter Reading: ' + wbData.getMeterReading());
    } catch (e) {
        console.error('Error occured during retrieving Wallbox data. Error Message: ' + e.message);
    } finally {
        console.log('Reschedule in 20 seconds');
        setTimeout(() => {
            return run();
        }, 20 * 1000);

    }
}

run();
