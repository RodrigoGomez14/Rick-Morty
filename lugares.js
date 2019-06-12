const cardList = $("#cards-row")

async function charRequest(url) {
    const response = await fetch(url)
    const json = await response.json()
    renderTemplate(createCardTemplate(cardTemplate(json)))
}

function cardTemplate(location) {
    return `
    <div class="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
        <div class="card mb-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title mb-2">${location.name}</h5>
                <span class="badge badge-info mb-2">${location.dimension}</span>
                <span class="badge badge-info mb-2">${location.type}</span>
                <div class="container-fluid">
                    <div class"row">
                        <div class"col-12">
                            <h6 class="text-center">Residents</h6>
                        </div>
                        <div class"col-12">
                            <p class="text-center">${location.residents.length}</p>
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
    $("#4")
]

/* Recorro las paginas para ver cual esta activa */
function checkPageActive() {
    for (i = 1; i <= 4; i++) {
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
    }
}
changeInitEnd(checkPageActive())


/*Render de personajes*/
function render(inicio, fin) {
    for (i = inicio; i <= fin; i++) {
        charRequest("https://rickandmortyapi.com/api/location/" + i)
    }
}
/* Recorro el array de pages y les agrego el evento */
function addEvent() {
    for (i = 1; i <= 4; i++) {
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
    for (i = 1; i <= 20; i++) {
        cardList[0].children[0].remove()
    }
}
function removeActive() {
    for (i = 1; i <= 4; i++) {
        const page = $('#' + i)
        if (page.hasClass("active")) {
            page.removeClass("active")
        }
    }
}
render(inicio, fin)
