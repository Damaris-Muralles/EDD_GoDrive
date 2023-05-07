| CARNET | NOMBRE | AUXILIAR DEL CURSO|

|----------------|----------------------|---------------|

| 202100953 | Damaris Muralles | Leonardo Martínez |

  
  

# FASE 3

  

  

Esta es una aplicación Web estática alojada en ***Github Pages***, desarrollada en el lenguaje ***JavaScript*** y ***HTML/CSS***, también se utiliza ***Graphviz*** para generar las graficas en los reportes requeridos.

  

  

## Descripción General del Proyecto

  

  

La aplicacion busca tener un funcionamiento similar a **Google Drive** en donde se pueda permitir el manejo de archivos para la facultad.Este sistema debe de ser capaz de ser utilizado en cualquier sistema operativo por lo que se plantea la posibilidad de que la aplicación sea un sitio web mediante el uso de Github Pages. La aplicacion final, denominada como **EDD GoDrive**, proporcionara a cada uno de los cursos de la carrera un espacio de almacenamiento en donde se puede cargar, crear y eliminar carpetas y archivos, para ello, debe de permitir llevar un control de usuarios en donde estos también tendran la opción de compartir archivos con otros usuarios y ver los archivos que le fueron compartidos, también tendra la opción de comunicarse con otrso usuarios por medio de un chat.

  

  

# MANUAL DE USUARIO

  

## Introducción

Este manual busca explicar en detalle el entorno del programa, así como todas las opciones y funcionalidades que este posee a manera de familiarizar a la persona interesada con todo lo que el programa le puede ofrecer, haciendo que sea más cómodo al ser utilizado.

## Descripcion General

  

Esta aplicación web tiene una funcionalidad similar a GoogleDrive, pero con funciones personalizadas para la facultad.

  

La applicacion web posee dos tipos de usuario, el usuario para administrador y el usuario de estudiantes. El administrador tendra las funciones necesarias para poder visualizar los alumnos cargados al sistema en donde se encriptara la contraseña para seguridad, tambien podra visualizar y descargar los archivos que han sido compartidos por todos los usurios, y vizualizar dos tipos distintos de reportes para los mensajes de todos los estudiantes,  ***(estos mensajes fueron encriptados por motivo de seguridad)***  .

  

El usuario para los estudiantes por el contrario podra crear, modificar y eliminar carpetas, asi mismo podra subir cualquier tipo de imagenes, pdf y txt a su espacio de almacenamiento. Ademas de esto podra visualizar el contenido de cada capeta al dar click sobre su icono o por medio de la barra de busqueda, en casa contrario los archivos solo podran ser accedidos mediante un click y se abrira una ventana de visualizacion en donde podra tener la opcion de descargar el archivo si asi lo quisiera. Se cuenta con una opcion par dar permisos a los archivos a otros usuarios, dispondra de un apartado de compartidos conmigo en donde podra visualizar todos los archivos que le fueron compartidos  y un área de chat en donde podra mandar mensajes a otros usuarios. También se cuanta con las opciones de generar los reportes correspondientes.

  
  

## Funcionalidades de la Aplicación

### Principal

En la pagina inicial se cuentan con tres opciones en la parte superior derecha:

  

- Principal: es la vista principal del logo de la aplicacion web.

- Conocenos: es un apartado en la pagina con informacion de la aplicacion y algunos links a las paginas de la universidad.

- Inicio de sesion: esta opcion redireccionara a la pagina de login.

### Inicio de sesion:

La pagina para Login o iniciar sesion solo tendra una opcion en la parte superior derecha que lo llevara de regreso a la pagina principal.

  

Tambien cuenta con un apartado en donde se debe agregar el carnet y contraseña para inciar sesion. En caso que la contraseña o usuario no sea correcto se visualizara una alerta infomando al respecto.

  

Para poder iniciar sesion como administrador se debe de ingresar "admin" tanto en el apartado de carnet como en la contraseña.

### Tablero administrador:

