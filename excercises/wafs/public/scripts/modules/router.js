import { getDetail } from "./getData.js";

export function router() {
    routie({
        '': () => {
            console.log("home")
        },
        ':id': value => {
            getDetail(value);
            console.log("detail")
        }
    })
}