const fs = require('fs');
const config = require("./config.json");

const configKeys = ["origin","assetsControl","firewallConfiguration","emailNotification","seoOptimization"];

const getAllKeys = (obj) => {
    const keys = Object.keys(obj).filter((item) => configKeys.indexOf(item) !== -1);//.map(item => obj[item]);
    
    const allKeys = {};
    const recurse = (obj, id) => {
        const keys = Object.keys(obj);
        keys.map((key) => {
            if(obj[key].constructor === Object) {
                return recurse(obj[key], key);
            } else {
                if(key === 'status') {
                    allKeys[`${id}-${key}`] = obj[key];
                } else {
                    allKeys[key] = obj[key];
                }
            }
        });
    }

    keys.map((key) => {
        recurse(obj[key], key);
    });

    return allKeys;
}

const data = getAllKeys(config);

// console.log(typeof data);

const JSONdata = JSON.stringify(data);

fs.writeFile('./data/allkeys.json', JSONdata, (err) => { 
    if(err) {
        console.error(err)
    } else {
        console.log("All Keys Created!")
    }
});


