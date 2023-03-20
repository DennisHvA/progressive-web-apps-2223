export function renderData(data) {

    const product = {
        name: data.product.product_name,
        image: data.product.image_front_url,
        cal: data.product.nutriments['energy-kcal_100g']
    }

    const table = document.querySelector('tbody')
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const imageEl = document.createElement('img');

    const aEl = document.createElement('a');
    table.appendChild(tr)
    
    tr.appendChild(td)

    aEl.setAttribute("href", "#" + data.code)
    td.appendChild(aEl)

    imageEl.src = product.image
    aEl.appendChild(imageEl);

    tr.appendChild(td2)
    td2.textContent = product.name;

    tr.appendChild(td3)
    td3.textContent = product.cal

    const messageImg = document.querySelector("#message-img");
    const messageH = document.querySelector("#message-h")
    const messageP = document.querySelector("#message-p")

    messageImg.src = product.image
    messageH.innerHTML = product.name
    messageP.innerHTML = product.cal
}

export function renderDetail(data) {
    const homeSection = document.querySelector("#home");
    homeSection.remove();
    const detailSection = document.getElementById("detail-page");

    const product = {
        name: data.product.product_name,
        image: data.product.image_front_url,
        nutriments: data.product.nutriments
    }

    const markup = `
        <img src=${product.image} alt='${product.name}'/>
        <h1>${product.name}</h1>
        <h2>Nutriments per 100g</h2>
        <ul class='nutriments'>
            <li>Calories: ${product.nutriments['energy-kcal_100g'] ? product.nutriments['energy-kcal_100g'] : '0'}kcal</li>
            <li>Caffeine: ${ product.nutriments['caffeine_100g'] ? product.nutriments['caffeine_100g'] : '0'}mg</li>
            <li>Carbohydrates: ${product.nutriments['carbohydrates_100g'] ? product.nutriments['carbohydrates_100g'] : '0'}g</li>
            <li>Fat: ${product.nutriments['fat_100g'] ? product.nutriments['fat_100g'] : '0'}g</li>
            <li>Fibers: ${product.nutriments['fiber_100g'] ? product.nutriments['fiber_100g'] : '0'}g</li>
            <li>Proteins: ${product.nutriments['proteins_100g'] ? product.nutriments['proteins_100g'] : '0'}g</li>
            <li>Salts: ${product.nutriments['salt_100g'] ? product.nutriments['salt_100g'] : '0'}g</li>
            <li>Sugars: ${product.nutriments['sugars_100g'] ? product.nutriments['sugars_100g'] : '0'}g</li>
        </ul>
        <a href=''>Terug</a>   
    `
    detailSection.insertAdjacentHTML('beforeend', markup)
}