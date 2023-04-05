import { loadingState } from "./cameraState.js";
import { detectBarcode } from "./detectBarcode.js";

export function enableCamera() {
    const scanner = document.querySelector("#scanner")
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
        .then(stream => video.srcObject = stream);

        setInterval(detectBarcode, 3000);

        scanner.classList.toggle("hide");

        loadingState();
    }
}