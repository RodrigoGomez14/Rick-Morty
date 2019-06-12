const cardList = $("#cards-row")

async function charRequest(url) {
    const response = await fetch(url)
    const json = await response.json()
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
    <div class="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
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
const pages = [
    $("#1"),
    $("#2"),
    $("#3"),
    $("#4"),
    $("#5"),
    $("#6"),
    $("#7"),
    $("#8"),
    $("#9"),
    $("#10"),
    $("#11"),
    $("#12"),
    $("#13"),
    $("#14"),
    $("#15"),
    $("#16"),
    $("#17"),
    $("#18"),
    $("#19"),
    $("#20"),
    $("#21"),
    $("#22"),
    $("#23"),
    $("#24"),
    $("#25"),
]

/* Recorro las paginas para ver cual esta activa */
function checkPageActive() {
    for (i = 0; i < 25; i++) {
        const page = $('#' + i)
        if (page.hasClass("active")) {
            return i
        }
    }
}
let inicio = 0;
let fin = 0;

/* Funcion que dependiendo del numero de pagina asigna un nuevo inicio y final */
function changeInitEnd(page) {
    switch (page) {
        case 1:
            inicio = 1
            fin = 20
            break;
        case 2:
            inicio = 21
            fin = 40
            break;
        case 3:
            inicio = 41
            fin = 60
            break;
        case 4:
            inicio = 61
            fin = 80
            break;
        case 5:
            inicio = 81
            fin = 100
            break;
        case 6:
            inicio = 101
            fin = 120
            break;
        case 7:
            inicio = 121
            fin = 140
            break;
        case 8:
            inicio = 141
            fin = 160
            break;
        case 9:
            inicio = 161
            fin = 180
            break;
        case 10:
            inicio = 181
            fin = 200
            break;
        case 11:
            inicio = 201
            fin = 220
            break;
        case 12:
            inicio = 221
            fin = 240
            break;
        case 13:
            inicio = 241
            fin = 260
            break;
        case 14:
            inicio = 261
            fin = 280
            break;
        case 15:
            inicio = 301
            fin = 320
            break;
        case 16:
            inicio = 321
            fin = 340
            break;
        case 17:
            inicio = 341
            fin = 360
            break;
        case 18:
            inicio = 361
            fin = 380
            break;
        case 19:
            inicio = 381
            fin = 400
            break;
        case 20:
            inicio = 401
            fin = 420
            break;
        case 21:
            inicio = 421
            fin = 440
            break;
        case 22:
            inicio = 441
            fin = 460
            break;
        case 23:
            inicio = 461
            fin = 480
            break;
        case 24:
            inicio = 481
            fin = 500
            break;
        case 25:
            inicio = 501
            fin = 520
            break;
    }
}
changeInitEnd(checkPageActive())


/*Render de personajes*/
function render(inicio, fin) {
    for (i = inicio; i <= fin; i++) {
        charRequest("https://rickandmortyapi.com/api/character/" + i)
    }
}
/* Recorro el array de pages y les agrego el evento */
function addEvent() {
    for (i = 0; i < 25; i++) {
        const page = $("#" + i)
        page.click(e => {
            removeActive()
            clearCardList()
            page.addClass('active')
            changeInitEnd(checkPageActive())
            render(inicio, fin)
        })
    }
}
addEvent()

function clearCardList() {
    for (i = 0; i < 20; i++) {
        cardList[0].children[0].remove()
    }
}
function removeActive() {
    for (i = 0; i < 25; i++) {
        const page = $('#' + i)
        if (page.hasClass("active")) {
            page.removeClass("active")
        }
    }
}
render(inicio, fin)
