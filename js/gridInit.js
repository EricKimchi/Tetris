const grid = document.getElementById('main-grid');
let divs = "";
for (let i = 0; i < 200; i++) {
    divs += "<div></div>\n";
}
for (let i = 0; i < 10; i++) {
    divs += '<div class="block"></div>\n';
}
grid.innerHTML = divs;