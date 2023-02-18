package estructuras

import "fmt"

// Estructura creada para los datos de los usuarios
type Student struct {
	Nombre     string
	Carnet     int
	Contraseña string
}

// Estructura para la creacion de la lista simple enlazada
type NodoC struct {
	Dato      *Student
	Siguiente *NodoC
}

type Cola struct {
	Principio *NodoC
	Final     *NodoC
	Size      int
}

// Metodos generales para nueva cola y NodoC
func Nuevo_NodoC(dato *Student) *NodoC {
	return &NodoC{dato, nil}
}

// FUNCIONES DE LA COLA

// Insertar nuevo dato en la cola
func (l *Cola) InsertS(nombre string, carnet int, contraseña string) {

	var DatosS *Student = &Student{nombre, carnet, contraseña}
	Node := &NodoC{
		Dato:      DatosS,
		Siguiente: nil,
	}

	if l.Size == 0 {
		l.Principio = Node
	} else {
		l.Final.Siguiente = Node

	}
	l.Final = Node
	l.Size += 1

}

// Obtener el primer elemento de la cola
func (l *Cola) GetFirtS() (nombre string) {
	nombre = l.Principio.Dato.Nombre
	return
}

// Eliminar el elemento
func (l *Cola) DeleteS() {

	if l.Size == 1 {
		l.Principio = nil
		l.Final = nil
	} else {
		l.Principio = l.Principio.Siguiente

	}

	l.Size -= 1
}

func (l *Cola) Esta_vacia() bool {
	return l.Size == 0
}

func (l *Cola) Imprint() {
	var actual *NodoC = l.Principio

	for actual != nil {
		fmt.Println(actual.Dato.Nombre, actual.Dato.Carnet)
		actual = actual.Siguiente
	}

}
