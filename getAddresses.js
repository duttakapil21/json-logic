const fs = require('fs');
const config = require("./config.json");

const configKeys = ["origin","assetsControl","firewallConfiguration","emailNotification","seoOptimization"];

const hasChildObjects = (ob) => {
    let bool = false;
    for (key in ob) {
        const type = ob[key].constructor;
        type === Object || type === Array ? bool = true : bool; 
    }
    return bool;
}

const getAddress = (obj) => {
    const keys = Object.keys(obj).filter((item) => configKeys.indexOf(item) !== -1);//.map(item => obj[item]);
    
    const addresses = {};
    const recurse = (obj, id) => {
        const keys = Object.keys(obj);
        keys.map((key) => {
            const address = `${id}-${key}`;
            if(obj[key].constructor === Object && hasChildObjects(obj[key])) {
                return recurse(obj[key], address);
            } else {
                const type = String(typeof obj[key]).toLowerCase();
                if(key === 'status') key = id.split('-').pop() + `-${key}`;
                addresses[key] = `${address}-${type}`;
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

fs.writeFile('./data/addresses.json', JSONdata, (err) => { 
    if(err) {
        console.error(err)
    } else {
        console.log("Addresses Created!")
    }
});


