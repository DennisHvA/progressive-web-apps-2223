console.log("linked")

import { router } from "./modules/router.js";
import { calcForm } from "./modules/calcForm.js"
import { enableCamera } from "./modules/turnCamera.js";
import { disableCamera } from "./modules/turnCamera.js";

router();

const cameraOn = document.querySelector('#start')
const cameraOff = document.querySelector('#stop')

cameraOn.addEventListener('click', enableCamera)
cameraOff.addEventListener('click', disableCamera)