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

        switch (packet.ID) {
            case 0x01:
                events.Unconnect(packet);
                this.fire('UnConnect', packet.Remote);
                break;
            case 0x05:
                events.ConnectionRequest(packet);
                this.fire('ConnectionRequest', packet.Remote);
                break;
            case 0x07:
                events.ConnectionRequest(packet);
                this.fire('ConnectionRequest', packet.Remote);
                break;
            case 0x09:
                events.ConnectionRequest(packet);
                this.fire('ConnectionRequest', packet.Remote);
                break;
            case 0x013:
                events.ConnectionRequest(packet);
                this.fire('ConnectionRequest', packet.Remote);
                break;
            case 0xc0:
                events.ConnectionRequest(packet);
                this.fire('ConnectionRequest', packet.Remote);
                break;
        }
    }

};
module.exports = PacketHandler;