console.log("linked")

function enableCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        const constraints = { 
        video: true,
        audio: false
        }
            
        navigator.mediaDevices.getUserMedia({
            audio: false, 
            video: {
                facingMode:'environment'
            }
        })
        .then(stream => video.srcObject = stream)
        .catch((err) => {
            console.log("no camera detected")
            const scanner = document.querySelector("#scanner")
            scanner.style.display = "none";
        });

        setInterval(detectBarcode, 3000);
    }
}

const detectBarcode = () => { 
    const video = document.querySelector('#video')
    let formats;
    const barcodeDetector = new BarcodeDetector({ formats });

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

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
    navigator.serviceWorker.register('../service-worker.js')
        .then(function(registration) {
        return registration.update();
        })
    });
}

if (window.location.pathname === "/scanner") {
    enableCamera();
}

const date = new Date().getFullYear();
document.querySelector('time').innerHTML = date;