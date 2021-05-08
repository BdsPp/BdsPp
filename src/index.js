"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dgram_1 = __importDefault(require("dgram"));
var Package = require('../package.json');
var version = Package.version;
var server = dgram_1.default.createSocket('udp4');
var print = (function (chunk) { return process.stdout.write(chunk ? chunk : '\n'); });
print("BdsPp [" + version + "] Preparing to start the server.\n");
var options;
if (process.argv.length < 2)
    throw new Error('A runtime argument is required.');
var runArgs = process.argv.slice(2)
    .join(' ')
    .match(/-p(\s+)?(?<port>\d{1,5})((-h(\s+)?(?<host>\S+))?)?/i);
if (!runArgs)
    runArgs = { groups: {} };
runArgs = runArgs.groups;
if (Number(runArgs.port) !== Number(runArgs.port))
    runArgs.port = 19132;
options = { port: Number(runArgs.port), host: runArgs.host ? runArgs.host : undefined };
print("BdsPp [" + version + "] The port of the server is " + runArgs.port + ".\n");
print("BdsPp [" + version + "] The address of the server is " + runArgs.host + ".\n");
server.on('message', function (packet) {
});
server.on('listening', function () {
    print("BdsPp [" + version + "] The server has been started!\n");
    print("BdsPp [" + version + "] Port: " + server.address().port + "\n");
    print("BdsPp [" + version + "] Port: " + server.address().address + "\n");
});
server.bind(options.port, options.host || '127.0.0.1');
