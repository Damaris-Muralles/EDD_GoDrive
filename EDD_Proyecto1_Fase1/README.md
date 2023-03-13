|    CARNET    |        NOMBRE       | AUXILIAR DEL CURSO|
|----------------|----------------------|---------------|
|  202100953 | Damaris Muralles | Leonardo Martínez |
# MANUAL TÉCNICO 

# Proyecto 1: Fase1

Este es una aplicación en consola desarrollado en el lenguaje ***Golang***, utilizando ***Graphviz*** para generar las graficas requeridas.

# Descripción General

La aplicacion busca tener un funcionamiento similar a **Google Drive** en donde se pueda permitir el manejo de archivos para la facultad. La aplicacion final, denominada como **EDD GoDrive**, proporcionara a cada uno de los cursos de la carrera un espacio de almacenamiento en donde se puede cargar, crear y eliminar carpetas y archivos, para ello, debe de permitir llevar un control de usuarios en donde estos también tendrán la opción de modificar los nombres de carpetas y archivos existentes. 

En la Fase 1 de esta aplicación, se desarrolló una aplicacion en consola que simula las funciones principales del mismo. Se cuenta con funciones para el administrador en donde este puede registrar estudiantes, visualizar la lista de estudiantes aceptrados y realizar reportes ***Json***, mientras que los estudiantes aceptados solo tendrán la función para iniciar sesión y registrar esta acción. 

Para poder manejar la información requerida se recurrió a la utilizacion de distintas estructuras de datos *(pilas, colas, listas simplemente enlazadas, listas doblemente enlazadas)*. Estas estructuras fueron desarrolladas sin el uso de ninguna libreria predefinida y para tener la capacidad de verificar que estas esten trabajando de la manera correcta  se realizan reportes durante la ejecución por medio de ***Graphviz***.

# Lógica de la aplicación 

 ##  Contenido de cada paquete/carpeta

La carpeta principal ***EDD_Proyecto1_Fase1*** contiene un total de 4 paquetes más a manera de organizar de la mejor manera posible el código fuente de la aplicación y asi mismo otros recursos, como los reportes y las estructuras creadas.

En esta carpeta principal también se encuentra el archivo *main* de nuestra aplicación, un *modulo* el cual nos permite el uso sobre los paquetes  en los que tenemos dependencias en nuestro proyecto y ell ***.exe*** (ejecutable) de la aplicación desarrollada.

 - ***Paquete admin_funcion***: En ésta carpeta se cuentan con todos los archivos .go que corresponden a cada función que el usuario administrador tiene permitido realizar en la aplicación, así como el tablero/menú principal propio del administrador.
 - ***Paquete crear_archivos:*** Ésta carpeta contiene dos archivos .go en el cuál se contiene el código requerido para la creación de archivos/ficheros en Golang y también el código que permite convertir los archivos creados en graphviz (.dot) a un formatos PNG.
 - ***Paquete estructuras:*** En ésta se encuentran todos los códigos correspondientes a cada una de las estructuras de datos utilizadas, así cómo las funciones para su correcto funcionamiento *(insertar datos, borrar datos, imprimir lod datos y graficar*).
 - ***Reportes:*** Ésta carpeta contiene múltiples subcarpetas que almacenan los distintos reportes y gráficas realizadas durante la ejecución de la aplicación. Existe una carpeta que almacena el archivo Json, otra carpeta en donde se almacena la cola de estudiantes en espera de aceptación, reportes de la pila con las acciones del administrador, reporte de la lista doble en dónde se visualizan los estudiantes registrados y su respectiva bitacora. *Todos los reportes realizados en Graphviz cuentan con su código (archivo .dot) y su versión en imagen (formato .PNG).*

 ## Estructuras de datos utilizadas
 

