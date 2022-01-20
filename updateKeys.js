const fs = require('fs');
const addresses = require('./data/addresses.json');
const allKeys = require('./data/allkeys.json');

const getKeyAddress = (key) => {
    const address = addresses[key];
    return address;
}

const updateKeys = (keys) => {
    const configOb = {};
    Object.keys(keys).map(key => {
        const value = keys[key];
        const address = getKeyAddress(key);
        // console.log(address);
        const arr = address.split('-');
        let loopNo = 0;
        
        if(key.split('-').pop() === "status") key = "status";
        if(key.split('-').pop() === "config") key = "config";
    
        const recurse = (ob) => {
            // console.log(key);
            const currentKey = arr[loopNo];
            // console.log(configOb);
            if(currentKey === key) {
                return ob[key] = value;
            } else {
                loopNo += 1;
                ob[currentKey] = ob[currentKey] || {};
                return recurse(ob[currentKey])
            }   
        }

        recurse(configOb);
    });
    const JSONdata = JSON.stringify(configOb);

    fs.writeFile('./data/postConfigOb.json', JSONdata, (err) => { 
        if(err) {
            console.error(err)
        } else {
            console.log("Config Update Object Posted!")
        }
    });
}

// updateKeys({
//     "illegalFileTypeRegex": ".(bat|dll|bak|cgi|com|ini)$",
//     "illegalFileTypeRegexOptions": "i",
//     'whitelistedCountryCodes' : ["HK", "IN", "US", "LK", "GB", "AU"],
//     "requestMethodIdentifier": ["GET", "POST"],
//     "staticAssetIdentifierRegex": ".(css|svgz|csv|mid|swf|doc|midi|ppt|pptx|gz).*|^/blog/.*|^/blog$|^/kitextproxy*",
// });

updateKeys(allKeys);