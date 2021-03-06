import * as IPCEvents from "@common/ipcevents";
import {DOM, Utilities} from "../../modules";
import PluginManager from "../pluginmanager";
import electron from "@node/electron";
import {fs, path} from "../../node";

export type PluginManifest = {
    dependencies?: string[];
    name: string;
    description: string;
    version: string;
    author: string;
    license: string;
};

export default class Plugin {
    path: string;

    stylesheets: {[id: string]: HTMLElement} = {};

    get color() {return "#7289da"};

    manifest: PluginManifest;

    entityID: string;

    settings: any;

    startPlugin?(): void;

    pluginWillUnload?(): void;

    loadStylesheet(_path: string): void {
        const stylePath = path.isAbsolute(_path) ? _path : path.resolve(this.path, _path);
        try {
            if (!fs.existsSync(stylePath)) throw new Error(`Stylesheet not found at ${stylePath}`);

            const content = path.extname(stylePath).endsWith('.scss') ?
               electron.ipcRenderer.sendSync(IPCEvents.COMPILE_SASS, stylePath)
               : fs.readFileSync(stylePath, 'utf-8');
            const id = `${this.entityID}-${Utilities.random()}`;

            this.stylesheets[id] = DOM.injectCSS(id, content);
        } catch (error) {
            console.error(`Could not load stylesheet:`, error);
        }
    }

    log(...messages: any[]): void {
        console.log(`%c[Powercord:Plugin:${this.constructor.name}]`, `color: ${this.color};`, ...messages);
    }

    debug(...messages: any[]): void {
        console.debug(`%c[Powercord:Plugin:${this.constructor.name}]`, `color: ${this.color};`, ...messages);
    }

    warn(...messages: any[]): void {
        console.warn(`%c[Powercord:Plugin:${this.constructor.name}]`, `color: ${this.color};`, ...messages);
    }

    error(...messages: any[]): void {
        console.error(`%c[Powercord:Plugin:${this.constructor.name}]`, `color: ${this.color};`, ...messages);
    }

    // "Internals" :zere_zoom:
    _load() {
        PluginManager.startPlugin(this);
    }

    _unload() {
        this.pluginWillUnload?.();
        for (const stylesheet in this.stylesheets ?? {}) {
            DOM.clearCSS(stylesheet);
        }
    }

    // Getters
    get displayName() {return this.manifest.name;}
}