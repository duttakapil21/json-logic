const addresses = require('./addresses.json')

const getKeyAddress = (key) => {
    const address = addresses[key];
    return address;
}

const updateKey = (updatedKey) => {
    const key = Object.keys(updatedKey)[0];
    const value = updatedKey[key];

    const address = getKeyAddress(key);

    const arr = address.split('-');
    
    let loopNo = 0;
    
    const postOb = {};
        
    const recurse = (ob) => {
        const currentKey = arr[loopNo];
        if(currentKey === key) {
            return ob[key] = value;
        } else {
            loopNo += 1;
            ob[currentKey] = {};
            return recurse(ob[currentKey]);
        }   
    }

    recurse(postOb);
    console.log(postOb);
}

updateKey({'minifyStaticAssets' : true});
