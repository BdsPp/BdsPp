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
        this.Packet.emit("*", packet);
        if (packet.Data[0] == 0x01) {
            events.Unconnect(packet);
            this.fire('UnConnect', packet.Remote);
        }
        else if (packet.Data[0] == 0x05 || packet.Data[0] == 0x07) {
            events.ConnectionRequest(packet);
            this.fire('ConnectionRequest', packet.Remote, (packet.Data[0] - 3) /2);
        }
        else if (packet.Data[0] == 0x84) {
            if (packet.Data[10] == 0x9) {
                events.ConnectionRequest(packet);
                this.fire('ConnectionRequest', packet.Remote, 3);
            }
        }
    }

};
module.exports = PacketHandler;