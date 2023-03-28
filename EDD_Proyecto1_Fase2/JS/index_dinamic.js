/*
    Autor: DM
    Año:2023
*/
window.addEventListener("scroll",function(){
    var header = document.querySelector("header");
    header.classList.toggle('header2',window.scrollY>0);
   
    var logo =document.querySelector(".logo img");
    if (window.scrollY>0){
        logo.setAttribute('src','/EDD_Proyecto1_Fase2/Img/logo.png');
        logo.setAttribute('width','250');
    }else{
        logo.setAttribute('src','/EDD_Proyecto1_Fase2/Img/vacio.png');
        logo.setAttribute('width','10');
    }
});