class Packet {
    constructor(Data, Server, Remote, GUID) {
        this.Data = Data;
        this.Length = 0;
        this.ID = 0;

        if (this.Data[0] == 0x84) {
            this.Length = (this.Data[5] * 0x10 + this.Data[6]) / 8;//bits to bytes
            var RaknetID = this.Data[4];
            switch (RaknetID) {
                case 0x00:
                    this.ID = this.Data[7];
                    break;
                case 0x40:
                    this.ID = this.Data[10];
                    break;
                case 0x60:
                    this.ID = this.Data[14];
                    break;
            }
        }
        else {
            this.ID = this.Data[0];
        }

        this.Server = Server;
        this.Remote = Remote;
        this.GUID = GUID;
        this.MagicCode = Buffer.from([0x00,0xff, 0xff, 0x00, 0xfe, 0xfe, 0xfe, 0xfe, 0xfd, 0xfd, 0xfd, 0xfd, 0x12, 0x34, 0x56, 0x78]);
    }
    Encode() {

    }
    SendTo(server) {

    }
}
module.exports = Packet;