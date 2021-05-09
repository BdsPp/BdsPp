(function() {
    var Package = require('../package.json');
    var version = Package.version;
    var print = (function(chunk) { return process.stdout.write(chunk ? chunk : '\n'); });
    var Log = function(Message) {
        print(`BdsPp [ ${version} ] ${Message}`);
    }
    module.exports = {
        Info: function(Message) {
            Log(Message);
        },
        Error: function(Message) {
            Log(`BdsPp [" + version + "] \u001b[31m${Message}\u001b[0m`);
        },
        Debug: function(Message) {
            Log(`\u001b[32m${Message}\u001b[0m`);
        }
    }
})();