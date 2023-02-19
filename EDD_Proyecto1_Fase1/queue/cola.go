package queue

import (
	"fmt"
)

// Estructura creada para los datos de los usuarios
type Student struct {
	Nombre     string
	Carnet     int
	Contraseña string
}

// Estructura para la creacion de la cola
type NodoC struct {
	Dato      *Student
	Siguiente *NodoC
}

type Cola struct {
	Principio *NodoC
	Final     *NodoC
	Size      int
}

// FUNCIONES DE LA COLA

// Insertar nuevo dato en la cola
func (c *Cola) InsertS(nombre string, carnet int, contraseña string) {

	var DatosS *Student = &Student{nombre, carnet, contraseña}
	Node := &NodoC{
		Dato:      DatosS,
		Siguiente: nil,
	}

	if c.Size == 0 {
		c.Principio = Node
	} else {
		c.Final.Siguiente = Node

	}
	c.Final = Node
	c.Size += 1

}

// Obtener el primer elemento de la cola
func (c *Cola) GetFirtS() (nombre string) {
	nombre = c.Principio.Dato.Nombre
	return
}

// Eliminar el elemento
func (c *Cola) DeleteS() {

	if c.Size == 1 {
		c.Principio = nil
		c.Final = nil
	} else {
		c.Principio = c.Principio.Siguiente

	}

	c.Size -= 1
}

//buscar elemento
//graficar

// Verificar si la cola esta vacia
func (c *Cola) Esta_vacia() bool {
	return c.Size == 0
}

// Imprimir datos en la cola
func (c *Cola) Imprint() {
	var actual *NodoC = c.Principio

	for actual != nil {
		fmt.Println(actual.Dato.Nombre, actual.Dato.Carnet)
		actual = actual.Siguiente
	}

}
