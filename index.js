const Server = require("./src/server");
const server_1 = new Server("localhost", 19132);
var Log = require("./src/logger");
server_1.on('listening', function() {
    Log.Info("Port: " + server_1.Options.Port + "\n");
    Log.Info("IP: " + server_1.Options.Host + "\n");
    Log.Info("The server has been started!\n");
    process.on('SIGINT', () => {
        Log.Info("Server Stoping..");
        process.exit(128);
    });
});
server_1.Start();