En esta página se contaran con un apartado grande en el centro de la pagina en donde se podran visualizar la lista de estudiantes que han sido agregados al arbol AVL y arriba de esto se contara con una lista de opciones en la que se puede escoger el orden de visualizacion de dicha lista, la cual una vez seleccionado se debe de presionar el boton de mostrar.

Adicionalmente se cuenta con un apartado  en donde se podran visualizar a los estudiantes registrados pero esta vez con una encriptacion de la contraseña y contara con un area donde se pueden visualizar en detalles todos los archivos compartidos de forma general.


En la parte superior se cuentan con dos iconos, uno el logo de la app y el otro un icono de usurio el cual al ser presionado mostrara un menu de opciones desplegable con el resto de funcionalidades de la aplicacion entre las cuales estan:

  

- Cargar alumnos: permite seleccionar un archivo Json del equipo, el cual contiene la informacion de los estudiantes que estan registrados para poder ser cargados al sistema.

- Reporte AVL: al presionar esta opcion se visualiza la grafica del arbol avl que modela la informacion de la lista de alumnos.
- Reporte Mensajeria: al presionar esta opcion se visualizara un textarea con toda la informaion detallada de los mensajes de los usuarios.
-  Grafica del Reporte Mensajeria: al presionar esta opcion se visualiza la grafica del arbol del reporte de mensajeria con menos detalle.
- Cerrar sesion: esto cerrara la sesion y lo redireccionara a la pagina de login.

  

### Tablero estudiante:

  

En esta página se contaran con un apartado grande en el centro de la pagina en donde se podran visualizar las carpetas creadas por el estudiante y los archivos subidos. Tambien se cuenta con una barra de busqueda en donde se puede colocar la direccion de la carpeta para entrar en ella, en caso de no existir se mostrara un mensaje informando al respecto.

Para entrar en una carpeta y ver su contenido tambien se puede dar click sobre el icono de esta, si se trata de un archivo por el contrario se abrira una ventana de previsualizacion en donde se encuentra tambien un opcion para descargar los archivos.

  Abajo de este apartado se encontrara la seccion de compartidos conmigo , en donde se colocaran todos los archivos que le hayan sido compartidos por otros usuarios, al igual que lo mencionado anteriormente se podran vizualizar estos archivos.

Tambien se tiene una seccion de mensajeria en donde el usuario podra comunicarse con otras personas, esta seccion esta dividida en dos partes el area de chat y el area de mensajes, en el area del chat se puede seleccionar el usuario con el que quiere abrir una conversacion, al seleccionarlo de lado derecho se podra ver el chat que le corresponde.

En la parte superior se cuentan con dos iconos, uno el logo de la app y el otro un icono de usurio el cual al ser presionado mostrara un menu de opciones desplegable con el resto de funcionalidades de la aplicacion entre las cuales estan:

  

- Opciones de archivos: despliega un segundo sub-menu en el cual se puede escoger la opcion de crear, modificar, eliminar carpetas y subir archivos. Al presionar cada una de estas opciones se abrira una ventana en donde se requiere el ingreso de la informacion correspondiente o la seleccion de archivos a subir y luego de presionar el boton de confirmacion que se encuentra en azul, se realizara la accion requerida.

- Permisos: al presionar esta opcion se visualiza una ventana en donde se requiere la informacion necesaria para poder dar el permiso de un archivo.

- Reporte de carpetas: despliega un apartado para visualizar el grafo dirigido que representa a todas las carpetas creadas por el usuario.

- Cerrar sesion: esto cerrara la sesion y lo redireccionara a la pagina de login.

  

# MANUAL TÉCNICO

  

## Introducción

Este manual, describe todos los aspectos técnicos del programa, a manera de familiarizar a la persona interesada con la lógica implementada en el desarrollo de este.

## Descripcion General

La aplicacion busca tener un funcionamiento similar a Google Drive en donde se pueda permitir el manejo de archivos para la facultad.Este sistema debe de ser capaz de ser utilizado en cualquier sistema operativo por lo que se hizo uso de Github Pages para alojarla.

  

