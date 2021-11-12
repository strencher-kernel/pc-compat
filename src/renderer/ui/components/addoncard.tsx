import Modals from "../modals";
import Components from "../../modules/components";

export function Icon({name, ...props}) {
    const Component = Components.get(name);
    if (!Components) return null;

    return (
        <Component {...props} />
    );
};

export function ToolButton({label, icon, onClick, danger = false, disabled = false}) {
    const Button = Components.byProps("DropdownSizes");
    const Tooltip = Components.get("Tooltip");

    return (
        <Tooltip text={label} position="top">
            {props => (
                <Button
                    {...props}
                    className="pc-settings-toolbutton"
                    look={Button.Looks.BLANK}
                    size={Button.Sizes.NONE}
                    onClick={onClick}
                    disabled={disabled}
                >
                    <Icon name={icon} color={danger ? "#ed4245" : void 0} width="20" height="20" />
                </Button>
            )}
        </Tooltip>  
    );
};

export function ButtonWrapper({value, onChange, disabled = false}) {
    const [isChecked, setChecked] = React.useState(value);
    const Switch = Components.get("Switch");

    return (
        <Switch
            checked={isChecked}
            disabled={disabled}
            onChange={() => {
                onChange(!isChecked);
                setChecked(!isChecked);
            }}
        />
    );
};

export default function AddonCard({addon, manager, openSettings, hasSettings, type}) {
    const Markdown = Components.get("Markdown", e => "rules" in e);
    const [, forceUpdate] = React.useReducer(n => n + 1, 0);

    React.useEffect(() => {
        manager.on("toggle", (name: string) => {
            if (name !== addon.entityID) return;

            forceUpdate();
        });
    }, [addon, manager]);

    return (
        <div className={"pc-settings-addon-card " + addon.manifest.name?.replace(/ /g, "-")}>
            <div className="pc-settings-card-tools">
                <ToolButton label="Reload" icon="Replay" onClick={() => manager.reload(addon)} disabled />
                <ToolButton label="Open Path" icon="Folder" onClick={() => {
                    PCCompatNative.executeJS(`require("electron").shell.showItemInFolder(${JSON.stringify(addon.path)})`);
                }} disabled />
                <ToolButton label="Delete" icon="Trash" danger onClick={() => {
                    Modals.showConfirmationModal("Are you sure?", `Are you sure that you want to delete the ${type} "${addon.manifest.name}"?`, {
                        onConfirm: () => {
                            PCCompatNative.executeJS(`require("electron").shell.trashItem(${JSON.stringify(addon.path)})`);
                        }
                    });
                }} />
            </div>
            <div className="pc-settings-card-header">
                <div className="pc-settings-card-field pc-settings-card-name">{addon.manifest.name}</div>
                {"version" in addon.manifest && <div className="pc-settings-card-field">v{addon.manifest.version}</div>}
                {"author" in addon.manifest && <div className="pc-settings-card-field"> by {addon.manifest.author}</div>}
            </div>
            {addon.manifest.description && (
                <div className="pc-settings-card-desc">
                    <Markdown>{addon.manifest.description}</Markdown>
                </div>
            )}
            <div className="pc-settings-card-footer">
                <ButtonWrapper value={manager.isEnabled?.(addon) ?? false} onChange={() => {
                    manager.toggle(addon);
                }} />
            </div>
        </div>
    );
}