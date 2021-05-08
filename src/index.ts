import dgram from 'dgram'
import net from 'net'
import Buffer from 'buffer'
const Package: any = require('../package.json');
const version: string = Package.version;
const server: dgram.Socket = dgram.createSocket('udp4');
const print: Function = ((chunk?: string) => process.stdout.write(chunk ? chunk : '\n'));
print(`BdsPp [${version}] Preparing to start the server.\n`);
let options: { port: number, host?: string };
if(process.argv.length < 2) throw new Error('A runtime argument is required.');
let runArgs: any = process.argv.slice(2)
  .join(' ')
  .match(/-p(\s+)?(?<port>\d{1,5})(\s+)((-h(\s+)?(?<host>\S+))?)?/i);
if(!runArgs) runArgs = { groups: {} };
runArgs = runArgs.groups;
if(Number(runArgs.port) !== Number(runArgs.port)) runArgs.port = 19132;
options = { port: Number(runArgs.port), host: runArgs.host ? runArgs.host : undefined };
print(`BdsPp [${version}] The port of the server is ${runArgs.port}.\n`);
print(`BdsPp [${version}] The address of the server is ${runArgs.host}.\n`);
server.on('message', (packet) => {
  
});

server.on('listening', () => {
  print(`BdsPp [${version}] The server has been started!\n`);
  print(`BdsPp [${version}] Port: ${server.address().port}\n`);
  print(`BdsPp [${version}] Port: ${server.address().address}\n`);
});

server.bind(options.port, options.host || '127.0.0.1');