> Una **estructura de datos**[1](https://es.wikipedia.org/wiki/Estructura_de_datos#cite_note-1)​ es una forma particular de organizar información en un computador para que pueda ser utilizada de manera eficiente.

 **1. Cola:**
 Una **cola** (denominada en inglés ***Queue***) es un [tipo de dato abstracto](https://es.wikipedia.org/wiki/Tipo_de_dato_abstracto "Tipo de dato abstracto"), que tiene un comportamiento [FIFO](https://es.wikipedia.org/wiki/FIFO), es decir, que el primer elemento agregado a la cola será  el primer elemento en salir.
 
 En la aplicación  se hace uso de tres estructuras para modelar la cola:
 

 - Una estructura denominada ***Student*** que contendra la información importante para cada estudiante, nombre, carnet y contraseña de su usuario.
 - Una  ***Nodo*** que que contendrá la estructura de datos del estudiante y un puntero ***Siguiente*** del mismo tipo, es decir, otro ***Nodo.***
 - Una estructura ***Cola*** que contendrá la informacion relevante de toda la cola creada. Tiene dos atributos, ***Principio y Final,*** que son de tipo Nodo, estos tendran la información correspondiente al primer y último elemento en la cola para facilitar el manejo de información, También se cuenta con  un atributo ***Size*** de tipo Int para conocer el tamaño de la cola.
 
 Las funciones creadas para poder manejar la estructura son las siguientes:
 
 - **Encolar**: Ésta función se encarga de insertar los nuevos elementos al final. Recibe tres parámetros, uno de tipo estring, int y string, correspondientes al nombre, carnet y contraseña del estudiante, las cuales se agregan a un nuevo nodo. Por medio de una condicional if se verifica si la cola no tiene ningun elemento para añadir el nuevo nodo en la primera posición, en caso contrario se pasara a la siguiente posición para agregarlo, mientras que el nodo anterior apuntara a este nuevo nodo.
 - **Desencolar**: Ésta función quitara  el primer nodo de la cola, para ello por medio de una condicional se verifica si el nodo es unico o si existen más, en caso de ser unico se hara que el puntero de principio y final apunten a nulo, mientras que si hay más de un elemento el puntero  denominado como Principio pasara al siguiente nodo.
 - **Get_first_element**: Es una función de retorno que devolvera la información contenida en el primer nodo de la cola.
 - **Esta_vacia**: Es una función que retorna un valor booleano, retornando True si  el tamaño de la cola es  0 y False en caso contrario.
 - **Print_Queue**: Ésta función imprimira en consola todos los datos almacenados en la cola, por lo que utiliza un ciclo para recorrer cada nodo en la cola obteniendo su información. 
 - **Graph**: La función requiere como parámetro la dirección en la que se encuentra el archivo main como referencia para la creación de los reportes. Para crear las gráficas se utilizan variables de tipo string que concatenan la información en la cola y van creando las relaciones entre cada nodo. La cadena creada se envia a la función de crear archivo y generar png.

 **2. Pila:**
  Una **Pila** (denominada en inglés como ***Stack***) es un tipo de dato abstracto, que tiene un comportamiento  [LIFO](https://es.wikipedia.org/wiki/LIFO "LIFO") para acceder a sus datos, es decir, que el último elemento agregado en la pila será  el primer elemento en salir.
 
 En la aplicación  se hace uso de tres estructuras para modelar la pila:
 
 - Una estructura denominada ***Actions_admin*** que contendra la información la información respecto a las acciones realizadas por el administrador y la fecha y hora en la que se realizó la misma.
 - Una  ***Nodo*** que que contendrá la estructura con los datos necesarios y un puntero ***Siguiente*** del mismo tipo, es decir, otro ***Nodo.***
 - Una estructura ***Pila*** que contendrá la informacion relevante de toda la pila creada. Tiene un ***Cabeza*** que es de tipo Nodo, estos tendran la información correspondiente al primer elemento (cima) en la pila y un atributo ***Size*** de tipo Int para conocer el tamaño de la Pila.
 
 Las funciones creadas para poder manejar la estructura son las siguientes:
 
 - **Apilar**: Ésta función se encarga de insertar los nuevos elementos al principio. Recibe dos parámetros de tipo string, correspondientes a la acción realizada y el timpo (fecha y hora) en que se hizo, las cuales se agregan a un nuevo nodo.
 - **Desapilar**: Ésta función quitara  el ultimo nodo de la pila.
 - **Get_last_element**: Es una función de retorno que devolvera la información contenida en el ultimo nodo de agregado a la pila.
 - **Esta_vacia**: Es una función que retorna un valor booleano, retornando True si  el tamaño de la pila es  0 y False en caso contrario.
 - **Print_Stack**: Ésta función imprimira en consola todos los datos almacenados en la Pila y posee la misma lógica que la función para la cola. 
 - **Graph**: Realiza lo mismo que el de la Cola.
 - **Position_item** y **Modify_last_element**: Estas funciones no son empleadas en el proyecto, pero son funciones propias que se pueden agregar ala pila. La primera busca un valor por medio de un atributo único devolviendo su posición en la pila, y el otro modificara la información que se contiene en el último nodo agregado.

 **3. Lista doblemente enlazada:**
 Una **Lista doblemente enlazada** (denominada en inglés como ***Doubly linked list***) es un tipo de dato abstracto, que tiene un comportamiento similar al de los vectores, pero a diferencia de estos es dinámica, es decir que no es necesario establecer el tamaño de esta desde el inicio, por lo que permite almacenar toda información requerida.
 
 En la aplicación  se hace uso de dos estructuras para modelar la lista:
 

 - Una estructura  ***Nodo*** que contendrá como uno de sus atributos a  la estructura con los datos necesarios, un  atributo ***Siguiente*** y uno ***Anterior***  de tipo ***Nodo***, estos últimos tendrán la referencia del nodo siguiente y del nodo anterior.
 - Una estructura ***Lista_doble*** que contendrá la informacion relevante de toda la lista creada. Tiene un atributo ***Cabeza***  y uno denominado ***Final*** que son de tipo Nodo, estos tendran la referencia correspondiente al primer y último elemento en la lista. tambien se cuenta con un atributo ***Size*** de tipo Int para conocer el tamaño de la lista.
 
 Las funciones creadas para poder manejar la estructura son las siguientes:
 
 - **Insert**: Ésta función se encarga de insertar los nuevos elementos . Recibe un parametro de tipo ***Student*** *(estructura mencionada en la cola)* con la información del estudiante y por medio de condicionales se busca si el elemento ya existe o si el atributo carnet es menor o mayor que los datos ya existentes, esto se realiza con el fin de conocer la posición en donde se debe de agregar el nodo y tener los datos ordenados.
 - **Get_element**: Esta función requiere un parámetro de tipo int que correponde al **indice** *(posición)* del elemento al que se desea acceder y este dato es utilizado para recorrer la lista doble hasta la posición del elemento y retornar asi la información contenida en el nodo.
 - ***Search_item***:Requiere como parámetro un dato tipo int el cual corresponde al carnet del estudiante *(este es un valor único, no existen dos datos con el mimo valor por lo que se puede usar para la busqueda)*, y por medio de un ciclo se recorre la lista hasta que se encuentre uno que coincida para poder retornar dos valores un **result** de tipo booleano *(para saber si se encontro o no)* y un **indice** de tipo int *(correspondiente a la posición del nodo*).
 - **Esta_vacia**: Misma función  mencionada en las otras estructuras.
 - **Print_ListDouble**: Ésta función posee la misma lógica que la función para la cola y Pila. 
 - **Graph**: Realiza lo mismo que lo mencionado en la cola.
 - **Delete_item_index** , **Delete_value**  y **Modify_element_index**: Son funciones no empleadas en el proyecto, pero son operaciones que se pueden agregar a la lista doblemente enlazada. La primera elimina un dato de acuerdo a una posición indicada, el otro elimina un dato por su valor  y el ultimo  modificara la información que se contiene en el indicie proporcionado como parámetro.
 
 **4. Lista de pilas:**
  Tal cómo se indica se trata de una lista (puede ser lista simplemente enlazada o doblemente enlazada), que contiene otra estructura, en este caso Pila, en cada uno de sus nodos. Para esta aplicación se insertó esta estructura en la lista doblemente enlazada descrita anteriormente, de tal forma que la esturctura contiene la información del estuidante y una pila por cada uno de los estudiantes agregados para poder llevar el control de los inicios de sesión realizados.
  
Para poder manejar la información en la pila se agrego una función más en la lista doble:

 - **Modify_pila**: Recibe tres parametros, uno de tipo int y dos de tipo string, que corresponden al carnet del estudiante, a la descripción de la acción y el tiempo *(fecha y hora)* en que se realizó la acción. El carnet es utilizado para poder realizar una busqueda entre los estudiantes registrados en la lista doble y asi encontrar el nodo que posee su información para poder agregar un nuevo elemento a la pila que le corresponde al estudiante.

