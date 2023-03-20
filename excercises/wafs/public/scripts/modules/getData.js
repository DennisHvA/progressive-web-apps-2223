import { renderData, renderDetail } from "./renderData.js"
import { errorState, succesState } from "./cameraState.js"

export function getData (value) {

    value = "5449000000996"
    
    const url = `https://world.openfoodfacts.org/api/v0/product/${value}.json`

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if(data.status == 1) {
            console.log("found")
            renderData(data)
            succesState()
        }
        else {
            console.log("not found");
            errorState()
        }
    })
    .catch((err) => {
        console.error(err);
    })
}

getData();

export function getDetail (id) {
    
    const url = `https://world.openfoodfacts.org/api/v0/product/${id}.json`

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        renderDetail(data)
    })
    .catch((err) => {
        console.error(err);
    })
}