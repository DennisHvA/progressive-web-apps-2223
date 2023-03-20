import { detectBarcode } from "./detectBarcode.js";
import { loadingState } from "./cameraState.js";

export function enableCamera() {
    const main = document.querySelector("main")
    const scanner = document.querySelector("#scanner")
    const startbutton = document.querySelector('#start')
    const stopbutton = document.querySelector('#stop')
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

        main.classList.toggle("fullscreen")
        scanner.classList.toggle("hide");
        startbutton.classList.toggle("hide");
        stopbutton.classList.toggle("hide");

        loadingState();
    }
}

// https://www.jsnow.io/p/javascript/creating-a-real-time-qr-code-scanner-with-vanilla-javascript-part-1

export function disableCamera() {
    const main = document.querySelector("main")
    const scanner = document.querySelector("#scanner")
    const startbutton = document.querySelector('#start')
    const stopbutton = document.querySelector('#stop')
    
    const mediaStream = video.srcObject;
    const tracks = mediaStream.getTracks();
    tracks.forEach(track => track.stop())

    main.classList.toggle("fullscreen")
    scanner.classList.toggle("hide");
    startbutton.classList.toggle("hide");
    stopbutton.classList.toggle("hide");
}

// https://dev.to/morinoko/stopping-a-webcam-with-javascript-4297