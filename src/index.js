const config = require('config');
const Runner = require('./runner');

const runner = new Runner(config);
runner.start();
