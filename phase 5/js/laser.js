var laser = document.getElementById("laser");
var laserAktiviran = false;

function kretanjeLasera() {
  if (!laserPostoji || !laserAktiviran) {
    laser.style.display = "none";
    laserAktiviran = false;
    return;
  }

  var y = laser.offsetTop; // vertikalna pozicija
  if (y < 0) {
    laserAktiviran = false;
  }

  var sveCigle = document.querySelectorAll(".cigle");
  for (var svakaCigla of sveCigle) {
    if (detekcijaUdara(svakaCigla, laser)) {
      if (svakaCigla.getAttribute("tip") == LASER) {
        kreiranjeNadogradnje(LASER, svakaCigla.style.left, svakaCigla.style.top);


      }
      laserAktiviran = false;
      svakaCigla.parentNode.removeChild(svakaCigla);
      trenutnoPoena(svakaCigla.getAttribute("rezultat"));
    }
  }

  laser.style.top = y - 12 + "px";
}
