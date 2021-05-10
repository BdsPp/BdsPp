const fs = require('fs');
const util = require('../../util');
fs.readdirSync(__dirname).forEach(x => {
    if (x.endsWith('.js') && x !== 'index.js') {
        var func = require('./' + x);
        if (func && typeof func === 'function')
            module.exports[x.replace(/\.js$/, '')] = (packet) => func(packet, util);
    }
});