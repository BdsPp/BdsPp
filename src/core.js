(function () {
    const core = require('../build/Release/Core')
    module.exports = {
        PacketHandler: function (buffer) {
            const ans1 = core.packet(Buffer.from([10, 2, 3, 10, 20, 3, 210, 2]));
            console.log(ans1)
        }
    }
})();