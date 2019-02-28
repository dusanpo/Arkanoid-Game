
var rangLista = localStorage.getItem("rekordi");

var rekordi = [];
if (rangLista) {
  rekordi = JSON.parse(rangLista);
}
// console.log(rekordi);