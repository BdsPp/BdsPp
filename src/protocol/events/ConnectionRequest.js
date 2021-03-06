module.exports = function (packet, Util) {

    switch (packet.ID) {
        case 0x05:
            var GUIDbuf = Buffer.allocUnsafe(8);
            GUIDbuf.writeBigUInt64LE(BigInt(packet.GUID), 0);
            var out = Buffer.from([0x06, ...packet.MagicCode, ...GUIDbuf, 0x0, 0x05, 0x78]);
            packet.Server.send(out, packet.Remote.port, packet.Remote.address, (err) => { });
            break;
        case 0x07:
            var GUIDbuf = Buffer.allocUnsafe(8);
            GUIDbuf.writeBigUInt64LE(BigInt(packet.GUID), 0);
            var ip = packet.Remote.address.split('.').map(str => 0xFF - parseInt(str, 10));
            var out = Buffer.from([0x08, ...packet.MagicCode, ...GUIDbuf, 0x4, ...ip, ...Util.NumtoBuf(packet.Remote.port, 2), 0x05, 0x78, 0x00]);
            packet.Server.send(out, packet.Remote.port, packet.Remote.address, (err) => { });
            break;
        case 0x09:
            console.log("lol");
            break;
    }
};