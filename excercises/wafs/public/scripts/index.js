console.log("linked")

// import { calcForm } from "./modules/calcForm.js"
import { enableCamera } from "./modules/turnCamera.js";
import { disableCamera } from "./modules/turnCamera.js";

const cameraOn = document.querySelector('#start')
const cameraOff = document.querySelector('#stop')

if (window.location.pathname === "/scanner") {
    enableCamera();
}

// cameraOn.addEventListener('click', enableCamera)
// cameraOff.addEventListener('click', disableCamera)

const date = new Date().getFullYear();
document.querySelector('time').innerHTML = date;