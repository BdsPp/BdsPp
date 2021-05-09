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
            api.fire('ecchi.15minuteEvent');
        }, (15 * 60) * 1000);
        //api.fire('ready'); /** This is a bad example of how it affects other plugins */
    },
    Version: '1.0.1'
}
