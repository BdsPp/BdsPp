const events = require('./events');
const PluginAPI = require("../PluginAPI/api");
class PacketHandler extends PluginAPI {
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
};
module.exports = PacketHandler;