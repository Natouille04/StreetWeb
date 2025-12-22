import Mii from "@pretendonetwork/mii-js";

function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const len = binary.length;
    const buffer = new Uint8Array(len);
    for (let i = 0; i < len; i++) buffer[i] = binary.charCodeAt(i);
    return buffer.buffer;
}

function MiiRender({ miiData = null, name = "mii", body = "face" }) {
    if (miiData == null) {
        return (
            <img className="h-full w-full object-cover" src="images/BaseMiiHead.png" alt={name}></img>
        );
    }

    else {
        const buffer = base64ToArrayBuffer(miiData);
        const mii = new Mii(buffer);
        const studioUrl = mii.studioUrl({
            width: 512,
            type: body
        });

        return (
            <img className="h-full w-full object-cover" src={studioUrl} alt={name}></img>
        );
    }
}

export { MiiRender, base64ToArrayBuffer };
