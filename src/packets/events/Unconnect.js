module.exports = function (packet, Util) {
    var ServerIDStr = `MCPE;H;431;114.514.931;0;10;${packet.GUID};Bedrock level;Survival;1;19132;19133;`;
    var IDstrBuf = Util.StrtoBuf(ServerIDStr);
    const GUIDbuf = Buffer.allocUnsafe(8);
    GUIDbuf.writeBigUInt64LE(BigInt(packet.GUID), 0);
    const out = new Buffer.from([
        0x1c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, ...GUIDbuf, ...packet.MagicCode, ...Util.NumtoBuf(IDstrBuf.length, 2), ...IDstrBuf
    ]);
    packet.Server.send(out, packet.Remote.port, packet.Remote.address, (err) => { });
};