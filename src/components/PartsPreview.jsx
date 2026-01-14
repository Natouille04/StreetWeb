import Mii from "@pretendonetwork/mii-js";
import { base64ToArrayBuffer } from "./MiiRender";

const MII_DATA = "AwEAMMaKAO9XzBI0gP9wmXzr1MnDFgAAAABCAGEAcwBlAAAAAAAAAAAAAAAAAEBAAAAhAQJoRBgmNEYUgRIXZgwAACkAUkhQbgBhAHQAAAAAAAAAAAAAAAAAAAAAAHkJ";

function PartsPreview(part) {
    const buffer = base64ToArrayBuffer(MII_DATA);
    const prevMii = new Mii(buffer);

    prevMii[part.part] = part.value;

    const imgPreview = prevMii.studioUrl({
        width: 512,
        type: 'face_only'
    });

    return (
        <img src={imgPreview} alt="preview" />
    )
}

export { PartsPreview };