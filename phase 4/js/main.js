var poljeZaIgru = document.getElementById("poljeZaIgru");
var loptica = document.getElementById("loptica");
var palica = document.getElementById("palica");
var dugme = document.getElementById("dugme");

var krajIgre = true;
var tokIgre = false;
var vreme = 0;
var poeni = 0;
var zivoti = 3;
var animacija;
var pravacLoptice = [5, 5]; //horizontalno kretanje,vertikalno kretanje,brzina
var dimenzijePoljaZaIgru = poljeZaIgru.getBoundingClientRect();
// console.log(dimenzijePoljaZaIgru);


dugme.addEventListener("click", pocetakIgre);
document.addEventListener("keydown", function (event) {
    var taster = event.keyCode;
    event.preventDefault();
    //trebaju nam tasteri 37,38,39 za levo,desno i taster gore za pokretanje loptice
    if (taster === 37) palica.left = true;
    else if (taster === 39) palica.right = true;
    else if (taster === 38 && !tokIgre) tokIgre = true;
    // console.log(taster);
});

document.addEventListener("keyup", function (event) {
    var taster = event.keyCode;
    event.preventDefault();
    if (taster === 37) palica.left = false;
    else if (taster === 39) palica.right = false;
});

function pocetakIgre() {
    if (krajIgre) {
        document.getElementById("kraj").style.display = "none";
        loptica.style.display = "block";
        zivoti = 3;
        dodajemoCigle(45);
        ostaloZivota();
        interval();
        animacija = requestAnimationFrame(info);
        krajIgre = false;
        tokIgre = false;
        //console.dir(palica);
        //console.log(palica);
    }
}


function dodajemoCigle(broj) {
    var red = {
        x: ((dimenzijePoljaZaIgru.width % 80) / 2),
        y: 40//razdaljina od gornje ivice
    }; // pravimo objekat jer želimo različite vrednosti za x i y
    for (var x = 0; x < broj; x++) {

        if (red.x > (dimenzijePoljaZaIgru.width - 80)) {
            red.y += 50;// razdaljina izmedju horizontalno postavljenih cigli
            red.x = ((dimenzijePoljaZaIgru.width % 80) / 2);
        }
       pravimoCigle(red);
        red.x += 80;// razdaljina izmedju vertikalno postavljenih cigli

    }

}

function pravimoCigle(red) {
    var div = document.createElement("div");
    div.setAttribute("class", "cigle");
    div.style.background = "radial-gradient( #ffff00, #f06d06 )";
    var racunanjePoena = Math.floor(Math.random() * 10 + 3); // od 3 do 12
    div.setAttribute("rezultat", racunanjePoena);
    div.style.left = red.x + "px";
    div.style.top = red.y + "px";
    poljeZaIgru.appendChild(div);

}


function info() {
    if (krajIgre === false) {
        var pozicijaPalice = palica.offsetLeft;
        if (palica.left && pozicijaPalice > 1) {
            pozicijaPalice -= 5;
        }
        else if (palica.right && pozicijaPalice < (dimenzijePoljaZaIgru.width - palica.offsetWidth - 3)) {
            pozicijaPalice += 5;
        }
        palica.style.left = pozicijaPalice + "px";
        // console.log(pozicijaPalice); // proveravamo poziciju palice
        if (!tokIgre) {
            lopticaNaPalici(); //pre nego što igra krene loptica je na palici
        }
        else {
            kretanjeLoptice();
        }
        animacija = requestAnimationFrame(info);
    }
}

function lopticaNaPalici() {
    loptica.style.top = (palica.offsetTop - 22) + "px";
    loptica.style.left = (palica.offsetLeft + 80) + "px";
}

function kretanjeLoptice() {
    var x = loptica.offsetLeft; // horizontalna pozicija
    var y = loptica.offsetTop; // vertikalna pozicija
    if (x > (dimenzijePoljaZaIgru.width - 20) || x < 0) {
        pravacLoptice[0] *= -1; // ako bilo koji vrednost pomnožimo sa -1 promeniće pravac
    }
    if (y > (dimenzijePoljaZaIgru.height - 20) || y < 0) {
        if (y > (dimenzijePoljaZaIgru.height - 20)) {
            return propadanjeLoptice();

        }
        pravacLoptice[1] *= -1;
    }
    if (detekcijaUdara(loptica, palica)) {
        // console.log('UDAR');
        var pravacKretanja = ((x - palica.offsetLeft) - (palica.offsetWidth / 2)) / 10;
        // console.log(pravacKretanja);
        pravacLoptice[0] = pravacKretanja;
        pravacLoptice[1] *= -1;
    }


    var sveCigle = document.querySelectorAll(".cigle");
    if (sveCigle.length == 0) {
        zaustavljanjeLoptice();
        noviNivo(); // link 

    }
    for (var svakaCigla of sveCigle) {
        if (detekcijaUdara(svakaCigla, loptica)) {
            pravacLoptice[1] *= -1;
            svakaCigla.parentNode.removeChild(svakaCigla);
            trenutnoPoena(svakaCigla.getAttribute("rezultat"));
        }
    }

    x += pravacLoptice[0];
    y += pravacLoptice[1];
    loptica.style.top = y + "px";
    loptica.style.left = x + "px";
}


function ostaloZivota() {
    document.querySelector(".zivoti").innerHTML = zivoti;
}

function trenutnoPoena(broj) {
    poeni += parseInt(broj);
    document.querySelector(".poeni").innerHTML = poeni;

}

function zaustavljanjeLoptice() {
    tokIgre = false;
    pravacLoptice[0, -5];
    lopticaNaPalici();
    window.cancelAnimationFrame(animacija);
}

function igraJeZavršena() {
    document.getElementById("kraj").style.display = "block";
    //document.getElementById("kraj").innerHTML = `Igra je završena<br>Rezultat: ${poeni} poena<br>Pritisni Start da igraš ponovo`;
    krajIgre = true;

    var rekordi = [];
    if (rangLista) {
        rekordi = JSON.parse(rangLista);
    }
    var ime = prompt("Unesite ime", "Anonimni");
    rekordi.push({
        ime: ime,
        poeni: poeni,
        vreme: vreme
    });


    rekordi.sort(function (a, b) {
        return b.poeni - a.poeni;
    });

    localStorage.setItem("rekordi", JSON.stringify(rekordi));
    location.href = "records.html";


    loptica.style.display = "none";
    poeni = false;
    var sveCigle = document.querySelectorAll(".cigle");
    for (var svakaCigla of sveCigle) {
        svakaCigla.parentNode.removeChild(svakaCigla);
    }
}


function propadanjeLoptice() {
    zivoti--;
    if (zivoti < 0) {
        igraJeZavršena();
        zivoti = 0;
    }
    ostaloZivota();
    zaustavljanjeLoptice();
}

function brojanje(vrednost) {
    if (vrednost > 9) {
        return vrednost;
    }
    else {
        return "0" + vrednost;
    }
}
function interval() {
    setInterval(function(){
        document.querySelector(".sekunde").innerHTML = brojanje(++vreme % 60);
        document.querySelector(".minuti").innerHTML = brojanje(parseInt(vreme / 60));
    }, 1000);
}



function detekcijaUdara(a, b) {
    var aElement = a.getBoundingClientRect();
    var bElement = b.getBoundingClientRect();
    //console.log(aElement);
    //console.log(bElement);
    // console.log('******');
    return (!(aElement.bottom < bElement.top ||
        aElement.top > bElement.bottom ||
        aElement.right < bElement.left ||
        aElement.left > bElement.right));
}
