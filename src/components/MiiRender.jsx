import React, { useEffect, useState } from "react";
import Mii from "@pretendonetwork/mii-js";

function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const len = binary.length;
    const buffer = new Uint8Array(len);
    for (let i = 0; i < len; i++) buffer[i] = binary.charCodeAt(i);
    return buffer.buffer;
}

function MiiRender({ miiData = null, name}) {
    if (miiData == null) {
        return (
            <div className="w-25 h-25 bg-gray-300/60 rounded-lg flex justify-center items-center shadow-xl/50">
                <div className="w-85/100 h-85/100 bg-white rounded-lg">
                    <img className="h-full w-full" src="images/BaseMiiHead.png" alt={name}></img>
                </div>
            </div>
        );
    }

    else {
        const buffer = base64ToArrayBuffer(miiData);
        const mii = new Mii(buffer);
        const studioUrl = mii.studioUrl();

        return (
            <div className="w-25 h-25 bg-gray-300/60 rounded-lg flex justify-center items-center shadow-xl/50">
                <div className="w-85/100 h-85/100 bg-white rounded-lg">
                    <img className="h-full w-full" src={studioUrl} alt={name}></img>
                </div>
            </div>
        );
    }
}

export { MiiRender };
