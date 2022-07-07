
const WallboxLogger = require('./wallboxlogger');
const RestClient = require('./restclient');
const Log = require('./logger');
const config = require('config');

async function run() {
    try {
        const wbRawData = await new RestClient(config).getWallboxData();
        await new WallboxLogger().logWallboxData(wbRawData);
    } catch (e) {
        Log.error('Error occured during retrieving Wallbox data. Error Message: ' + e.message);
    } finally {
        Log.info('Reschedule in 20 seconds');
        setTimeout(() => {
            return run();
        }, 20 * 1000);
    }
}

run();
