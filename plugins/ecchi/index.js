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
        setInterval(() => {
            api.emit('MyCustom15minuteEvent'); // Custom Events
        }, (15 * 60) * 1000);
    },
    Version: '1.0.1'
}
