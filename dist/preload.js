"use strict";var electron=require("electron"),Module=require("module"),path=require("path"),fs=require("fs");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var Module__default=_interopDefaultLegacy(Module),path__default=_interopDefaultLegacy(path),fs__default=_interopDefaultLegacy(fs);const MAIN_EVENT="pccompat-main-event",COMPILE_SASS="pccompat-compile-sass",GET_APP_PATH="pccompat-get-app-path",SET_DEV_TOOLS="pccompat-open-devtools",GET_WINDOW_DATA="pccompat-get-window-data",EXPOSE_PROCESS_GLOBAL="pccompat-expose-process-global",HANDLE_CALLBACK="pccompat-handle-callback",createIPC=function(){const o={},n={on(e,t){return o[e]||(o[e]=new Set),o[e].add(t),n.off.bind(null,e,t)},off(e,t){o[e]&&o[e].delete(t)},once(e,t){const a=n.on(e,(...e)=>(a(),t(...e)))},dispatch(e,...t){if(o[e])for(const a of o[e])try{a(...t)}catch(e){console.error(e)}},sendMain(e,...t){return electron.ipcRenderer.sendSync(MAIN_EVENT,e,...t)},emit(e,...t){return n.dispatch(e,...t)}};return{IPC:n,events:o}};function getKeys(e){const t=[];for(const a in e)t.push(a);return t}function cloneObject(a,e={},t){return(t=!Array.isArray(t)?getKeys(a):t).reduce((e,t)=>("object"!=typeof a[t]||Array.isArray(a[t])||null===a[t]?"function"==typeof a[t]?e[t]=a[t].bind(a):e[t]=a[t]:e[t]=cloneObject(a[t],{}),e),e)}function handleSplash(d){var e=electron.ipcRenderer.sendSync(GET_WINDOW_DATA)["windowOptions"];e.webPreferences.nativeWindowOpen||(Module__default.default._extensions[".scss"]=(e,t)=>{t=electron.ipcRenderer.sendSync(COMPILE_SASS,t);return e.filecontent=t,e.exports=t},Module__default.default._extensions[".css"]=(e,t)=>{t=fs__default.default.readFileSync(t,"utf8");return e.filecontent=t,e.exports=t,e.exports},window.onload=()=>{let e={};try{var t=path__default.default.resolve(d.getBasePath(),"config","themes.json");fs__default.default.existsSync(t)&&(e=JSON.parse(fs__default.default.readFileSync(t,{encoding:"utf-8"})))}catch(e){console.error("Couldn't read theme settings file, is it corrupt?",e)}for(var[a,o]of Object.entries(e))if(o)try{var n=path__default.default.resolve(d.getBasePath(),"themes",a),r=path__default.default.resolve(n,"powercord_manifest.json"),c=JSON.parse(fs__default.default.readFileSync(r,{encoding:"utf-8"}));if(!c?.splashTheme)continue;const s=require(path__default.default.resolve(n,c.splashTheme)),l=document.createElement("style");l.id=a,l.innerHTML=s,document.head.appendChild(l)}catch(e){console.error("Couldn't initialize "+a,e)}})}const callbacks=new Map,{IPC:IPC$1}=createIPC(),Process=cloneObject(process),initializeCallbacks=function(t){callbacks.set(t,new Set),process.on(t,(...e)=>{IPC$1.emit(HANDLE_CALLBACK,t,e)})};IPC$1.on(HANDLE_CALLBACK,(e,...t)=>{if(callbacks.has(e))for(const a of callbacks.get(e))try{a(...t)}catch(e){console.error(e)}}),Object.assign(Process.env,{injDir:path__default.default.resolve(__dirname,"..","..","bd-compat")}),Object.assign(Process,{on:(e,t)=>{callbacks.has(e)||initializeCallbacks(e),callbacks.get(e).add(t)},off:(e,t)=>{if(callbacks.has(e))return callbacks.get(e).delete(t)}});const{IPC,events}=createIPC(),nodeModulesPath=path__default.default.resolve(process.cwd(),"resources","app-original.asar","node_modules");Module__default.default.globalPaths.includes(nodeModulesPath)||Module__default.default.globalPaths.push(nodeModulesPath);const API={getAppPath(){return electron.ipcRenderer.sendSync(GET_APP_PATH)},getBasePath(){return path__default.default.resolve(__dirname,"..")},executeJS(js){return eval(js)},setDevtools(e){return electron.ipcRenderer.invoke(SET_DEV_TOOLS,e)},IPC:IPC,cloneObject:cloneObject,getKeys:getKeys};handleSplash(API),Object.defineProperties(window,{PCCompatNative:{value:Object.assign({},API,{cloneObject:cloneObject,getKeys:getKeys}),configurable:!1,writable:!1},PCCompatEvents:{value:events,configurable:!1,writable:!1}}),electron.contextBridge.exposeInMainWorld("PCCompatNative",API),IPC.on(EXPOSE_PROCESS_GLOBAL,()=>{try{process.contextIsolated?electron.contextBridge.exposeInMainWorld("process",Process):Object.defineProperty(window,"process",{value:Process,configurable:!0})}catch(e){e.name="NativeError",console.error("Failed to expose process global:",e)}});
