const dgram = require("dgram");
const { EventEmitter } = require("events");
const Log = require("./logger");
const Util = require("./util");
const Packet = require("./packets/packet");
class Server extends EventEmitter {
    constructor(Host, Port, Logger = require("./logger")) {
        super();
        this.Server = dgram.createSocket('udp4');
        this.Options = {
            Host,
            Port
        };
        this.Server.on('listening', () => {
            this.emit('listening', this.Host, this.Port);
            this.reqs = {};
        });
        this.Server.on('message', function(buffer, remote) {
            this.handleMany(remote.address);
            var bytes = buffer.toJSON().data;
            var packet = new Packet(bytes[0], bytes.slice(1));
            OnPacket(this, packet, remote);
            this.emit("onPacket", packet, remote);
        });
        this.handleMany = ((ip) => {
            if(this.reqs[ip]){
                if(this.reqs[ip].rateLimited) return new Packet(0x15, 'Too Many Packets.(' + this.reqs[ip].value + ')');
                this.reqs[ip].value += 1;
                if(this.reqs[ip].value <= 100) {
                    this.reqs[ip].rateLimited = true;
                    setTimeout(() => {
                        this.reqs[ip].rateLimited = false;
                    },1000);
                };
            }else{
                this.reqs[ip] = { value: 1, rateLimited: false };
                setTimeout(() => {
                    this.reqs[ip] = { value: 0, rateLimited: false };
                },1000);
            };
        });
    }
    Start() {
        this.Server.bind(this.Options.Port, this.Options.Host);
    }
    Stop() {
        this.Server.close();
    }
}

function OnPacket(server, packet, remote) {
    if (packet.ID == 0x01) {
        var ServerIDStr = 'MCPE;testMOTD;431;1.16.221;0;10;12712847230353616219;Bedrock level;Survival;1;19132;19133;';
        var IDstrBuf = Util.StrtoBuf(ServerIDStr);
        const out = new Buffer.from([
            0x1c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xb0, 0x6d, 0x1b, 0x33, 0x51, 0x09, 0x2d,  
            0x5b, 0x00, 0xff, 0xff, 0x00, 0xfe, 0xfe, 0xfe, 0xfe, 0xfd, 0xfd, 0xfd, 0xfd, 0x12, 0x34, 0x56,  
            0x78,...Util.NumtoBuf(IDstrBuf.length,2),...IDstrBuf
        ]);
        server.send(out, remote.port, remote.address, (err) => {});
    }
}
module.exports = Server;
