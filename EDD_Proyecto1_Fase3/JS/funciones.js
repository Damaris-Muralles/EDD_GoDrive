/*PARA REESTABLECER LOCALSTORAGE
let isInitialStateLoaded = false;
const initialLocalStorageState = {};

if (!isInitialStateLoaded) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    initialLocalStorageState[key] = value;
  }
  isInitialStateLoaded = true;
}

window.addEventListener("unload", event => {
  for (const key in initialLocalStorageState) {
    const value = initialLocalStorageState[key];
    localStorage.setItem(key, value);
  }
});*/



//INICIALIZACIONES DE ESTRUCTURAS Y ELEMENTOS DE PAGINA
let avlTree = new AvlTree();
let carnetuser = localStorage.getItem("estudiante");
let carpraiz = localStorage.getItem("raiz");
let tablahash =new Hasht();
let blockChain = new BlockChain();
let user; 
let ruta;
let treenari=new Tree("/");
let matrizdisperza=new SparseMatrix("/");
let compartidos =[];


// IMPLEMENTANDO INDEXBD
let db;
let request = indexedDB.open("miBaseDeDatos", 1);

request.onupgradeneeded = function(event) {
    console.log("ESTA CREANDO UN DATO")
    db = event.target.result;
    let objectStore = db.createObjectStore("miAlmacen", { keyPath: "id" });
    let transaction = event.target.transaction;
    transaction.oncomplete = function(event) {
        // Ahora puedes cargar el almacén de objetos
        let transaction = db.transaction(["miAlmacen"], "readwrite");
        let objectStore = transaction.objectStore("miAlmacen");
        tablahash =new Hasht();      
        let request = objectStore.add({ id: 1, tablaHash: tablahash});

        request.onsuccess = function(event) {
            console.log("Objeto agregado correctamente");
        };
        request.onerror = function(event) {
            console.log("Error al agregar el objeto:", event.target.error.name);

        };
        transaction = db.transaction(["miAlmacen"], "readwrite");
                
        objectStore = transaction.objectStore("miAlmacen");

        request = objectStore.add({ id: 2, compartido:[] });

        request.onsuccess = function(event) {
            console.log("Objeto actualizado correctamente");
        };
        request.onerror = function(event) {
            console.log("Error al agregar el objeto:", event.target.error.name);

        };
        transaction = db.transaction(["miAlmacen"], "readwrite");
                
        objectStore = transaction.objectStore("miAlmacen");

        request = objectStore.add({ id: 3, blockchain:new BlockChain()});

        request.onsuccess = function(event) {
            console.log("Objeto blockchain correctamente");
        };
        request.onerror = function(event) {
            console.log("Error al agregar el objeto blockchain:", event.target.error.name);

        };
    };

};

request.onsuccess = function(event) {
    db = event.target.result;
    transaction = db.transaction(["miAlmacen"]);
    objectStore = transaction.objectStore("miAlmacen");
    request = objectStore.getAll();

    request.onsuccess = function(event) {
        let objetos = event.target.result;
        if(objetos.length>0){
         
            tablahash.tabla=objetos[0].tablaHash.tabla;
            tablahash.capacidad=objetos[0].tablaHash.capacidad;
            tablahash.espaciosUsados=objetos[0].tablaHash.espaciosUsados;
            compartidos.push(...objetos[1].compartido);
            console.log("sdfsdfewrwerwerwer",objetos[2].blockchain)
            blockChain.cabeza = objetos[2].blockchain.cabeza;
            blockChain.cola = objetos[2].blockchain.cola;
            blockChain.tam = objetos[2].blockchain.tam;
            verpermisos();
            compartidosuser();
            listaparaMs();
            
        }
        console.log("sds",tablahash);
     
    };
    request.onerror = function(event) {
        console.log("Error al abrir la base de datos:", event.target.error.name);
    };
};

request.onerror = function(event) {
    console.log("Error al abrir la base de datos:", event.target.errorCode);
};

//VALIDACIONES DE EXISENCIA DE ARBOL DE ALUMNOS EN EL LOCALSTORAGE
let arbol = localStorage.getItem("arbolavl");
if (arbol === null) {
    console.log("No hay datos en el arbol")
} else {
    avlTree.raizavl = JSON.parse(arbol).raizavl;
    
}


//VALIDACION DE PETICION DE ACCESO PARA USUARIOS
if (carnetuser === null){
    console.log("No hay peticion de acceso o se genero un error")
}else{
    // Obteniendo datos relacionados al usuario
    user=avlTree.busqueda(carnetuser);
    
    ruta=user.item.carpeta_raiz;
    // Copiar los datos de treenari a la nueva instancia
    treenari.copiartree(user.treenari);

    //validar que sea una instancia del arbol N-ario
    if (treenari instanceof Tree) {
        console.log("Cargando carpetas almacenadas: ",treenari);
        nodearchivo=treenari.root;
        console.log("json matriz:",nodearchivo);
        // Copiar los datos de matriz a la nueva instancia
        matrizdisperza=new SparseMatrix("/");
        //matrizdisperza.copiarmatriz(matrizjson);
        matrizdisperza.cabeza = JSON.retrocycle(JSON.parse(nodearchivo.matrizd)).cabeza;
        matrizdisperza.cantidad =JSON.retrocycle(JSON.parse(nodearchivo.matrizd)).cantidad;
        //validar que sea una instancia de la matriz
        if (matrizdisperza instanceof SparseMatrix) {
            console.log("Cargando archivos almacenados: ",matrizdisperza);
            
        } else {
            console.log("matriz no está definida correctamente");
        }
       
        
        // Mostrar las carpetas y archivos que se hayan creado antes
        $('#carpetas').html(treenari.getHTML(user.item.carpeta_raiz)+matrizdisperza.Mostrararchivos());



    } else {
        console.log("treenari no están definidos correctamente");
    }
   

    // colocando datos de usuario en la interfaz
    $('#path').val(carpraiz);
    $("#offcanvasExampleLabel").text(user.item.nombre);
}
console.log("Arbol inicializado",treenari);
console.log("avl ",avlTree);
console.log("list ",compartidos);
console.log("hash inti",tablahash);
// REDIRECCIONAMIENTOS
function Rprincipal(){
    location.href='../index.html';
}
function Rlogin(){
    //localStorage.clear();
    location.href="../Pag_inicio/Login.html";
}
function Radmin(){
    location.href = '../Pag_admin/tablero_admin.html';
}
function Restudent(username1) {
    location.href = `../Pag_user/tablero_student.html?student=${username1}`;
}


