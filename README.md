This project has some examples of how we can take the config file and get all the individual keys, post individual keys, and also dynamically generate all the addresses for the keys from the original config file itself. 

The code is not completed, it's WIP or POC. 

- `./getAddresses.js` dynamically generates all the addresses from the `config.json` file. The addresses are written to `./addresses.json` file as a JSON string.
- `./getAllKeys.js` gets all the individual unique keys in the `config.json` file and places them at the root level of the object. This makes it easier for getting individual key and value and rendering on the frontend components, without dealing with the object structure on the frontend.
- `./updateKey.js` takes one single key as input, and utilizes the `./addresses.json` file to get the address of that key, and then breaks the address down to generate the object structure that can be posted from the backend to update the database. 