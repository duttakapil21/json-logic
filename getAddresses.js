const fs = require('fs');
const config = require("./config.json");

const configKeys = ["origin","assetsControl","firewallConfiguration","emailNotification","seoOptimization"];

const getAddress = (obj) => {
    const keys = Object.keys(obj).filter((item) => configKeys.indexOf(item) !== -1);//.map(item => obj[item]);
    
    const addresses = {};
    const recurse = (obj, id) => {
        const keys = Object.keys(obj);
        keys.map((key) => {
            const address = `${id}-${key}`;
            if(obj[key].constructor === Object) {
                return recurse(obj[key], address);
            } else {
                if(key === 'status') key = id.split('-').pop() + `-${key}`;
                addresses[key] = address;
            }
        });
        return addresses;
    }

    keys.map((key) => {
        recurse(obj[key], key);
    });

    return addresses;
}

const data = getAddress(config);

const JSONdata = JSON.stringify(data);

fs.writeFile('./addresses.json', JSONdata, (err) => { 
    if(err) {
        console.error(err)
    } else {
        console.log("Addresses Created!")
    }
});


