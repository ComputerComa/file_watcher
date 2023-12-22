var DEVELOP = false;
var chokidar = require("chokidar");
const config = require("./config.json")
let status = "startup"
//console.log(config)
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
function path_to_url(path){
  let base_url = "https://proscan.synapselabs.xyz/"
  let out_path_1 = path.split("\\")
  //log(out_path_1)
  let out_path_2 = out_path_1[out_path_1.length - 1]
  //log(out_path_2)
return base_url + out_path_2
}

function PushoverAlert(path){
log(path)
}

function Build_String(path){
  let parts = path.split("-")
}

function DiscordWebhook(path,event){
  if (event == "added") {
    let uri_path = path_to_url(path)
    hook.send(`New transmission recorded.\n Asccess it at ${uri_path}`)
  }
log("path")
}



function filter(path,event){
  log(`File Registered @ path ${path}`)
  if (status == "main"){
if (path.includes(".mp3")){
    if (path.includes("Thayer_EMS_Paging")){

    } else {
      DiscordWebhook(path,event)
    }
}}}

  


// More possible events.
watcher
  .on('add', path => filter(path,"added"))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('unlink', path => log(`File Deleted {${path}}`))
  .on('ready', () => {
  status = "main"
    log('Initial scan complete. Ready for changes')
  })





