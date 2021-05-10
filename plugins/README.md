# Plugin documentation
 
 *** Note, this document absolutely requires that you can write JavaScript. ***
 
## Plug-in Structure and Handlers


You have 'ecchi' in your Plugins folder, right? That plugin is to help you understand the structure.

Now, let's get down to business.

Create a directory of any name in the Plugins directory.

Then, create index.js

Assign an object that looks like this to module.exports or exports

```js
 module.exports = {
     Handler: function(api, logger){
         
     },
     Version: '1.0.0'
 }
```

You can also isolate the Handler and write it like this

```js
 module.exports = {
     Handler,
     Version: '1.0.0'
 }
 function Handler(api, logger){
     
 }
```

### About Handler Arguments


First is 'api', which is an event emitter that can receive various events. (Details will be explained later).

Next, we have 'logger', which is an alternative to console.log. The reason why it's not console.log is that it doesn't know which plugins have logged.


The output format of the logger looks like this

```bash
 {PluginName} [ {Version} ] {Message}
```


Let's start with the api.

The api can receive various events and can also create new events.


Example of receiving an event (Motd acquisition event)
```js
 function Handler(api, logger){
     api.on('UnConnect', remote => {
         logger.Info(remote.address) // Acquirer's ip
         logger.Info(remote.port) // Port of the acquirer (sending to port 19132 doesn't make sense)
     })
 }
```

Custom events in api

```js
 function Handler(api, logger){
     api.emit('holy_event') // This is deprecated! Never use this if you want to fire an event externally!
     api.fire('holy_event') // This is also not very good. It is recommended to use a name such as 'myPlugin:holy_event' to avoid conflicts with other plugins.
     api.fire('ready') // Please don't do this by any means, it may cause errors in other plugins if you make it a PlayerJoin event or something. Do not fire the default event.
 }
```


The api timer


This is a replacement for setInterval, as you can see.

```js
 function Handler(api, logger){
     api.onTimer('15m', () => {
         logger.Info("It's been 15 minutes.")
     })
 }
```

There are different types of time: days, hours, minutes, seconds, and milliseconds (f). Units of time other than milliseconds are acronyms

## Currently implemented events and arguments

### __OnRawPacket

This event can receive raw packets. The argument is (RawPacket Buffer, remote).

### UnConnect

This event is to get the server's Motd.

The argument is 'remote'.

### ConnectionRequest

This event is a connection request to the server.

The argument is (remote, how many times to request)

### ready

It goes without saying. This event is the one that fires when the plugin is loaded. It has no arguments.