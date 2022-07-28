const config = require('config');
const RestClient = require('./restclient');
const MockAdapter = require("axios-mock-adapter");

const restClient = new RestClient(config);
const mock = new MockAdapter(restClient.getAxiosClientInstance());
const loginRequestBody = {
    username: config.get('wallbox.user'),
    password: config.get('wallbox.password')
};


describe("Rest Client testing", () => {
    test('Get Wallbox Data (with Login)', async () => {

        mock.onPost(restClient.getBaseUrl() + "/login", loginRequestBody).reply(200)
            .onGet(restClient.getBaseUrl() + "/prop?ids=2060_0,2056_0,2221_3,2221_4,2221_5,2221_A,2221_B,2221_C,2221_16,2201_0,2501_2,2221_22").reply(200)
            .onPost(restClient.getBaseUrl() + "/logout", {}).reply(200);

        await restClient.getWallboxData();
    });

    test('Set Wellbox Max Current (with Login)', async () => {

        const maxCurrent = 10;
        const maxCurrentRequestBody = {
            '2062_0': {'id': '2062_0', 'value': maxCurrent}
        }

        mock.onPost(restClient.getBaseUrl() + "/login", loginRequestBody).reply(200)
            .onPost(restClient.getBaseUrl() + "/prop", maxCurrentRequestBody).reply(200)
            .onPost(restClient.getBaseUrl() + "/logout", {}).reply(200);

        await restClient.setMaxCurrent(maxCurrent);
    });

});