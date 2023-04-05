const video = document.querySelector('#video')

let formats;

BarcodeDetector.getSupportedFormats().then(arr => formats = arr);

const barcodeDetector = new BarcodeDetector({ formats });

export const detectBarcode = () => { 
    barcodeDetector
    .detect(video)
    .then(codes => {
        if (codes.length === 0) return;
        
        for (const barcode of codes)  {
        console.log(barcode.rawValue);
        const value = barcode.rawValue;
        window.location.href = "details/" + value;
        }
    })
    .catch(err => {
    console.error(err);
    })
}