var rangLista = localStorage.getItem("rekordi");

var rekordi = [];
if (rangLista) {
  rekordi = JSON.parse(rangLista);
}
// console.log(rekordi);
var table = document.getElementById("rekordi");
for (var i = 0; i < rekordi.length; i++) {
  var redovi = document.createElement("tr");
  redovi.innerHTML = `<td> ${rekordi[i].ime}</td><td> ${rekordi[i].poeni}</td>`;
  table.appendChild(redovi);
}