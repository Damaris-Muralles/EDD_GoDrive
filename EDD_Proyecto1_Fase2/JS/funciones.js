// REDIRECCIONAMIENTOS
function Rprincipal(){
    location.href="../docs/principal.html";
}
function Rlogin(){
    location.href="../Pag_inicio/Login.html";
}
function Radmin(){
    location.href = '../Pag_admin/tablero_admin.html';
}
function Restudent(){
    location.href = '../Pag_user/tablero_student.html';
}


//FUNCIONES PARA INICIO DE SESION

var form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    var data = new FormData(form);
    var username = data.get('username');
    var password = data.get('passworduser');
    if (username=="admin"){
        if(password=="admin"){
            Radmin();
        }else{
            Swal.fire(
                'Contraseña incorrecta',
                'Haga click en el boton para continuar...',
                'error'
              )
        }
    }else{
        Restudent();
    }
});
//FUNCIONES PARA CERRAR SESION
function cerrarsesion(){
    Rlogin();
}


//FUNCIONES DEL ADMINISTRADOR
//-> 1. carga de archivos

//FUNCIONES DE LOS ESTUDIANTIES
