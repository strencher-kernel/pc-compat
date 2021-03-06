type ElectronModule = typeof import("src/preload/bindings/electron").default;

const electron = PCCompatNative.getBinding("electron") as ElectronModule;

if (!window.process || process.contextIsolated) {
   (electron.ipcRenderer as any)._events = new Proxy({}, {
       get(_, property) {
           const isArray = (electron.ipcRenderer as any)._isArray(property);

           if (isArray) {
               return new Proxy({}, {
                   get(_, index) {
                       return {
                           $$type: Symbol.for("PC_IPC_RENDERER_LISTENER"),
                           index,
                           event: property
                       }
                   }
               });
           }

           return {
               $$type: Symbol.for("PC_IPC_RENDERER_LISTENER"),
               index: 0,
               event: property
           };
       }
   });
}

export default !window.process || process.contextIsolated ? electron : window.require("electron");
