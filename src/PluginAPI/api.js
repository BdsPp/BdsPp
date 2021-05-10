const { EventEmitter } = require("events");
const parsePeriod = require("../periodParser");
class PluginAPI extends EventEmitter {
    constructor() {
        super();
        this._timers = {};
        this._timercallbacks = {};
        this.Server = null;
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
    fire(...args) {
        let eventName = args.shift();
        this.emit(eventName, ...args);
        this.emit("*", ...args);
    }
}
module.exports = PluginAPI;