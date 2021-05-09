const { EventEmitter } = require("events");
const Util = require("../util");
const events = require('./events');
class PacketHandler extends EventEmitter {
    constructor() {
        super();

        return this;
    };
    handle(packet) {
        if (packet.Data[0] == 0x01) {
            var ServerIDStr = `MCPE;testMOTD;431;1.16.221;0;10;${packet.GUID};Bedrock level;Survival;1;19132;19133;`;
            var IDstrBuf = Util.StrtoBuf(ServerIDStr);
            const out = new Buffer.from([
                0x1c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xb0, 0x6d, 0x1b, 0x33, 0x51, 0x09, 0x2d,
                0x5b, ...packet.MagicCode, ...Util.NumtoBuf(IDstrBuf.length, 2), ...IDstrBuf
            ]);
            packet.Server.send(out, packet.Remote.port, packet.Remote.address, (err) => { });
        }
    };
};
module.exports = PacketHandler;