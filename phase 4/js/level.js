function noviNivo(){ 
    dodajemoNoveCigle(60);
    pravacLoptice = [6, 7];
           
}
    

function dodajemoNoveCigle(broj) {
    var red = {
        x: ((dimenzijePoljaZaIgru.width % 80) / 2),
        y: 40
    }; 
    for (var x = 0; x < broj; x++) {

        if (red.x > (dimenzijePoljaZaIgru.width - 80)) {
            red.y += 50;
            red.x = ((dimenzijePoljaZaIgru.width % 80) / 2);
        }
        noveCigle(red);
        red.x += 80;
    }
}

function noveCigle(red) {
    var div = document.createElement("div");
    div.setAttribute("class", "cigle");
    div.style.background = "radial-gradient( #e4e012, #0ebe6c)";
    var racunanjePoena = Math.floor(Math.random() * 10 + 3); 
    div.setAttribute("rezultat", racunanjePoena);
    div.style.left = red.x + "px";
    div.style.top = red.y + "px";
    poljeZaIgru.appendChild(div);
}














