load_bar = document.getElementById("load-bar");
collapse_top = document.getElementById("collapse-top");
collapse_bottom = document.getElementById("collapse-bottom");

setTimeout(function() {
    load_bar.style.animation = "load 1.5s linear forwards";
}, 1000);

setTimeout(function() {
    load_bar.style.width = "100%";
    load_bar.style.animation = "loaded 2s linear forwards";
}, 2500);

setTimeout(function() {
    collapse_top.style.transform = "translateY(-100%)";
    collapse_bottom.style.transform = "translateY(100%)";
}, 4500)