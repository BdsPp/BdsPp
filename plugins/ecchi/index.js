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
        api.on('UnConnect', remote => {
            logger.Debug('ip: ' + remote.address + ' port: ' + remote.port);
        });
        setInterval(() => {
            api.fire('ecchi.15minuteEvent');
        }, (15 * 60) * 1000);
        //api.fire('ready'); /** This is a bad example of how it affects other plugins */
    },
    Version: '1.0.1'
}