La aplicacion **EDD GoDrive**, proporcionara dos tipos de accesos, uno especifico para el administrador y otro para estudiantes, el administrador tiene funciones especiales para poder subir archivos Json con datos de los estudiantes que hayan sido registrados y se encargara de insertarlos a un arbol avl al cual se podra visualizar en distintos ordenes, es decir, enorden, preorden y postorden, tambien contara con un metodo para graficarlo por medio de graphviz.

Otra funcionalidad agregada es que puede visualizarse una lista de los estudiantes registrados pero e esta ocacion se encripto la contraseña con aydua de CryptoJS, para hacer mas segura la informacion del estudiante. Aparte de esto se agrego otra seccion en donde el administrador podra visualizar todos los archivos que se compartieron con otros, teniendo opcion de descargarlo al presionar el nombre del archivo  y tendra la opcion de ver dos tipos de reportes para los mensajes que fueron enviados.

  

Los estudiantes en cambio contaran con un espacio de almacenamiento en donde se puede cargar, crear y eliminar carpetas y archivos, para ello, el almacenamiento de las carpetas se realizara oir medio de un árbol N-ario y cada usuario dentro del sistema tendrá su propio árbol, mientras que para el almacenamiento de los archivos de cada carpeta será implemento matriz dispersa ligada a cada nodo del arbol N-ario. se establecion un boton en donde pueden  visualizar la grafica del arbol N-ario y podra otorgar permisos a los archivos que fueran subidos  a usuarios registrados, colocando esto ultimo en un array para poder guardar la informacion antes de subierlo a IndexDB.

Adicionalmente se buscara la informacion en indexDB para  validar que existan archivos compartidos con el usuario actual para  visualizarlos. Lo ultimo es que se implemento un sistema de mensajeria en donde los estudiantes pueden hablar con otros  y visualizar los mensajes, estos mensajes fueron encriptados previamente.

  
  

## Detalles del Desarrollo

  

Este programa se desarrolló utilizando lenguajes de desarrillo web, a continuación, se listan lo utilizado en el desarrollo:

  

- IDE: Visual Studio Code

- Lenguajes: HTML, CSS, Javascript

- Grafica: Graphviz

- Para estilo de interfaz: Bootstrap

- Alojamiento en: GitHub Pages

  

Lo detallado anteriormente, puede asegurar el correcto funcionamiento del programa.

## Lógica de la Aplicación

  

### Contenido de cada paquete/carpeta

  

  

La carpeta principal ***EDD_Proyecto1_Fase2*** contiene un total de 6 paquetes más a manera de organizar de la mejor manera posible el código fuente de la aplicación y asi mismo otros recursos, como las estructuras creadas, los estilos y las paginas utilizadas.

  

En esta carpeta principal también se encuentra el archivo *index.html* de nuestra aplicación, la cual modela la vista principal de la app para una mejor comodidad para interactuar con esta app web.

  

  

-  ***Paquete CSS***: En ésta carpeta se cuentan con todos los archivos CSS de la app, es decir todos los estilos que se aplican a las paginas html que se utilizan en la aplicación.

  

-  ***Paquete Img:*** Ésta carpeta contiene todas las imagenes que se utilizaron en las paginas html, para dar mejor aspecto a la interfaz y que se viera más vistosa.

  

-  ***Paquete JS:*** En ésta se encuentran todos los códigos correspondientes a Javascript, los cuales generan las funciones que realizan las paginas y en el cual se modelan las estructuras utilizadas en la aplicacion web.

  

-  ***Paquete Pag_inicio,Pag_user y Pag_admin:*** Éstas carpetas contienen los archivos html que modelan la pagina correspondiente a cada uno de ellos, para la de inicio el login, para la de user la pagina diseñada para los estudiantes y en admin la pagina diseñada para el administrador.

  

### Estructuras de datos utilizadas

  

  

