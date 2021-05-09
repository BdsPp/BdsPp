const dgram = require("dgram");
const { EventEmitter } = require("events");
const Log = require("./logger");
const Util = require("./util");
const Packet = require("./packets/packet");
const { join } = require('path');
const { existsSync, readdirSync, lstatSync } = require('fs');
class Server extends EventEmitter {
    constructor(Host, Port, Logger = require("./logger"), PluginPath = join(__dirname, '..', 'plugins')) {
        super();
        this.PluginPath = PluginPath;
        this.Logger = Logger;
        this.reqs = {};
        this.Server = dgram.createSocket('udp4');
        this.Options = {
            Host,
            Port
        };
        this.Server.on('listening', () => {
            this.emit('listening', this.Host, this.Port);
        });
        this.Server.on('message', function(buffer, remote) {
            handleMany(remote.address);
            var bytes = buffer.toJSON().data;
            var packet = new Packet(bytes[0], bytes.slice(1));
            OnPacket(this, packet, remote);
            this.emit("onPacket", packet, remote);
        });
    }
    Start() {
        this.Server.bind(this.Options.Port, this.Options.Host);
    }
    Stop() {
        this.Server.close();
    }
    handleMany(ip){
        if(!this.reqs) this.reqs = {};
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
    };
    LoadPlugins(){
        if(!existsSync(this.PluginPath)) return this.Logger.Error('Plugin Not Found\n');
        const plugins = readdirSync(this.PluginPath);
        let i = 0;
        plugins.forEach(plugin => {
            if(!lstatSync(this.PluginPath + '/' + plugin).isDirectory()) return;
            const files = readdirSync(this.PluginPath + '/' + plugin);
            if(!files.includes('index.js')) return;
            if(files.includes('disable')) return;
            const file = require(this.PluginPath + '/' + plugin + '/index.js');
            file.Handler(this.Handler);
            this.Logger.Info('Loaded ' + plugin + ' [' + (file.Version || '1.0.0') + ']\n');
            ++i;
        });
        this.Logger.Info('Loaded ' + i + ' Plugins.\n');
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
// unnntiiiiiwwww