
var poljeZaIgru = document.getElementById("poljeZaIgru"); 
var loptica = document.getElementById("loptica");
var palica = document.getElementById("palica");
var dugme = document.getElementById("dugme");

var krajIgre = true;
var tokIgre = false;
var poeni = 0;
var zivoti = 3;
var animacija;
var pravacLoptice = [6, 6]; //horizontalno kretanje,vertikalno kretanje,brzina
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
        ostaloZivota();
        animacija = requestAnimationFrame(info);
        krajIgre = false;
        tokIgre = false;
        //console.dir(palica);
        //console.log(palica);
    }
}

function info() {
    if (krajIgre === false) {
        var pozicijaPalice = palica.offsetLeft;
        if (palica.left && pozicijaPalice > 0) {
            pozicijaPalice -= 5;
        }
        else if (palica.right && pozicijaPalice < (dimenzijePoljaZaIgru.width - palica.offsetWidth)) {
            pozicijaPalice += 5;
        }
        palica.style.left = pozicijaPalice + 'px';
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
    loptica.style.top = (palica.offsetTop - 22) + 'px';
    loptica.style.left = (palica.offsetLeft + 80) + 'px';
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

    x += pravacLoptice[0];
    y += pravacLoptice[1];
    loptica.style.top = y + "px";
    loptica.style.left = x + "px";
}


function ostaloZivota() {
    document.querySelector(".zivoti").innerHTML = zivoti;
}

function zaustavljanjeLoptice() {
    tokIgre = false;
    pravacLoptice[0, -5];
    lopticaNaPalici();
    window.cancelAnimationFrame(animacija);
}

function igraJeZavršena() {
    document.getElementById("kraj").style.display = "block";
    document.getElementById("kraj").innerHTML = "Igra je završena<br>Rezultat: " + poeni + " poena<br>Ako želiš ponovo da igraš pritisni Start";
    krajIgre = true;
    loptica.style.display = "none";
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
