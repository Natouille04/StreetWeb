import React, { useRef, useEffect } from "react";
import QRious from "qrious"; 

/**
 * @param {object} props
 * @param {string} props.data
 */
function QrCode({ data, size }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current && data) {
            new QRious({
                element: canvasRef.current, 
                value: data, 
                size: size ?? 160,
                foreground: '#000000',   
                background: '#ffffff', 
                level: 'H' 
            });
        } 
        
        else if (canvasRef.current) {
             const ctx = canvasRef.current.getContext('2d');
             ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        
    }, [data]);

    return (
        <canvas ref={canvasRef} id="qr-canvas-display" /> 
    );
}

export { QrCode };