> Una **estructura de datos**[1](https://es.wikipedia.org/wiki/Estructura_de_datos#cite_note-1)​ es una forma particular de organizar información en un computador para que pueda ser utilizada de manera eficiente.

  

  

**1. Arbol AVL:**

  

Un **arbol AVL** es un tipo especial de [árbol binario](https://es.wikipedia.org/wiki/%C3%81rbol_binario) ideado por los matemáticos soviéticos [**A**delson-**V**elskii](https://es.wikipedia.org/wiki/Georgii_Adelson-Velskii  "Georgii Adelson-Velskii") y [**L**andis](https://es.wikipedia.org/wiki/Yevgeniy_Landis  "Yevgeniy Landis"). Fue el primer [árbol de búsqueda binario auto-balanceable](https://es.wikipedia.org/wiki/%C3%81rbol_de_b%C3%BAsqueda_binario_auto-balanceable  "Árbol de búsqueda binario auto-balanceable") que se ideó.

  

En la aplicación se hace uso de dos clases para modelar el arbol:

  

  

- Un clase denominada ***AvlNodo*** que contendra la información importante para cada estudiante, nombre, carnet y contraseña de su usuario, un arbol Nario y una lista circular, ademas de los punteros necesarios de cada nodo para saber su posicion en la estuctura.

  
  

- Una clase ***AvlTree*** que contendrá todas las funciones necesarias para el arbol.

  

Las funciones creadas para poder manejar la estructura son las siguientes:

  

-  **insertar e insertRecursive**: Ésta función se encarga de insertar los nuevos elementos. Recibe un parámetro de tipo json y llama a otras funciones para poder conocer el lugar en donde se debe insertar el nuevo nodo y asignar sus puntereros.

  

-  **rotatederecha, rotateizquierda, doubleizquierda y doublederecha**: Éstas funciones son funciones auxiliares que comos u nombre lo indica se encargan de rotar los nodos a manera de mantener el arbol en equilibrio.

-  **treeGraph y treeGraphRecursive**: Estas funciones se encargan de recorrer el arbol y generar una cadena con codigo de grapviz para ser visualizado en la interfaz.

-  **treeGraph y treeGraphRecursive**: Estas funciones se encargan de recorrer el arbol y generar una cadena con codigo de grapviz para ser visualizado en la interfaz.

  

-  **busqueda y busquedarecursiva**: Se encargan de buscar un elemento en el arbol y retornan el nodo que coincida con lo buscado.

  

-  **modificacion y modifirecursiva**: Éstas funciones se encargan de modificar los valores del arbol n-ario y lista circular de un elemento dado.

  

-  **enOrder, preOrden, postOrden**: Se encargan de recorrer el arbol en distintos ordenes.

  

  

**2. Arbol N-ario:**

  

Un **árbol n-ario** es una estructura re cursiva, en la cual cada elemento tiene un número cualquiera de árboles n-arios asociados. Estos árboles corresponden a la generalización de un árbol binario. La diferencia radia en que esta estructura puede manejar múltiples sub árboles asociados a cada elemento, y no solamente 2, como en el caso de los árboles binarios.

  

En la aplicación se hace uso dos clases para modelar el arbol, la funcion de cada clase es la misma que la del avl:

  

- Una clase denominada ***Tnode***.

  

- Una clase ***Tree***

  
  

Las funciones creadas para poder manejar la estructura son las siguientes:

  

-  **insert**: Ésta función se encarga de insertar los nuevos elementos en el arbol.

  

-  **modifiFolder**: Ésta función busca el hijo que coincida con el elemento buscado y le agrega un nuevo nombre.

  

-  **modifiElementMatriz**: Esta funcion se encarga de agregar los cambios a la matriz disperza que se implemento en cada nodo.

  

-  **eliminarfolder**: busca entre los hijos del nodo padre dado por el elemento que coincida con el elemento requerido y lo elimina.

  

-  **buscararchivo**: Ésta funcion como su nombre lo indica buscara en los hijos de un nodo padre si coicide con el elemento que se busca.

  

-  **copiartree y copiarNode**: Es una funcion de apoyo que se encarga de copiar cada elemento de otra estructura, en el proyecto se utiliza para copiar los datos despues de extraer la informacion del localstorage para evitar errores de que la informacion no sea una instancia de esta estructura.

  

-  **getFolder**: Se requiere de un parametro de path para poder acceder a la carpeta padre, esta funcion es una auxiliar que se utiliza en otros metodos.

-  **ngraph**: Realiza la grafica correspondiente al N-ario.

  

-  **getHTML**: Se encarga de agregar codigo al html a manera de poder visualizar los iconos de las carpetas y poder crearles metodos especificos para entrar y visualizar lo que tiene dentro.

  
  

**3. Matriz disperza:**

  

Una **matriz disperza** es una matriz en la que muchos o la mayoría de los elementos tienen un valor de cero.

  
  

En la aplicación se hace uso dos clases para modelar el arbol, la funcion de cada clase es la misma que la del avl:

  

- Una clase denominada ***MNodo***.

  

- Una clase ***SparseMatrix***

  
  

Las funciones creadas para poder manejar la estructura son las siguientes:

  

-  **insertard**: Ésta función se encarga de insertar los nuevos elementos .

  

-  **xcabezaers, cabezaers, addX y addY**: Son funciones auxiliares de la funcion insertard, y se encargan de agregar las cabeceras para el eje x y y, ademas de agregar los valores dentro de estas.

  

-  **Mostrararchivos**:Se encarga de agregar codigo html a la seccion de tablero a manera de visualizar los iconos correspondientes para cada arvhico subido, para ello recorre todos los datos en la matriz.

  

-  **buscarPorX**: Se encarga de buscar si un elemento ya se encuentra en la lista, para ello busca en el eje de las x que contienen la informacion de cada archivo.

  

-  **copiarmatriz**: Ésta funcion es similar a la del arbol N-ario.

  

-  **dgraph, cabezaersGraph y NodosGraph**: Se encargan de crear la cadena que modela el codigo de graphviz para generar la grafica correspondiente.

  
  

**4. Tabla Hash:**

  

es una **les una estructura de datos que **asocia llaves o claves con valores****. La operación principal que soporta de manera eficiente es la _búsqueda_: permite el acceso a los elementos (teléfono y dirección, por ejemplo) almacenados a partir de una clave generada (usando el nombre o número de cuenta, por ejemplo).

  

En la aplicación se hace uso dos clases para modelar la tabla: la funcion de cada clase es la misma que la del avl:

  

- Una clase denominada ***NodEH***.

  

- Una clase ***Hasht***

  

Para poder manejar la información en este hash se emplearon las siguientes funciones o metodos:

-  **insertelement**: inserta un nuevo dato.
-  **recalcularIndice**: cuando falla una busqueda con el indice calculado al principio  se recalcula hash hasta en contrar el valor correspondiente. El problema de no encontrar la informacion en el indice deseado se debea las colisiones que suelen existir en las tablas hash.
- **calcularIndice**: codifica el carnet y lo asigna
- **nuevoIndice**: resive como parametro el carnet del usuario y lo codifica a manera de generar en su lugar un indice.
- **verificarcapacidad** verifica si se ha usado el 0,75 de la capacidad total del hash.
- **generarNuevaCapacidad**: genera una nueva capacidad del hash cuando ocupa  mas del 0,75 del total-
- **Numprimo**: verifica si la capacidad del hash es un numero primo y esta lleno o se agrega espacion hasta el siguiente numero primo.
- **buscarenhash**:  busca que la informacion conicida con el parametro enviado.

**4. BlockChain:**

  

es una **estructura de datos** en la cual la información se agrupa en diversos conjuntos (estos conjuntos se denominan bloques) que contienen información relativa a otro bloque de la cadena anterior en una línea temporal.

  

En la aplicación se hace uso dos clases para modelar la tabla: la funcion de cada clase es la misma que la del avl:

  

- Una clase denominada ***Block**: es el encargado de manejar la informacion en todo el sistema.

  

- Una clase ***BlockChain***

  

Para poder manejar la información en esta lista se emplearon las siguientes funciones o metodos:

-  **insert**. inserta los valores.
-  **getSha256**: encripta informacion a manera de verificar si algo era cierto.
- **print**: imprime una cadena normal con toda la informacion de cada bloque y sera mandado a un textarea al finalizar
- **getFormatDate**: da forma a la fecha.
- **listmenssage**: va a enerar una lista con los mensajes que conidicaan con el carnet enviado como aprametro
- **blockReport**: Encargado de crear la cadena dot para representar mas facil la informacion en la estructura