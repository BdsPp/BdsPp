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
        // api.emit('ready'); /** The emit mesot may only work within a handler function. Do not use this method if you want to interact with an external one, as it may not work. */
        
        // api.fire('ready'); /** Firing original events such as the ready event is deprecated because it may affect other plugins. */
        
        // api.fire('test'); /** It is strongly recommended that you use a name format such as 'echi.test' to avoid name confusion with other plugins. */
    },
    Version: '1.0.1'
}