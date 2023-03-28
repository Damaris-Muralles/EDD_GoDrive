let avlTree = new AvlTree();


// REDIRECCIONAMIENTOS
function Rprincipal(){
    location.href='../../principal.html';
}
function Rlogin(){
    location.href="/EDD_Proyecto1_Fase2/Pag_inicio/Login.html";
}
function Radmin(){
    location.href = '../Pag_admin/tablero_admin.html';
}
function Restudent(){
    location.href = '../Pag_user/tablero_student.html';
}


//FUNCIONES PARA INICIO DE SESION


function iniciosesion(event) {
    event.preventDefault();
    var data = new FormData(event.target);
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
}
//FUNCIONES PARA CERRAR SESION
function cerrarsesion(){
    Rlogin();
}


//FUNCIONES DEL ADMINISTRADOR
//-> 1. carga de archivos
function cargarestudiantes(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let studentsArray = [];
    try{        
        let fr = new FileReader();
        fr.readAsText(form.inputFile);
        fr.onload = () => {
            
            studentsArray = JSON.parse(fr.result).alumnos;
            //AGREGAR A LA TABLA LOS ALUMNOS CARGADOS 
            $('#registrostrudent tbody').html(
                studentsArray.map((item, index) => {
                    return(`
                        <tr>
                            <th scope="row">${index+1}</th>
                            <th>${item.carnet}</th>
                            <td>${item.nombre}</td>
                            <td>${item.password}</td>
                        </tr>
                    `);
                }).join('')
            )
            for(let i = 0; i < studentsArray.length; i++){
                avlTree.insert(studentsArray[i]);
            }
            // GUARDAR EN LOCAL STORAGE
            localStorage.setItem("avlTree", JSON.stringify(avlTree))
            alert('Alumnos cargados con éxito!')
        }
    }catch(error){
        console.log(error);
        alert("Error en la inserción");
    }

}

//FUNCIONES DE LOS ESTUDIANTIES
