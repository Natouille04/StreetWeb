import React, { useRef, useEffect } from "react";
import QRious from "qrious";

/**
 * @param {object} props
 * @param {string} props.data
 */
function QrCode({ data, size }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current || !data) return;

        const timeout = setTimeout(() => {
            new QRious({
                element: canvasRef.current,
                value: data,
                size: size ?? 160,
                foreground: '#000000',
                background: '#ffffff',
                level: 'H'
            });
        }, 0); // permet au canvas de “layout” avant le dessin

        return () => clearTimeout(timeout);
    }, [data, size]);

    return (
        <canvas
            ref={canvasRef}
            id="qr-canvas-display"
            width={size ?? 160}
            height={size ?? 160}
            className="block"
        />
    );
}

export { QrCode };