//FUNCIONES PARA INICIO DE SESION
function iniciosesion(event) {
    event.preventDefault();

    //obteniendo datos del form
    var data = new FormData(event.target);
    var username = data.get('username');
    var password = data.get('passworduser');

    //validando usuarios
    if (username=="admin"){
        if(password=="admin"){
            Radmin();
        }else{
            Swal.fire(
                'Contraseña incorrecta',
                'Haga click en el boton para continuar...',
                'error'
              );
        }
    }else{
        // busqueda en el arbol para corroborar existencia de estudiante
        let dat=tablahash.buscarenhash(username);
        if (dat!=null){
            if (dat==CryptoJS.SHA256(password).toString()){
                //mandando datos del estudiante al localstorage para su uso
                localStorage.setItem("estudiante",username);
                localStorage.setItem("raiz","/");
                Restudent(username);
            }else{
                Swal.fire(
                    'La contraseña incorrecta',
                    'Haga click en el boton y vuelva a intentar',
                    'error'
                  );
            }
           
        }else{
            Swal.fire(
                'El usuario no existe',
                'Haga click en el boton y vuelva a intentar',
                'error'
              );
        }
    }
}


//FUNCIONES PARA CERRAR SESION
function cerrarsesion(){
    Rlogin();
}
function cerrarsesionstudent(){
    localStorage.removeItem("estudiante");
    localStorage.removeItem("raiz");
    Rlogin();
}


