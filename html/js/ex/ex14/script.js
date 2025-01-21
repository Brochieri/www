function carregar() {
    var msg = window.document.getElementById('msg');
    var img = window.document.getElementById('imagem');
    var data = new Date();
    var hora =  22 //data.getHours();
    msg.innerHTML = `Agora são ${hora} horas`;
    if (hora >= 0 && hora < 12) {
        //bom dia 
        img.src = "./img/fotobomdia.png";
        document.body.style.background = "#b1bcb2";
    } else if (hora >= 12 && hora <18) {
        //boa tarde
        img.src = "./img/fotoboatarde.png";
        document.body.style.background = "#b0e2bf";
    } else {
        //boa noite
        img.src = "./img/fotoboanoite.png";
        document.body.style.background = "#1d2637";
    }
}
