
const Logger = require('./logger');
const RestClient = require('./restclient');
const config = require('config');

async function run() {
    try {
        await new Logger(new RestClient(config)).logWallboxData();
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
