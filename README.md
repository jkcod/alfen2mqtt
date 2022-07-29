# alfen-to-mqtt

This project is heavily inspired by the following project: https://github.com/egnerfl/alfen_wallbox. All kudos goes to the author of it. 

This project is written in JavaScript with the aim of publishing the Wallbox data via MQTT to be further processed by any kind of 'Smart Home' system (in my case: Loxone).

Before running the script, adjust the `default.template.json` file in the config folder to your needs, and rename it to `default.json`.

Now, you can run the script with `node src/index.js`
