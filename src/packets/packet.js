class Packet {
    constructor(Data,Server,Remote) {
        this.Data = Data;
        this.Server = Server;
        this.Remote = Remote;
        this.MagicCode = Buffer.from([0xff, 0xff, 0x00, 0xfe, 0xfe, 0xfe, 0xfe, 0xfd, 0xfd, 0xfd, 0xfd, 0x12, 0x34, 0x56, 0x78]);
    }
    SendTo(server) {

    }
}
module.exports = Packet;