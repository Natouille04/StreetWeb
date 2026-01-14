import Mii from "@pretendonetwork/mii-js";

import { PartsPreview } from "./PartsPreview";
import { base64ToArrayBuffer } from "./MiiRender";

function PartsBtn({ mii, part, value, onChange }) {
    return (
        <button
            className="w-30 bg-white rounded border-4 border-gray-300"
            onClick={() => {
                mii[part] = value;
                onChange();
            }}
        >
            <PartsPreview part={part} value={value} />
        </button>
    );
}


export { PartsBtn };