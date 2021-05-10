module.exports = {
    Handler: function(api, logger) {
        api.on('PlayerJoin', (data, remote) => {
            logger.Info('Yeah');
        });
        api.on('ready', () => {
            logger.Info('ready!');
            logger.Error('ready!');
            logger.Debug('ready!');
        });
        api.on('UnConnect', remote => {
            logger.Debug('ip: ' + remote.address + ' port: ' + remote.port);
        });
    },
    Version: '1.0.1'
}