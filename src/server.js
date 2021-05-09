const dgram = require("dgram");
const { EventEmitter } = require("events");
const Log = require("./logger");
const PacketHandler = require("./packets/packetHandler");
const Util = require("./util");
//const Core = require("./core");
const Packet = require("./packets/packet");
const { join } = require('path');
const { existsSync, readdirSync, lstatSync } = require('fs');

var _Handler;

class Server extends EventEmitter {
    constructor(Host, Port, Logger = require("./logger"), PluginPath = join(__dirname, '..', 'plugins')) {
        super();

        //this.Handler = 10;
        this.Handler = new PacketHandler();
        _Handler = this.Handler;

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
            //this.HandleMany(remote.address);
            var bytes = buffer.toJSON().data;
            var packet = new Packet(bytes, this, remote);
            OnPacket(this, packet, remote, _Handler);
            this.emit("onPacket", packet, remote);
        });
    }
    Start() {
        this.Server.bind(this.Options.Port, this.Options.Host);
    }
    Stop() {
        this.Server.close();
    }
    LoadPlugins() {
        if (!existsSync(this.PluginPath)) return this.Logger.Error('Plugin Not Found\n');
        const plugins = readdirSync(this.PluginPath);
        let i = 0;
        plugins.forEach(plugin => {
            if (!lstatSync(this.PluginPath + '/' + plugin).isDirectory()) return;
            const files = readdirSync(this.PluginPath + '/' + plugin);
            if (!files.includes('index.js')) return;
            if (files.includes('disable')) return;
            const file = require(this.PluginPath + '/' + plugin + '/index.js');
            var print = (function(chunk) { return process.stdout.write(chunk ? chunk : '\n'); });
            var PluginLog = function(Message) {
                print(`${plugin} [ ${file.Version} ] ${Message}\n`);
            }
            var PluginLogger = {
                Info: function(Message) {
                    PluginLog(Message);
                },
                Error: function(Message) {
                    PluginLog(`\u001b[31m${Message}\u001b[0m`);
                },
                Debug: function(Message) {
                    PluginLog(`\u001b[32m${Message}\u001b[0m`);
                }
            }
            file.Handler(this.Handler, PluginLogger);
            this.Logger.Info('Loaded ' + plugin + ' [' + (file.Version || '1.0.0') + ']\n');
            ++i;
        });
        this.Logger.Info('Loaded ' + i + ' Plugins.\n');
        this.Handler.emit('ready');
    }
}

function OnPacket(server, packet, remote, handler) {
    handler.handle(packet);
    /*if (packet.Data[0] == 0x01) {
        var ServerIDStr = 'MCPE;testMOTD;431;1.16.221;0;10;12712847230353616219;Bedrock level;Survival;1;19132;19133;';
        var IDstrBuf = Util.StrtoBuf(ServerIDStr);
        const out = new Buffer.from([
            0x1c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xb0, 0x6d, 0x1b, 0x33, 0x51, 0x09, 0x2d,
            0x5b, 0x00, 0xff, 0xff, 0x00, 0xfe, 0xfe, 0xfe, 0xfe, 0xfd, 0xfd, 0xfd, 0xfd, 0x12, 0x34, 0x56,
            0x78, ...Util.NumtoBuf(IDstrBuf.length, 2), ...IDstrBuf
        ]);
        server.send(out, remote.port, remote.address, (err) => {});
    } else {
        handler.handle(packet);
        //console.log(handler);
    }*/
}

module.exports = Server;