console.log("linked")

import { enableCamera } from "./modules/turnCamera.js";

if (window.location.pathname === "/scanner") {
    enableCamera();
}

const date = new Date().getFullYear();
document.querySelector('time').innerHTML = date;