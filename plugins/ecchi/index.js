module.exports = {
    Handler: function(api, logger){
        api.on('PlayerJoin', (data, remote) => { // feature api example.
            logger.Info('Yeah'); 
        });
        api.on('ready', () => {
            logger.Info('ready!');
            logger.Error('ready!');
            logger.Debug('ready!');
        });
    },
    Version: '114.514.931'
}