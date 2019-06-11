const cardList = $("#cards-row")

async function charRequest(url) {
    const response = await fetch(url)
    const json = await response.json()
    console.log(json)
    renderTemplate(createCardTemplate(cardTemplate(json)))
}

function cardTemplate(personaje) {
    let badgeLife = ""
    if (personaje.status == "Alive") {
        badgeLife = "badge-success"
    }
    else if (personaje.status == "Dead") {
        badgeLife = "badge-danger"
    }
    else {
        badgeLife = "badge-secondary"
    }
    return `
    <div class="col-4">
        <div class="card mb-2" style="width: 18rem;">
            <img src="${personaje.image}" height="250px" class="card-img-top" alt="...">
            <div class="card-body">
                <span class="badge ${badgeLife} badge-pill mb-2">${personaje.status}</span>
                <h5 class="card-title mb-2">${personaje.name}</h5>
                <span class="badge badge-dark mb-2">${personaje.species}</span>
                <span class="badge badge-dark mb-2">${personaje.origin.name}</span>
                <div class="container-fluid">
                    <div class"row">
                        <div class"col-12">
                            <h6 class="text-center">Location</h6>
                        </div>
                        <div class"col-12">
                            <p class="text-center">${personaje.location.name}</p>
                        </div>
                        <div class"col-12">
                            <h6 class="text-center">Gender</h6>
                        </div>
                        <div class"col-12">
                            <p class="text-center">${personaje.gender}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}
function createCardTemplate(htmlString) {
    const html = document.implementation.createHTMLDocument()
    html.body.innerHTML += htmlString;
    return html.body.children[0]
}
function renderTemplate(card) {
    cardList.append(card)
}

for (i = 1; i <= 20; i++) {
    charRequest("https://rickandmortyapi.com/api/character/" + i)
}