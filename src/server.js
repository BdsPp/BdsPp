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
            OnPacket(packet, _Handler);
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

function OnPacket(packet,handler) {
    handler.handle(packet);
}

module.exports = Server;