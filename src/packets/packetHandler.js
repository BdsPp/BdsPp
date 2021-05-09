const { EventEmitter } = require("events");
const Util = require("../util");
const events = require('./events');
class PacketHandler extends EventEmitter {
    constructor() {
        super();

        return this;
    }
    handle(packet) {
        if (packet.Data[0] == 0x01) {
            events.Unconnect(packet);
            this.fire('UnConnect', packet.Remote);
        };
    }
    fire(...args){
        let eventName = args.shift();
        this.emit(eventName, ...args);
    }
};
module.exports = PacketHandler;