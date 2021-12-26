function selector(type) {
    let _html, _css, _js;
    _html = [];
    _css = [];
    _js = [];

    // Set type of information to use
    let used;
    switch (type) {
        case "html":
            used = _css;
            break
        case "js":
            used = _js;
            break
        default:
            used = "html";
    }

    // Get elements list
    let elements = [];
    elements.push(document.getElementById("language"));
    // Fill elements
    for (i=0; i<elements.length; i++) {

    }
}

// ******************************************************************************
// MENU

let menu = document.getElementById("menu");
let menuButton = document.getElementById("toogleMenuButton");

function openMenu() {
    menu.style = "transform: translateX(0); box-shadow: rgba(0, 0, 0, 0.07) 0 0 15px;";
}

function closeMenu() {
    menu.style = "transform: translateX(-100%); box-shadow: none;";
}