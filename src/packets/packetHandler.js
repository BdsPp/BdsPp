const events = require('./events');
const PluginAPI = require("../PluginAPI/api");
const { EventEmitter } = require('../PluginAPI/api');
class PacketHandler extends PluginAPI {
    constructor() {
        super();
        this.Packet = new EventEmitter();
        return this;
    }
    handle(packet) {
        this.Packet.emit(packet.Data[0], packet);
        if (packet.Data[0] == 0x01) {
            events.Unconnect(packet);
            this.fire('UnConnect', packet.Remote);
        };
    }
};
module.exports = PacketHandler;