import QrScanner from 'qr-scanner';

function scanCodeFile({ image }) {
    QrScanner.scanImage(image)
        .then(result => {
            console.log(result)
            return result;
        })
        .catch(error => console.log(error || 'No QR code found.'));
}

export { scanCodeFile };