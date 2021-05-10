const { EventEmitter } = require("events");
const Util = require("../util");
const events = require('./events');
const parsePeriod = require("../periodParser");
class PacketHandler extends EventEmitter {
    constructor() {
        super();
        this._timers = {};
        this._timercallbacks = {};
        return this;
    }
    onTimer(Interval, Callback) {
        var interval = parsePeriod(Interval);
        if (!this._timers[interval]) {
            this._timercallbacks[interval] = [Callback];
            this._timers[interval] = setInterval(() => {
                this._timercallbacks[interval].forEach(x => x());
            }, interval);
        } else {
            this._timercallbacks[interval].push(Callback);
        }
    }
    clearTimer(interval) {
        delete this._timers[interval];
        delete this._timercallbacks[interval];
    }
    handle(packet) {
        if (packet.Data[0] == 0x01) {
            events.Unconnect(packet);
            this.fire('UnConnect', packet.Remote);
        };
    }
    fire(...args) {
        let eventName = args.shift();
        this.emit(eventName, ...args);
    }
};
module.exports = PacketHandler;