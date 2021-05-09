const { EventEmitter } = require("events");

class PacketHandler extends EventEmitter {
    constructor() {
        super();
    };
    handle(packet) {

    };
};
module.exports = PacketHandler;