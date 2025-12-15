import QrScanner from 'qr-scanner';

function scanCodeFile(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = async () => {
            try {
                const result = await QrScanner.scanImage(img);
                resolve(result);
            } 
            
            catch (error) {
                handleError(error);
                reject(error);
            }
        };

        img.onerror = () => reject("Image invalide");
        img.src = URL.createObjectURL(file);
    });
}

function handleError(error) {
    const errorMessage =
        error === QrScanner.NO_QR_CODE_FOUND
            ? 'No QR code found.'
            : error;

    console.error("Erreur lors du scan :", errorMessage);
}

export { scanCodeFile };
