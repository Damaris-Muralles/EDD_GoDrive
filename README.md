|    CARNET    |        NOMBRE       | AUXILIAR DEL CURSO|
|----------------|----------------------|---------------|
|  202100953 | Damaris Muralles | Leonardo Martínez |
# MANUAL TÉCNICO 

# Proyecto 1: Fase1

Este es una aplicación en consola desarrollado en el lenguaje ***Golang***, utilizando ***Graphviz*** para generar las graficas requeridas.

## Descripción General

La aplicacion busca tener un funcionamiento similar a **Google Drive** en donde se pueda permitir el manejo de archivos para la facultad. La aplicacion final, denominada como **EDD GoDrive**, proporcionara a cada uno de los cursos de la carrera un espacio de almacenamiento en donde se puede cargar, crear y eliminar carpetas y archivos, para ello, debe de permitir llevar un control de usuarios en donde estos también tendrán la opción de modificar los nombres de carpetas y archivos existentes. 

En la Fase 1 de esta aplicación, se desarrolló una aplicacion en consola que simula las funciones principales del mismo. Se cuenta con funciones para el administrador en donde este puede registrar estudiantes, visualizar la lista de estudiantes aceptrados y realizar reportes ***Json***, mientras que los estudiantes aceptados solo tendrán la función para iniciar sesión y registrar esta acción. 

Para poder manejar la información requerida se recurrió a la utilizacion de distintas estructuras de datos *(pilas, colas, listas simplemente enlazadas, listas doblemente enlazadas)*. Estas estructuras fueron desarrolladas sin el uso de ninguna libreria predefinida y para tener la capacidad de verificar que estas esten trabajando de la manera correcta  se realizan reportes de manera constante durante la ejecución por medio de ***Graphviz***.

## Lógica de la aplicación 

 ### Contenido de cada paquete/carpeta

La carpeta principal ***EDD_Proyecto1_Fase1*** contiene un total de 4 paquetes más a manera de organizar de la mejor manera posible el código fuente de la aplicación y asi mismo otros recursos, como los reportes y las estructuras creadas.

En esta carpeta principal también se encuentra el archivo *main* de nuestra aplicación, un *modulo* el cual nos permite el uso sobre los paquetes  en los que tenemos dependencias en nuestro proyecto y ell ***.exe*** (ejecutable) de la aplicación desarrollada.

 - ***Paquete admin_funcion***: En ésta carpeta se cuentan con todos los archivos .go que corresponden a cada función que el usuario administrador tiene permitido realizar en la aplicación, así como el tablero/menú principal propio del administrador.
 - ***Paquete crear_archivos:*** Ésta carpeta contiene dos archivos .go en el cuál se contiene el código requerido para la creación de archivos/ficheros en Golang y también el código que permite convertir los archivos creados en graphviz (.dot) a un formatos PNG.
 - ***Paquete estructuras:*** En ésta se encuentran todos los códigos correspondientes a cada una de las estructuras de datos utilizadas, así cómo las funciones para su correcto funcionamiento *(insertar datos, borrar datos, imprimir lod datos y graficar*).
 - ***Reportes:*** Ésta carpeta contiene múltiples subcarpetas que almacenan los distintos reportes y gráficas realizadas durante la ejecución de la aplicación. Existe una carpeta que almacena el archivo Json, otra carpeta en donde se almacena la cola de estudiantes en espera de aceptación, reportes de la pila con las acciones del administrador, reporte de la lista doble en dónde se visualizan los estudiantes registrados y su respectiva bitacora.
