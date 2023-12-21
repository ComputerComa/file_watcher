var DEVELOP = true;
var chokidar = require("chokidar");
const config = require("./config.json")
console.log(config)
var Push = require( 'pushover-notifications' )
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook(config["discord-webhook-url"]);
const log = console.log.bind(console);

if (DEVELOP) {
  var watcher = chokidar.watch("C:/Proscan_Files/**/*.mp3", {
    ignored: /^\./,
    persistent: true,
    awaitWriteFinish: true,
  });
} else {
  var watcher = chokidar.watch("G:/Proscan_Files/**/*.mp3", {
    ignored: /^\./,
    persistent: true,
    awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
      },
  });
}

function PushoverAlert(path){
log(path)
}

function DiscordWebhook(path){
log("path")
}


function filter(path,event){
if (path.includes(".mp3")){
    if (path.includes("Thayer")){
        if (path.includes(""))
    log(`File ${path} has been ${event}. With high prirotiy.`)
    } else {

    }
}
}

watcher
  .on('add', path => filter(path,"added"))
  .on('change', path => filter(path,"changed"))
  .on('unlink', path => filter(path,"deleted"));

// More possible events.
watcher
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'))
  .on('raw', (event, path, details) => { // internal
    log('Raw event info:', event, path, details);
  });




