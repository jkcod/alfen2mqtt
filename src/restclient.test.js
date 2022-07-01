const config = require('config');
const RestClient = require('./restclient');
const MockAdapter = require("axios-mock-adapter");

describe("Rest Client testing", () => {
    test('Get Wellbox Data (with Login)', async () => {
        const restClient = new RestClient(config);
        const mock = new MockAdapter(restClient.getAxiosClientInstance());
        const requestBody = {
            username: config.get('wallbox.user'),
            password: config.get('wallbox.password')
        };
        mock.onPost(restClient.getBaseUrl() + "/login", requestBody).reply(200).onGet(restClient.getBaseUrl() + "/prop?ids=2060_0,2056_0,2221_3,2221_4,2221_5,2221_A,2221_B,2221_C,2221_16,2201_0,2501_2,2221_22", requestBody).reply(200);
        await restClient.getWallboxData();
    });

});