const fs = require('fs');
const config = require("./config.json");

// const configKeys = ["origin","assetsControl","firewallConfiguration","emailNotification","seoOptimization"];

const exceptions = ["proxyDomainAdvancedConfig"];

const isNotException = (key) => {
    return exceptions.indexOf(key) === -1;    
}

const hasChildObjects = (ob) => {
    let bool = false;
    for (key in ob) {
        const type = ob[key].constructor;
        type === Object || type === Array ? bool = true : bool; 
    }
    return bool;
}

const getAllKeys = (obj) => {
    const keys = Object.keys(obj);//.filter((item) => configKeys.indexOf(item) !== -1);//.map(item => obj[item]);
    
    const allKeys = {};
    const recurse = (obj, id) => {
        const keys = Object.keys(obj);
        keys.map((key) => {
            if(obj[key].constructor === Object && hasChildObjects(obj[key]) && isNotException(key)) {
                return recurse(obj[key], key);
            } else {
                if(key === 'status' || key === 'config') {
                    // console.log(id, key);
                    allKeys[`${id}-${key}`] = obj[key];
                } else {
                    if(key === 'status' || key === 'config') key = id.split('-').pop() + `-${key}`;
                    allKeys[key] = obj[key];
                }
            }
        });
    }

    keys.map((key) => {
        obj[key].constructor === String ? 
            allKeys[key] = obj[key] :        
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


