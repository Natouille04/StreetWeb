import { useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';

export function CameraScanner({ onDetected }) {
    const videoRef = useRef(null);
    const qrScannerRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current) return;

        QrScanner.hasCamera().then(hasCamera => {
            if (!hasCamera) {
                console.error("No camera found");
                return;
            }

            qrScannerRef.current = new QrScanner(videoRef.current, result => onDetected(result));
            qrScannerRef.current.start();
        });

        return () => {
            qrScannerRef.current?.stop();
        };
    }, [onDetected]);

    return <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />;
}
