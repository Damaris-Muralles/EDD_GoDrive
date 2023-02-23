/*
Autor: DM
Año: 2023
*/

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
func (c *Cola) Encolar(nombre string, carnet int, contraseña string) {

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
func (c *Cola) Get_first_element() (value *Student) {
	value = c.Principio.Dato
	return
}

// Eliminar el primer elemento
func (c *Cola) Desencolar() {

	if c.Size == 1 {
		c.Principio = nil
		c.Final = nil
	} else {
		c.Principio = c.Principio.Siguiente

	}

	c.Size -= 1
}

// Se puede buscar elemento retornando la posicion y modificar, codigo similar a pila

// Verificar si la cola esta vacia
func (c *Cola) Esta_vacia() bool {
	return c.Size == 0
}

// Imprimir datos en la cola
func (c *Cola) Print_Queue() {
	var actual *NodoC = c.Principio

	for actual != nil {
		fmt.Println(actual.Dato.Nombre, actual.Dato.Carnet)
		actual = actual.Siguiente
	}

}
