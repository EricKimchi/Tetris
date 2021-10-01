const grid = document.getElementById('main-grid');
let divs = ""
for (let i = 0; i < 200; i++) {
    divs += "<div></div>\n"
}
grid.innerHTML = divs;