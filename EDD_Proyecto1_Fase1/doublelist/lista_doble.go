package doublelist

import (
	"fmt"
	"paquetes_modulo/queue"
)

// Estructura para la creacion de la cola
type NodoD struct {
	Dato      *queue.Student
	Siguiente *NodoD
	Anterior  *NodoD
}

type Lista_doble struct {
	Cabeza *NodoD
	Final  *NodoD
	Size   int
}

// FUNCIONES DE LA COLA

// Insertar nuevo dato en la lista
func (d *Lista_doble) AddS(nombre string, carnet int, contraseña string) {

	var DatosS *queue.Student = &queue.Student{Nombre: nombre, Carnet: carnet, Contraseña: contraseña}

	Node := &NodoD{
		Dato:      DatosS,
		Siguiente: nil,
		Anterior:  nil,
	}

	if d.Size == 0 {
		d.Cabeza = Node
		d.Final = Node
	}

	if d.Size > 0 {

		if carnet < d.Cabeza.Dato.Carnet {

			d.Cabeza.Anterior = Node
			Node.Siguiente = d.Cabeza
			d.Cabeza = Node

		} else {
			var actual *NodoD = d.Cabeza
			for actual.Siguiente != nil && actual.Siguiente.Dato.Carnet < carnet {
				actual = actual.Siguiente
			}
			if actual.Siguiente != nil {
				Node.Siguiente = actual.Siguiente
				Node.Anterior = actual.Siguiente.Anterior
				actual.Siguiente.Anterior = Node
				actual.Siguiente = Node
			} else {
				d.Final.Siguiente = Node
				Node.Anterior = d.Final
				d.Final = Node
			}
		}
	}

	d.Size += 1
}

// primer elemento
//borrar
//graficar
//buscar
//vacia

// Imprimir datos en la lista doble
func (d *Lista_doble) Print_ListDouble() {
	var actual *NodoD = d.Cabeza

	for actual != nil {
		fmt.Println(actual.Dato.Nombre, actual.Dato.Carnet)
		actual = actual.Siguiente
	}

}
