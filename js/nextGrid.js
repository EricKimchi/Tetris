const miniGrid = document.getElementById('sub-grid');
let nextDivs = "";
for (let i = 0; i < 20; i++) {
    nextDivs += "<div></div>\n";
}
miniGrid.innerHTML = nextDivs;