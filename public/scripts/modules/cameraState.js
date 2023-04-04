export function loadingState() {
    const message = document.querySelector("#state")

    message.classList.remove("error")
    message.classList.remove("succes")
    
    message.classList.add("loading")
}

export function errorState() {
    const message = document.querySelector("#state")

    message.classList.remove("loading")
    message.classList.remove("succes")
    
    message.classList.add("error")
}

export function succesState() {
    const message = document.querySelector("#state")

    message.classList.remove("error")
    message.classList.remove("loading")
    
    message.classList.add("succes")
}