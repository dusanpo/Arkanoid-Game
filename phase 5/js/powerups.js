const LASER = 1;
var laserPostoji = 0;
var nadogradnja = [];

function kreiranjeNadogradnje(tipNadogradnje, left, top) {
  if (tipNadogradnje == LASER) {
    var nagrada = document.createElement("img");

    nagrada.style.position = "absolute";
    nagrada.style.width = "40px";
    nagrada.style.height = "40px";
    nagrada.style.left = left;
    nagrada.style.top = top;
    nagrada.src = "img/laser_nagrada.png";
    nagrada.setAttribute("tip", LASER);
    nadogradnja.push(nagrada);
    document.getElementById("poljeZaIgru").appendChild(nagrada);
  }
}

function proveraNagrada() {
  for (var i = 0; i < nadogradnja.length; i++) {
    pomeranjeNadogradnje(nadogradnja[i]);
  }
}

function pomeranjeNadogradnje(nagrada) {
  var y = nagrada.offsetTop; // vertikalna pozicija
  if (y > dimenzijePoljaZaIgru.height - 20) {
    return nagrada.parentNode.removeChild(nagrada);
  }

  if (detekcijaUdara(nagrada, palica)) {
    if (nagrada.getAttribute("tip") == LASER) {
      laserPostoji++;
      setTimeout(function () {
        laserPostoji--;
      }, 13 * 1000);
      return nagrada.parentNode.removeChild(nagrada);
    }

  }

  nagrada.style.top = y + 2 + "px";
}
