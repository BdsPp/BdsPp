(function () {
    const core = require('../build/Release/Core')
    module.exports = {
        PacketHandler: function (Packet) {
            const ans1 = core.packet(Packet.ID, Packet.Data);
            if (ans1 != false) {
                console.log(ans1)
            }
        }
    }
})();