const fs = require('fs');
const addresses = require('./data/addresses.json')

const getKeyAddress = (key) => {
    const address = addresses[key];
    return address;
}

const updateKey = (updatedKey) => {
    let key = Object.keys(updatedKey)[0];
    // console.log(typeof key);
    
    const value = updatedKey[key];

    const address = getKeyAddress(key);

    const arr = address.split('-');
    // console.log(arr);
    let loopNo = 0;
    
    const postOb = {};

    if(key.split('-').pop() === "status") key = "status";
    
    const recurse = (ob) => {
        const currentKey = arr[loopNo];
        // console.log(currentKey, key);
        if(currentKey === key) {
            // ob[key] = value
            // console.log(ob);
            return ob[key] = value;
        } else {
            loopNo += 1;
            ob[currentKey] = {};
            // console.log(ob);
            return recurse(ob[currentKey]);;
        }   
    }

    recurse(postOb);
    
    const JSONdata = JSON.stringify(postOb);

    fs.writeFile('./data/postKeyOb.json', JSONdata, (err) => { 
        if(err) {
            console.error(err)
        } else {
            console.log("Key Update Object Posted!")
        }
    });
}

updateKey({'customClientConfiguration-status' : "enabled"});
