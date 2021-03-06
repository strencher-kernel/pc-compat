import {fromPromise} from "@powercord/components/asynccomponent";
import {closeAnnouncement} from "@ui/announcements";
import LoggerModule from "@modules/logger";
import {promise} from "@modules/discord";
import Webpack from "@modules/webpack";

const Logger = LoggerModule.create("Notices:Announcement");

export default fromPromise(promise.then(() => {
    const Notices = Webpack.findModule(m => m.default?.displayName === "Notice");

    const NoticeCloseButton = Notices.NoticeCloseButton;
    const NoticeButtonAncor = Notices.NoticeButton;
    const Notice = Notices.default;

    const Colors = {
        BLURPLE: Notices.NoticeColors.BRAND,
        RED: Notices.NoticeColors.DANGER,
        ORANGE: Notices.NoticeColors.DEFAULT,
        BLUE: Notices.NoticeColors.INFO,
        GREY: Notices.NoticeColors.NEUTRAL,
        DARK_GREY: Notices.NoticeColors.DARK,
        GREEN: Notices.NoticeColors.NOTIFICATION,
        BLURPLE_GRADIENT_1: Notices.NoticeColors.PREMIUM_TIER_1,
        BLURPLE_GRADIENT_2: Notices.NoticeColors.PREMIUM_TIER_2,
        SPOTIFY: Notices.NoticeColors.SPOTIFY,
        PURPLE: Notices.NoticeColors.STREAMER_MODE
    };

    return function Announcement(props: any) {
        const handleClick = function (callback: Function | void) {
            try {
                closeAnnouncement(props.id);

                if (callback && typeof callback === "function") {
                    return callback();
                }
            } catch (err) {
                return Logger.error(err);
            }
        };

        return (
            <Notice color={Colors[props.color?.toUpperCase()] ?? Colors.BLURPLE} id={props.id}>
                <NoticeCloseButton onClick={() => handleClick(props.callback)} />
                {props.message}
                {props.button && (
                    <NoticeButtonAncor onClick={() => handleClick(props.button.onClick)}>
                        {props.button.text}
                    </NoticeButtonAncor>
                )}
            </Notice>
        );
    };
}));