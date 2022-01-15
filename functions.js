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

// Dropdown
let content = document.getElementsByClassName("content");

let tempDropdowns = document.getElementsByClassName("dropdown");
let dropdowns = [];
for (i=0; i<tempDropdowns.length; i++) {
    // get span element to rotate it
    dropdowns.push(tempDropdowns[i].children[0]);
}

function toggleDropdown(n) {
    // calc content absolute height
    let children = content[n].children;
    let height = 0;
    for (let i=0; i<children.length; i++) {
        height += children[i].offsetHeight;
    }

    // toggle mode
    if (content[n].style.maxHeight == 0) {
        content[n].style.maxHeight = height + 'px';
        dropdowns[n].style.transform = 'translate(-50%, -50%) rotate(135deg)';
    } else {
        content[n].style = '';
        dropdowns[n].style = '';
    }
}
