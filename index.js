const Server = require("./src/server");
const server = new Server("localhost", 19132);
server.LoadPlugins();
var Log = require("./src/logger");
server.on('listening', function() {
    Log.Info("Port: " + server.Options.Port + "\n");
    Log.Info("IP: " + server.Options.Host + "\n");
    Log.Info("The server has been started!\n");
    process.on('SIGINT', () => {
        Log.Info("Server Stoping..");
        process.exit(128);
    });
});
server.Start();