//FUNCIONES DEL ADMINISTRADOR
//-> 1. carga de archivos  --- revisar
function cargarestudiantes(e) {
    console.log("CARGANDO DATOS DE ESTUDIANTES");
    e.preventDefault();
    //obteniendo datos de input
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let students = [];
    try{  

        //leendo json      
        let info = new FileReader();
        info.readAsText(form.inputFile);
        info.onload = () => {
            
            students= JSON.parse(info.result).alumnos;
            let nuevostudent = [...new Set(students)];
            nuevostudent.sort((a, b) =>  a.carnet - b.carnet);
            console.log(nuevostudent)
            //insertando en avl
            for(let i = 0; i < nuevostudent.length; i++){
                console.log("INSERTANDO dato: ",i, avlTree);
                avlTree.insertar(nuevostudent[i]);
                console.log("TERMINO DE INSERTAR DATO ");
            }
            // mostrando la lista en tablero
            $('#registrostrudent tbody').html(
                //avlTree.enOrder()
                students.map((item, index) => {
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
            
            // Agregando a localstorage
            localStorage.setItem("arbolavl", JSON.stringify(avlTree))
            Swal.fire(
                'Los alumnos fueron agregados con exito!',
                `Presione el boton Ok para cerrar mensaje.`,
                'success'
              )
           
        }
    }catch(error){
        console.log("error al cargar archivo: ",error);
        Swal.fire(
            'Ha ocurrido un error al cargar a los estudiantes!',
            `Presione el boton Ok para cerrar mensaje.`,
            'error'
          )
    }
    $('#formFile').val("");
}

//-> 2. buscar en localstorage y agregar a tabla
function LocalStudents(){
    $('#registrostrudent tbody').html(
        avlTree.enOrder()
    )
}
//-> 3. opciones de recorrido
function viewrecorridos(e){
    e.preventDefault();
    // obteniendo datos del form
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    if(avlTree.raizavl !== null){
        //recorridos
        switch(form.recorrido){
            case '1':
                $('#registrostrudent tbody').html(
                    avlTree.enOrder()
                )
                break;
            case '2':
                $('#registrostrudent tbody').html(
                    avlTree.preOrder()
                )
                break;
            case '3':
                $('#registrostrudent tbody').html(
                    avlTree.postOrder()
                )
                break;
            default:
                $('#registrostrudent tbody').html("")
                break;
        }
    }
}
//->4. grafica avl
function AvlGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let contenido= `digraph G { ${avlTree.treeGraph()} }`
    $("#graph").attr("src", url + contenido);
    console.log( url + contenido)
    // para descarga---- no funciona correctamente
    $("#downloadAVL").attr("href", url + contenido);
}
// ->5. Agregar a tabla hash
function InserHash(){
    let lisestudent =avlTree.ListarEstudiantes();
    tablahash=new Hasht();
    for (let i = 0; i < lisestudent.length; i++) {


        tablahash.insertelement(lisestudent[i].carnet,lisestudent[i].nombre,CryptoJS.SHA256(lisestudent[i].pass).toString());

    }
    if(avlTree.raizavl !== null){
        try{
            let rowh="";
            for (let i = 0; i < tablahash.capacidad; i++) {
                if (tablahash.tabla[i] != null) {
                    rowh +=`
                    <tr>
                        <th scope="row">${i}</th>
                        <th>${tablahash.tabla[i].carnet}</th>
                        <td>${tablahash.tabla[i].nombre}</td>
                        <td>${tablahash.tabla[i].clave}</td>
                    </tr>
                `;
                 //estudents.push(tablahash.tabla[i].carnet);
                }
            }
            $('#strudenthash tbody').html(
                rowh
            )  ;
     
             transaction = db.transaction(["miAlmacen"], "readwrite");
          
            objectStore = transaction.objectStore("miAlmacen");
           
            request = objectStore.put({ id: 1, tablaHash: tablahash });
          
            request.onsuccess = function(event) {
                console.log("Objeto agregado correctamente");
            };
          
            request.onerror = function(event) {
                console.log("Error al agregar el objeto:", event.target.error.name);
            };
            
        }catch(e){
            console.log("errr")
        }
     
    }
  
}
$('#registrospermisos tbody').on('click', '.archivo', function(e) {
    e.preventDefault();
    let file = $(this).data('file');
    let filename = $(this).text();

    let link = document.createElement('a');
    link.href = file;
    link.download = filename; // Agregar la extensión de archivo aquí
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
//->6. Opcion de verarchivos compartidos de forma general
function verpermisos(){
   
    if(compartidos.length>0&&user==undefined){
  
        try{
            let rowh="";
            for (let i = 0; i < compartidos.length; i++) {
                
                rowh +=`
                <tr>
                    <th scope="row">${compartidos[i].propietario}</th>
                    <th>${compartidos[i].destino}</th>
                    <td>${compartidos[i].ubicacion}</td>
                    <td><a href="#" class="archivo" data-file="${compartidos[i].b64}">${compartidos[i].archivo}</a></td>
                    <td>${compartidos[i].permiso}</td>
                </tr>
            `;
                    //estudents.push(tablahash.tabla[i].carnet);
                
            }
            $('#registrospermisos tbody').html(
                rowh
            )  ;


        }catch(e){
            console.log("errr")
        }

    }
}
//->7. grafica de mensajeria






//FUNCIONES DE LOS ESTUDIANTIES
// 1. Crear carpetas    ya
function crearCarpeta(e){
    console.log("CREANDO CARPETAS");
    e.preventDefault();
    // obteniendo datos 
    let folderName =  $('#namecarpeta').val();
    let path =  $('#path').val();
    console.log("path donde se agregara: ",path);
    let res1=treenari.insert(folderName, path);
    if(res1!=null){
        Swal.fire(
            'Todo Bien!',
            `La carpeta "${folderName}" fue creada con exito! <br>Presione el boton Ok para cerrar mensaje.`,
            'success'
          )
    }else{
        Swal.fire(
            'Sucedio un error!',
            `La carpeta "${folderName}" no pudo ser creada <br>Presione el boton Ok para cerrar mensaje.`,
            'error'
          )
    }

    
     // mostrando carpetas en el tablero
    $('#carpetas').html(treenari.getHTML(path)+matrizdisperza.Mostrararchivos())
    $('#namecarpeta').val("");

    //guardando los cambios en el localStorage
    console.log("registro de arbol: ",treenari);
    avlTree.modificacion(treenari,carnetuser);
    console.log("registro de avl: ",avlTree);

    localStorage.setItem("arbolavl", JSON.stringify(avlTree));
}
// 2. Entrar en carpetas al dar click    -ya
function entrarCarpeta(folderName){

    // validando si se trata de carpeta o archivo
    var fileExtension;
    if (folderName.includes(".")) {
        fileExtension = folderName.split(".").pop();
    } else {
        fileExtension = null;
    }
    // si es un archivo iniciara la funcion para visualizar los archivos
    if (fileExtension!=null){
         console.log("es un archivo ", folderName.split(".")[0])
         verarchivos(folderName);
    }else{
        // si es carpeta entrara y mostrara los archivos que esten dentro
        let path = $('#path').val();
        let curretPath = path == '/'? path + folderName : path + "/"+ folderName;
        $('#path').val(curretPath);
        ruta=curretPath;
        console.log(ruta);
         
        let nodearchivo3 = new Tnode(1,1);
        if (curretPath!="/"){
            console.log("folder: ",folderName);
            nodearchivo3=treenari.buscararchivo(folderName, path);

        }else{
            nodearchivo3=treenari.root;
        }
       
        console.log("matris: ",nodearchivo3);
       
 // Copiar los datos de matriz a la nueva instancia
 matrizdisperza=new SparseMatrix("/");
 matrizdisperza.cabeza = JSON.retrocycle(JSON.parse(nodearchivo3.matrizd)).cabeza;
 matrizdisperza.cantidad =JSON.retrocycle(JSON.parse(nodearchivo3.matrizd)).cantidad;
 console.log("sdf ",matrizdisperza);
 //validar que sea una instancia de matriz
 if (matrizdisperza instanceof SparseMatrix) {
     console.log("Cargando archivos almacenados: ",matrizdisperza);
     
 } else {
     console.log("matriz no está definida correctamente");
 }


 $('#carpetas').html(treenari.getHTML(curretPath)+matrizdisperza.Mostrararchivos())
}
    
}
// 2.5 ver archivos arreglar ---ya

function verarchivos(completname){
    // se busca el archivo en la matriz
    let nodearchivo = [];
    nodearchivo=matrizdisperza.buscarPorX(completname);
    console.log(nodearchivo,nodearchivo[0].tipo, nodearchivo[0].format_b64)
    // se visualiza  dependiendo si se trata de un pdf, txt o imagen
    
    if (nodearchivo[0].tipo=="pdf"){
        Swal.fire({
            html:`<embed id="outputPDF" src="${nodearchivo[0].format_b64}" type="application/pdf" width="500" height="500">`,
            width: 600,
            height: 600,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: `<a id="downloadLink" href="${nodearchivo[0].format_b64}" download="${completname}" style="text-decoration: none;color:white;">Descargar PDF</a>`,
              cancelButtonText: 'Cerrar',
              background: '#fff url(../Img/fondo_claro_p.png)',
              backdrop: `
              rgba(14, 14, 15, 0.816)
              `
            }).then((result) => {
              if (result.isConfirmed) {
  
                Swal.fire(
                  'Descargado!',
                  'Tu archivo se descargo correctamente.',
                  'success'
                )
              }
            });
    }

    if (nodearchivo[0].tipo!="txt" && nodearchivo[0].tipo!="pdf" && nodearchivo[0].tipo!="raiz"){
        
        Swal.fire({
            html:`<img id="outputImage" src="${nodearchivo[0].format_b64}" alt="Imagen convertida"  style="width:500px; height:500px;"></img>`,
            width: 600,
            height: 600,
            
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `<a id="downloadLink" href="${nodearchivo[0].format_b64}" download="${completname}" style="text-decoration: none;color:white;">Descargar imagen</a>`,
            cancelButtonText: 'Cerrar',
            background: '#fff url(../Img/fondo_claro_p.png)',
            backdrop: `
            rgba(14, 14, 15, 0.816)
            `
          }).then((result) => {
            if (result.isConfirmed) {

              Swal.fire(
                'Descargado!',
                'Tu archivo se descargo correctamente.',
                'success'
              )
            }
          });
    }

    if (nodearchivo[0].tipo=="txt"){
        // Decodificar la cadena de base64
        let dataUrl = nodearchivo[0].format_b64;
        let encodedData = dataUrl.split(",")[1];
        let decodedText = atob(encodedData);
        console.log(nodearchivo[0].format_b64);
        // para no poder editar el texto disabled en el textarea
        // Mostrar el texto decodificado
        Swal.fire({

            html:`<textarea id="outputText" cols="50" rows="10">${decodedText}</textarea>`,
            width: 600,
            height: 600,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: `<a id="downloadLink" href="${nodearchivo[0].format_b64}" download="${completname}" style="text-decoration: none;color:white;">Descargar TXT</a>`,
              cancelButtonText: 'Cerrar',
              background: '#fff url(../Img/fondo_claro_p.png)',
              backdrop: `
              rgba(14, 14, 15, 0.816)
              `
            }).then((result) => {
              if (result.isConfirmed) {
  
                Swal.fire(
                  'Descargado!',
                  'Tu archivo se descargo correctamente.',
                  'success'
                )
              }
            });
    }
    
}

// 3. con la barra de buscar
function carpetaanterior(){
    
    var fileExtension;
    let path = $('#path').val();
    
    if ( path.includes(".")) {
        fileExtension = path.split(".").pop();
    } else {
        fileExtension = null;
    }
    if (fileExtension==null){
        try{
            let nodearchivo1=new Tnode(1,1);
            let archivoraiz="/";
            let pathlist=[];
            console.log(path);
            if (path!=archivoraiz){
                path="raiz"+path;
                console.log(path);
                pathlist=path.split("/");
                console.log(pathlist);
                archivoraiz= pathlist.pop();
                let newPath = pathlist.join("/");
                newPath=newPath.replace("raiz","");
                console.log("buquedabar: ",archivoraiz, newPath);
                nodearchivo1=treenari.buscararchivo(archivoraiz, newPath);

            }else{
                nodearchivo1=treenari.root;
            }
          // Copiar los datos de matriz a la nueva instancia
          matrizdisperza=new SparseMatrix("/");
          matrizdisperza.cabeza = JSON.retrocycle(JSON.parse(nodearchivo1.matrizd)).cabeza;
          matrizdisperza.cantidad =JSON.retrocycle(JSON.parse(nodearchivo1.matrizd)).cantidad;
          path = $('#path').val();   
      $('#carpetas').html(treenari.getHTML(path)+matrizdisperza.Mostrararchivos());
      ruta=path;

        
        } catch (error) {
            
            Swal.fire(
                'El al que intenta acceder no es valido!',
                `Presione el boton Ok para cerrar mensaje.`,
                'error'
              )
        }
    }else{
        Swal.fire(
            'Para acceder a un archivo de click sobre el',
            `Presione el boton Ok para cerrar mensaje.`,
            'info'
          )

    }
    $('#path').val(ruta);
}

// 4. modificar nombre de carpeta ---ya
function ModificarCarpeta(){
    let folderName =  $('#mdnamecarpeta').val();
    let newName =  $('#nuevoname').val();
    let path = $('#path').val();
    console.log(folderName, newName,path)
    let res=treenari.modifiFolder(folderName,newName,path);
    if (res!=null){
        Swal.fire(
            'Se realizaron los cambios correctamente',
            `Presione el boton Ok para cerrar mensaje.`,
            'success'
          )
    }else{
        Swal.fire(
            'No se econtro la carpeta a modificar',
            `Presione el boton Ok para cerrar mensaje.`,
            'error'
          )
    }
    
    $('#carpetas').html(treenari.getHTML(path)+matrizdisperza.Mostrararchivos())
    $('#mdnamecarpeta').val("");
    $('#nuevoname').val("");
    //guardando los cambios en el localStorage
    console.log(treenari);
    avlTree.modificacion(treenari,carnetuser);
    console.log(avlTree);

    localStorage.setItem("arbolavl", JSON.stringify(avlTree));
}
// 5.Eliminar carpeta  --- ya
function eliminarCarpeta(){
    let folderName =  $('#eliminarcarpeta').val();
    let path = $('#path').val();
    let res=treenari.eliminarfolder(folderName,path);
    
    if (res!=null){
        Swal.fire(
            'Se elimino la carpeta correctamente',
            `Presione el boton Ok para cerrar mensaje.`,
            'success'
          )
    }else{
        Swal.fire(
            'No se econtro la carpeta a eliminar',
            `Presione el boton Ok para cerrar mensaje.`,
            'error'
          )
    }
    $('#carpetas').html(treenari.getHTML(path));
    $('#eliminarcarpeta').val("");
    $('#carpetas').html(treenari.getHTML(path)+matrizdisperza.Mostrararchivos());
    $('#eliminarcarpeta').val("");
    //guardando los cambios en el localStorage
    console.log(treenari);
    avlTree.modificacion(treenari,carnetuser);
    console.log(avlTree);

    localStorage.setItem("arbolavl", JSON.stringify(avlTree));
}

// 6. subir archivo
function convertToBase64() {
    let path =  $('#path').val();
    // Leer archivos
    var selectedFiles = document.getElementById("formFileMultiple").files;
    console.log(selectedFiles.length)
    // Verificar que los archivos no estén vacíos
    if (selectedFiles.length > 0) {
        for (var i = 0; i < selectedFiles.length; i++) {
            // Seleccionar el archivo de la lista
            var fileToLoad = selectedFiles[i];
            //extraer el nombre del archivo
            var fileName = fileToLoad.name;
            fileName = fileName.replace(/[\]}) -]/g, "_");
            fileName = fileName.replace(/[\[{(]/g, "");
            // Extraer la extensión del nombre del archivo
            var fileExtension = fileName.split(".").pop();
            fileExtension = fileExtension.replace(/ /g, "");
            // Función FileReader para leer el archivo
            var fileReader = new FileReader();
            (function(fileName, fileExtension) {
                // Al cargar el archivo, leer el contenido del archivo
                fileReader.onload = function(fileLoadedEvent) {
                    var base64 = fileLoadedEvent.target.result;
                    // Insertar datos en la matriz
                    matrizdisperza.insertard(fileName,"NC","_", base64,fileExtension);
                    matrizdisperza.printX();
                    // Actualizar contenido de #carpetas
                    $('#carpetas').html(treenari.getHTML(path)+matrizdisperza.Mostrararchivos());
                      //guardando los cambios en el localStorage
                        treenari.modifiElementMatriz(guardarMatriz(),path);
                        console.log("tree",treenari);
                        avlTree.modificacion(treenari,carnetuser);
                        console.log("arbol",avlTree);

                        localStorage.setItem("arbolavl", JSON.stringify(avlTree));

               };
            })(fileName, fileExtension);
            // Convertir datos a base64
            fileReader.readAsDataURL(fileToLoad);
        }
    }

  
    $('#formFileMultiple').val("");
}

// 7. permisos modificar
function permisosarchivos(){
    let folderName =  $('#namearchivo').val();
    let path =  $('#path').val();
    let userpermiso =  $('#permisouser').val();
    let selectElement = document.getElementById("permisosdados");
    let selectedIndex = selectElement.selectedIndex;
    let selectedText = selectElement.options[selectedIndex].text;
    
   
    let busxdata=matrizdisperza.buscarPorX(folderName);
    if(busxdata!=null){
       
        let result=tablahash.buscarenhash(userpermiso);
        if(result!=null){
            compartidos.push({propietario:user.item.carnet,destino:userpermiso,ubicacion:path,archivo:folderName,b64:busxdata[0].format_b64,permiso:selectedText.split("(")[0]})
            transaction = db.transaction(["miAlmacen"], "readwrite");
          
            objectStore = transaction.objectStore("miAlmacen");
            console.log("cs",compartidos)
            request = objectStore.put({ id: 2, compartido:compartidos });
          
            request.onsuccess = function(event) {
                console.log("Objeto actualizado correctamente");
            };
            request.onerror = function(event) {
             console.log("Error al agregar el objeto:", event.target.error.name);

         };
       
        }else{
            Swal.fire(
                'Usuario destino no encontrado',
                `Presione el boton Ok para cerrar mensaje.`,
                'error'
              )
        }
    }else{
        Swal.fire(
            'No se encontro el archivo',
            `Presione el boton Ok para cerrar mensaje.`,
            'error'
          )
    }
    $("#permisouser").val("");
    $("#namearchivo").val("");
    $("#permisosdados").prop("selectedIndex", 0);
    
}

// 8. Opcion compartidos conmigo: los permisos
function compartidosuser() {
    if(compartidos.length>0&&user!=undefined){

        try{
            
            let archivoc="";
            for (let i = 0; i < compartidos.length; i++) {
                if(compartidos[i].destino==user.item.carnet){
                    let exten = compartidos[i].archivo.split(".")[1];
                    if (exten=="pdf"){
                        archivoc+= ` <div class="col-6 col-sm-6 col-md-4 col-lg-3 archivos" onclick="entrararchivo('${compartidos[i].archivo}', '${compartidos[i].b64}')">
                    <img src="../Img/archivopng.png" width="100"/>
                    <p class="h6 text-center">${compartidos[i].archivo}</p>
                    </div>`
                    }
                    if (exten=="txt"){
                        archivoc += ` <div class="col-6 col-sm-6 col-md-4 col-lg-3 archivos" onclick="entrararchivo('${compartidos[i].archivo}', '${compartidos[i].b64}')">
                    <img src="../Img/archivo2.png" width="100"/>
                    <p class="h6 text-center">${compartidos[i].archivo}</p>
                    </div>`
                    }
                    if (exten!="txt" && exten!="pdf" ){
                        archivoc += ` <div class="col-6 col-sm-6 col-md-4 col-lg-3 archivos" onclick="entrararchivo('${compartidos[i].archivo}', '${compartidos[i].b64}')">
                    <img src="../Img/imag3.png" width="100"/>
                    <p class="h6 text-center">${compartidos[i].archivo}</p>
                    </div>`
                    }
                }
                    
            }
            $('#archivocompartido').html(archivoc);


        }catch(e){
            console.log("errr")
        }

    }
}

function entrararchivo(archivo,datos){

    let exten = archivo.split(".")[1];
    if (exten=="pdf"){
        Swal.fire({
            html:`<embed id="outputPDF" src="${datos}" type="application/pdf" width="500" height="500">`,
            width: 600,
            height: 600,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: `<a id="downloadLink" href="${datos}" download="${archivo}" style="text-decoration: none;color:white;">Descargar PDF</a>`,
              cancelButtonText: 'Cerrar',
              background: '#fff url(../Img/fondo_claro_p.png)',
              backdrop: `
              rgba(14, 14, 15, 0.816)
              `
            }).then((result) => {
              if (result.isConfirmed) {
  
                Swal.fire(
                  'Descargado!',
                  'Tu archivo se descargo correctamente.',
                  'success'
                )
              }
            });
    }
    if ( exten!="txt" &&  exten!="pdf" ){
        
        Swal.fire({
            html:`<img id="outputImage" src="${datos}" alt="Imagen convertida"  style="width:500px; height:500px;"></img>`,
            width: 600,
            height: 600,
            
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `<a id="downloadLink" href="${datos}" download="${archivo}" style="text-decoration: none;color:white;">Descargar imagen</a>`,
            cancelButtonText: 'Cerrar',
            background: '#fff url(../Img/fondo_claro_p.png)',
            backdrop: `
            rgba(14, 14, 15, 0.816)
            `
          }).then((result) => {
            if (result.isConfirmed) {

              Swal.fire(
                'Descargado!',
                'Tu archivo se descargo correctamente.',
                'success'
              )
            }
          });
    }

    if (exten=="txt"){
        // Decodificar la cadena de base64
        let dataUrl = datos;
        let encodedData = dataUrl.split(",")[1];
        let decodedText = atob(encodedData);
        // para no poder editar el texto disabled en el textarea
        // Mostrar el texto decodificado
        Swal.fire({

            html:`<textarea id="outputText" cols="50" rows="10">${decodedText}</textarea>`,
            width: 600,
            height: 600,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: `<a id="downloadLink" href="${datos}" download="${archivo}" style="text-decoration: none;color:white;">Descargar TXT</a>`,
              cancelButtonText: 'Cerrar',
              background: '#fff url(../Img/fondo_claro_p.png)',
              backdrop: `
              rgba(14, 14, 15, 0.816)
              `
            }).then((result) => {
              if (result.isConfirmed) {
  
                Swal.fire(
                  'Descargado!',
                  'Tu archivo se descargo correctamente.',
                  'success'
                )
              }
            });
    }
 
}






// 8. mensajeria
let selectedUser=null;
let ul;
let formSelect;

function listaparaMs(){

    if(user!=undefined){
        let select = document.getElementById("EstudiantesReg");

        for (let i = 0; i < tablahash.capacidad; i++) {
            if (tablahash.tabla[i] != null ) {
                if(tablahash.tabla[i].carnet!=carnetuser){
                    let option = document.createElement("option");
                    option.text = tablahash.tabla[i].carnet;
                    option.value = tablahash.tabla[i].carnet;
                    select.add(option);
                }
               
            }
        }

        if (blockChain.tam>0){
            let mensajeschat =blockChain.listmenssage(carnetuser); 
        
            /// registra si ya ha habido mensajes 
            if (mensajeschat.length>0){
                for (let i = 0; i < mensajeschat.length; i++) {
                    let texto = "";
                    if (mensajeschat[i].emisor === carnetuser) {
                        texto = mensajeschat[i].receptor;
                    } else if (mensajeschat[i].receptor === carnetuser) {
                        texto = mensajeschat[i].emisor;
                    }
                    
                    // Verificar si el texto ya existe en la lista ul
                    let exists = false;
                    for (const li of ul.querySelectorAll('li')) {
                        if (li.textContent === texto) {
                            exists = true;
                            break;
                        }
                    }
                    
                    // Si el texto no existe en la lista ul, agregarlo
                    if (!exists) {
                        let li = document.createElement("li");
                        li.textContent = texto;
                        ul.appendChild(li);
                        
                        // Agregar un controlador de eventos click al nuevo elemento li
                        addClickEventListenerToLi(li);
                        
                    }
                }
            }
        
        }

    }
  
}
// Función para agregar un controlador de eventos click a un elemento li
function addClickEventListenerToLi(li) {
    li.addEventListener('click', function() {
        // Restablecer el color de fondo de cualquier otro elemento li seleccionado
        for (const otherLi of ul.querySelectorAll('li')) {
            otherLi.style.backgroundColor = '';
        }
        
        // Cambiar el color de fondo del elemento li haciendo clic
        li.style.backgroundColor = 'lightblue';
         // Actualizar el valor de la variable selectedUser
        selectedUser = li.textContent;
        
        // Obtener una referencia a la sección de mensajes
        const messages = document.querySelector('.messages');
        
        // Eliminar todo el contenido de la sección de mensajes
        while (messages.firstChild) {
            messages.removeChild(messages.firstChild);
        }
        
        // Crear un nuevo elemento h2 con el texto del elemento li seleccionado
        const h2 = document.createElement('h2');
        h2.textContent = li.textContent;
        
        // Agregar el nuevo elemento h2 a la sección de mensajes
        messages.appendChild(h2);
        
        // Crear un nuevo elemento div con la clase messages-container
        const newMessagesContainer = document.createElement('div');
        newMessagesContainer.classList.add('messages-container');
        
        // Agregar el nuevo contenedor de mensajes a la sección de mensajes
        messages.appendChild(newMessagesContainer);
        // Obtener una referencia al contenedor de mensajes
        const messagesContainer = document.querySelector('.messages-container');
        
        let mensajeschat =blockChain.listmenssage(carnetuser); 
        console.log("lista",mensajeschat)
       // Iterar sobre la lista de mensajes
        for (const chatMessage of mensajeschat) {
    // Verificar si el mensaje es relevante para el chat actual
    if (chatMessage.emisor === carnetuser && chatMessage.receptor === selectedUser ||
        chatMessage.emisor === selectedUser && chatMessage.receptor === carnetuser) {
        // Crear un nuevo elemento div para el mensaje

        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.style.maxWidth = '80%';
        let formades=null;
        console.log("que carajo", carnetuser)
        // Agregar la clase sender o receiver dependiendo de si el mensaje es del emisor o del receptor
            if (chatMessage.emisor === carnetuser) {
                messageElement.classList.add('sender');
                console.log("entro aqui")
                // Agregar un elemento span con el texto "Tú"
                const senderElement = document.createElement('span');
                senderElement.textContent = 'Tú';
                senderElement.style.fontWeight = 'bold';
                messageElement.appendChild(senderElement);
            } else {
                messageElement.classList.add('receiver');
                
                // Agregar un elemento span con el nombre del receptor
                const receiverElement = document.createElement('span');
                receiverElement.textContent = selectedUser;
                receiverElement.style.fontWeight = 'bold';
                messageElement.appendChild(receiverElement);
            }

            // Agregar un salto de línea
            messageElement.appendChild(document.createElement('br'));
            var strd = (parseInt(carnetuser)+parseInt(selectedUser)).toString();
            var resultdes = "";
            console.log("sumeww",parseInt(carnetuser)+parseInt(selectedUser))
            for (var i = 0; i < strd.length; i++) {
                var charCode = parseInt(strd[i]) + 97;
                resultdes += String.fromCharCode(charCode);
            }
            console.log("syma.....", resultdes)
    
            var decryptedd = CryptoJS.AES.decrypt(chatMessage.mensaje,  resultdes.toString());
            console.log("des",decryptedd.toString(CryptoJS.enc.Utf8));

            

            // Establecer el texto del elemento de mensaje
            const textElement = document.createElement('span');
            textElement.textContent = "   "+decryptedd.toString(CryptoJS.enc.Utf8)+ "   ";
            messageElement.appendChild(textElement);

            // Agregar un salto de línea
            messageElement.appendChild(document.createElement('br'));
            // Agregar un salto de línea
            messageElement.appendChild(document.createElement('br'));
            // Agregar un elemento span con la hora del mensaje
            const timeElement = document.createElement('span');
            timeElement.textContent = chatMessage.hora;
            timeElement.style.fontSize = '10px';
            timeElement.style.fontStyle = 'italic';
            messageElement.appendChild(timeElement);
            // Agregar el elemento de mensaje al contenedor de mensajes
            messagesContainer.appendChild(messageElement);
        }
        }
        // Crear un nuevo elemento form
        const form = document.createElement('form');
        
        // Crear un nuevo elemento input con la clase msuser
        const input = document.createElement('textarea');
        input.classList.add('msuser');
        input.placeholder = 'Escribe un mensaje';
        
        // Agregar el nuevo elemento input al nuevo elemento form
        form.appendChild(input);
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary');
        button.type = 'button';
        button.textContent = 'Enviar';
        button.addEventListener('click', enviarmensaje);

        // Agregar el nuevo elemento button al nuevo elemento form
        form.appendChild(button);

        // Agregar el nuevo elemento form a la sección de mensajes
        messages.appendChild(form);
    });
}

if(carnetuser!=undefined ||carnetuser!=null){
    // Obtener una referencia a la lista ul
    ul = document.querySelector('.chats ul');
    // Obtener una referencia al elemento select
    formSelect = document.querySelector('#EstudiantesReg');
    // Agregar un controlador de eventos click a cada elemento li en la lista ul
    for (const li of ul.querySelectorAll('li')) {
        addClickEventListenerToLi(li);
    }
      // Agregar un controlador de eventos change al elemento select
    formSelect.addEventListener('change', function() {
        // Obtener el índice de la opción seleccionada
        const selectedIndex = formSelect.selectedIndex;
        
        // Verificar si el índice de la opción seleccionada es 0
        if (selectedIndex === 0) {
            // No agregar el elemento a la lista
            return;
        }
        
        // Obtener la opción seleccionada
        const selectedOption = formSelect.options[selectedIndex];
        
        // Obtener el texto de la opción seleccionada
        const selectedText = selectedOption.text;
        
        // Verificar si el texto seleccionado ya existe en la lista ul
        let exists = false;
        for (const li of ul.querySelectorAll('li')) {
            if (li.textContent === selectedText) {
                exists = true;
                break;
            }
        }
        
        // Si el texto seleccionado no existe en la lista ul, agregarlo
        if (!exists) {
            const li = document.createElement('li');
            li.textContent = selectedText;
            ul.appendChild(li);
            
            // Agregar un controlador de eventos click al nuevo elemento li
            addClickEventListenerToLi(li);
            
            // Disparar el evento click en el nuevo elemento li para mostrar su contenedor de mensajes
            li.click();
        } else {
            // Si el texto seleccionado ya existe en la lista ul, encontrar el elemento li correspondiente y disparar su evento click para mostrar su contenedor de mensajes
            for (const li of ul.querySelectorAll('li')) {
                if (li.textContent === selectedText) {
                    li.click();
                    break;
                }
            }
        }
    });
}

async  function enviarmensaje() { 
// Obtener el valor del input del mensaje
const message = document.querySelector('.msuser').value; 
    // Agregar el nuevo mensaje a la lista mensajeschat 
   
    var str = (parseInt(selectedUser)+parseInt(carnetuser)).toString();
    var resultC = "";

    for (var i = 0; i < str.length; i++) {
        var charCode = parseInt(str[i]) + 97;
        resultC += String.fromCharCode(charCode);
    }

    
    let encrip= CryptoJS.AES.encrypt(message, resultC.toString())

    await blockChain.insert(carnetuser,selectedUser,  encrip.toString());


 
    // Crear un nuevo elemento div para el mensaje 
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'sender'); 
    // Agregar un elemento span con el texto "Tú" 
    const senderElement = document.createElement('span'); 
    senderElement.textContent = 'Tú';
    messageElement.appendChild(senderElement);
    // Agregar un salto de línea 
    messageElement.appendChild(document.createElement('br')); 
    // Establecer el texto del elemento de mensaje
    const textElement = document.createElement('span'); 
    textElement.textContent = message;
    messageElement.appendChild(textElement); 
    // Agregar un salto de línea 
    messageElement.appendChild(document.createElement('br'));
    messageElement.appendChild(document.createElement('br')); 
    // Agregar un elemento span con la hora del mensaje c
    const timeElement = document.createElement('span');
    timeElement.textContent = new Date().toLocaleTimeString();
    const date = new Date();
    
    const options1 = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const dateString1 = date.toLocaleString('es-ES', options1);
   
    const formattedDate1 = dateString1.replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/, '$1-$2-$3  4:$5');
    timeElement.textContent = formattedDate1;
    messageElement.appendChild(timeElement); 
    // Agregar el elemento de mensaje al contenedor de mensajes
    const messagesContainer = document.querySelector('.messages-container');
    messagesContainer.appendChild(messageElement); 


    // actualizando datos en indexdb
    transaction = db.transaction(["miAlmacen"], "readwrite");
          
    objectStore = transaction.objectStore("miAlmacen");
   console.log("pwwwwwwwwwwwwwwwwwwwwwucgosdf",blockChain.cabeza)
    request = objectStore.put({ id: 3, blockchain: blockChain });
  
    request.onsuccess = function(event) {
        console.log("Objeto blockchain agregado correctamente");
    };
  
    request.onerror = function(event) {
        console.log("Error al agregar el objeto blockchain :", event.target.error.name);
    };
    
    document.querySelector('.msuser').value = '';
}










function guardarMatriz() {
    const matrizString = JSON.stringify(JSON.decycle(matrizdisperza));
    return matrizString;
}


/////REPORTES --------------------------------------------------------

// reporte del arbol n-ario  -- estilos
$("#nariobutton").on("click", function() {
    NGraph();
  });
function NGraph(){
    console.log(treenari);
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${treenari.ngraph()} }`;
    console.log( url +  body)
    $("#graphn").attr("src", url + body);
    // para descarga---- no funciona correctamente
    $("#downloadN").attr("href", url + body);
}

/*
// 9. reporte de matriz dispersa
$("#dispersabutton").on("click", function() {
    DisGraph();
  });
function DisGraph(){
    console.log("peticion de grafica: ",matrizdisperza)
    let contenidomatriz=matrizdisperza.dgraph();
    if (contenidomatriz!=null){
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = `digraph G { ${contenidomatriz} }`;
        $("#graphd").attr("src", url + body);
        // para descarga---- no funciona correctamente
        $("#downloadDis").attr("href", url + body);
        console.log("cadena: ",body)
    }else{
        Swal.fire(
            'No se puede generar grafica.',
            `posiblemente no hay archivos o no se han concedido permiso<br>Presione el boton Ok para cerrar mensaje.`,
            'info'
          )
    }
  
}
// 10. reporte de lista circular
$("#circularbutton").on("click", function() {
    CirGraph();
  });
function CirGraph(){
    console.log("circular",circular);
    console.log(circular.graphcircular());
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${circular.graphcircular()} }`;
    
    $("#graphcir").attr("src", url + body);
    
    // para descarga---- no funciona correctamente
    $("#downloadc").attr("href", url + body);
}
*/


//FUNCIONES EXTRA PARA BORRAR DATOS DE INPUT 

let input = document.getElementById("path");
if (input) {
input.addEventListener("blur", function() {
    if (input.value === "") {
        input.value = user.item.carpeta_raiz;
        let nodearchivo17=new Tnode(1,1);
        nodearchivo17=treenari.root;
       //let matrizjson17= JSON.retrocycle(JSON.parse(nodearchivo17.matrizd));
        // Copiar los datos de matriz a la nueva instancia
        matrizdisperza=new SparseMatrix("/");
        matrizdisperza.cabeza = JSON.retrocycle(JSON.parse(nodearchivo17.matrizd)).cabeza;
        matrizdisperza.cantidad =JSON.retrocycle(JSON.parse(nodearchivo17.matrizd)).cantidad;  
        $('#carpetas').html(treenari.getHTML(user.item.carpeta_raiz)+matrizdisperza.Mostrararchivos());
        ruta=user.item.carpeta_raiz;
    }
});
}

$("#staticBackdrop").on("hidden.bs.modal", function() {
    $("#namecarpeta").val("");
  });
  $("#staticBackdrop0").on("hidden.bs.modal", function() {
    $("#formFile").val("");
  });
  $("#staticBackdrop1").on("hidden.bs.modal", function() {
    $("#mdnamecarpeta").val("");
    $("#nuevoname").val("");
  });
  $("#staticBackdrop2").on("hidden.bs.modal", function() {
    $("#eliminarcarpeta").val("");
  });
  $("#staticBackdrop3").on("hidden.bs.modal", function() {
    $("#formFileMultiple").val("");
  });
  $("#staticBackdrop4").on("hidden.bs.modal", function() {
    $("#permisouser").val("");
    $("#namearchivo").val("");
    $("#permisosdados").prop("selectedIndex", 0);
  });
  $("#staticBackdrop5").on("hidden.bs.modal", function() {
    $("#graphn").removeAttr("src");
    $("#downloadN").removeAttr("href");
  });
  $("#staticBackdrop6").on("hidden.bs.modal", function() {
    $("#graphd").removeAttr("src");
    $("#downloadDis").removeAttr("href");
  });
  $("#staticBackdrop7").on("hidden.bs.modal", function() {
    $("#graphcir").removeAttr("src");
    $("#downloadc").removeAttr("href");
  });
  $("#staticBackdrop8").on("hidden.bs.modal", function() {
    $("#graph").removeAttr("src");
    $("#downloadAVL").removeAttr("href");
  });

  


  
$(document).ready(function() {
    try {
        LocalStudents();
        
    } catch (error) {
        console.log("not exist")
    }
});





