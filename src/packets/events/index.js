const Util = require('../../util');
const fs = require('fs');
let events = fs.readdirSync(__dirname);
let eventsName = [...events];
eventsName = eventsName.map(x => x.replace(/\.js$/,''));
eventsName.splice(events.indexOf('index'));
events = events.map(x => {
    if(x.endsWith('.js') && x !== 'index.js') return require('./' + x);
    else return void 0;
})
    .filter(x => !!x)
    .map(x => {
        return ((packet) => {
            x(packet, Util);
        });
    });
eventsName.forEach((v, i) => {
    module.exports[v] = events[i];
});