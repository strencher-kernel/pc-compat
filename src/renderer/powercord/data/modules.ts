export default {
    messages: [
        "sendMessage",
        "editMessage",
        "deleteMessage"
    ],
    typing: [
        "startTyping"
    ],
    http: [
        "getAPIBaseURL",
        "get",
        "put",
        "post"
    ],
    constants: [
        "Endpoints",
        "AuditLogActionTypes",
        "AutoCompleteResultTypes",
        "BITRATE_DEFAULT"
    ],
    channels: [
        "getChannelId",
        "getLastSelectedChannelId",
        "getVoiceChannelId"
    ],
    spotify: [
        "play",
        "pause",
        "fetchIsSpotifyProtocolRegistered"
    ],
    spotifySocket: [
        "getActiveSocketAndDevice",
        "getPlayerState",
        "hasConnectedAccount"
    ],
    React: [
        "createRef",
        "createElement",
        "Component",
        "PureComponent"
    ],
    ReactDOM: [
        "render",
        "createPortal"
    ],
    contextMenu: [
        "openContextMenu",
        "closeContextMenu"
    ],
    modal: [
        "push",
        "update",
        "pop",
        "popWithKey"
    ],
    Flux: [
        "Store",
        "connectStores"
    ],
    FluxDispatcher: [
        "_currentDispatchActionType",
        "_processingWaitQueue"
    ],
    Router: [
        "BrowserRouter",
        "Router"
    ],
    hljs: [
        "initHighlighting",
        "highlight"
    ],
    i18n: [
        "Messages",
        "getLanguages",
        (m: any) => m.Messages.CLOSE
    ]
}