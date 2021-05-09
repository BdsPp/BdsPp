class Packet {
    constructor(Data,Server,Remote,GUID) {
        this.Data = Data;
        this.Server = Server;
        this.Remote = Remote;
        this.GUID = GUID;
        this.MagicCode = Buffer.from([0x00,0xff, 0xff, 0x00, 0xfe, 0xfe, 0xfe, 0xfe, 0xfd, 0xfd, 0xfd, 0xfd, 0x12, 0x34, 0x56, 0x78]);
    }
    SendTo(server) {

    }
}
module.exports = Packet;