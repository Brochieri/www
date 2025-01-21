function imc() {
var altura = window.document.getElementById("altura"); 
var peso = window.document.getElementById("peso");
imc = peso/(altura**2);
msg.innerHTML = `O seu IMC é igual a ${imc}.`
}