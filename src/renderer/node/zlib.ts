import {makeLazy} from "@common/util";

export default makeLazy(() => PCCompatNative.getBinding("zlib"));