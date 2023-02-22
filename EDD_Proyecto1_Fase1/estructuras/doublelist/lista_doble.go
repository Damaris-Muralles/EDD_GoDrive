/*
Autor: DM
Año: 2023
*/

package doublelist

import (
	"fmt"
	"paquetes_modulo/estructuras/queue"
	"paquetes_modulo/estructuras/stack"
)

// Estructura para la creacion de la lista doble
type NodoD struct {
	Dato         *queue.Student
	Pila_inicios *stack.Pila
	Siguiente    *NodoD
	Anterior     *NodoD
}

type Lista_doble struct {
	Cabeza *NodoD
	Final  *NodoD
	Size   int
}

// FUNCIONES DE LA LISTA DOBLE

// Insertar nuevo dato en cualquier posicion de la lista

func (d *Lista_doble) Insert(DatosS *queue.Student) {
	/*
	   Se puede hacer funciones aparte para agregar al principio, final o en medio
	   igual que en la lista simple, pero se puede agregar ordenado desde el principio
	   de igual forma se puede emplear este codigo en las simples pero con modificaciones
	*/

	//var DatosS *queue.Student = &queue.Student{Nombre: nombre, Carnet: carnet, Contraseña: contraseña}
	var stack_student = stack.Pila{}
	Node := &NodoD{
		Dato:         DatosS,
		Pila_inicios: &stack_student,
		Siguiente:    nil,
		Anterior:     nil,
	}

	if d.Size == 0 {
		d.Cabeza = Node
		d.Final = Node
	}

	if d.Size > 0 {

		if DatosS.Carnet < d.Cabeza.Dato.Carnet {

			d.Cabeza.Anterior = Node
			Node.Siguiente = d.Cabeza
			d.Cabeza = Node

		} else {
			var actual *NodoD = d.Cabeza
			for actual.Siguiente != nil && actual.Siguiente.Dato.Carnet < DatosS.Carnet {
				actual = actual.Siguiente
			}
			if DatosS.Carnet != actual.Dato.Carnet {
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
			} else {
				fmt.Println("No se completo la acción, porque ya esta registrado")
			}

		}
	}

	d.Size += 1
}

// Obtener elemento de una posicion indicada
func (d *Lista_doble) Get_element(index int) (elemento_obtenido *queue.Student, e string) {
	var actual *NodoD = d.Cabeza //se puede buscar desde la el elemento final

	elemento_obtenido = nil
	e = ""

	if index+1 <= d.Size {
		for i := 0; i <= index; i++ {
			if i == index {
				elemento_obtenido = actual.Dato
			}
			actual = actual.Siguiente
		}
	} else {
		e = "El indice no se ecuentra dentro del rango"
	}
	return
}

// Buscar elemento en la lista y retornar el indice
func (d *Lista_doble) Search_item(element_value int) (result bool, index int) {

	var actual *NodoD = d.Cabeza //se puede buscar desde el final de la lista
	var cont int = 0

	result = false
	index = -1
	for actual != nil {
		if actual.Dato.Carnet == element_value {
			result = true
			index = cont
		}
		cont++
		actual = actual.Siguiente
	}

	return
}

// Borrar en cualquier posicion
// ---->Por posicion
func (d *Lista_doble) Delete_item_index(index int) (e string) {
	var actual *NodoD = d.Cabeza

	e = ""

	if index+1 <= d.Size {
		for i := 0; i <= index; i++ {
			if i == index {
				if actual.Anterior != nil {
					actual.Anterior.Siguiente = actual.Siguiente
					actual.Anterior = nil
				}
				if actual.Siguiente != nil {
					actual.Siguiente.Anterior = actual.Anterior
					actual.Siguiente = nil
				}

			}
			actual = actual.Siguiente
		}
	} else {
		e = "El indice no se ecuentra dentro del rango"
	}

	return
}

// ---->por valor
func (d *Lista_doble) Delete_value(element_value int) (e string) {
	var actual *NodoD = d.Cabeza
	var cont int = 0
	var repeticion int = 0

	e = "El item no existe"

	for actual != nil {
		if actual.Dato.Carnet == element_value && repeticion == 0 {
			d.Delete_item_index(cont)
			repeticion++
			e = ""
		}
		cont++
		actual = actual.Siguiente
	}

	return
}

// Modificar los elementos de la pila
func (d *Lista_doble) Modify_pila(carnet int, newaccion string, newtime string) {
	var actual *NodoD = d.Cabeza
	for i := 0; i < d.Size; i++ {
		if actual.Dato.Carnet == carnet {
			actual.Pila_inicios.Apilar(newaccion, newtime)
		}
		actual = actual.Siguiente
	}

}

// Modificar elemento segun un valor unico (puede hacerse tambien en la lista simple)
func (d *Lista_doble) Modify_element_index(id int, newname string, newpass string) (e string) {
	var actual *NodoD = d.Cabeza

	e = "El elemento a modificar no existe"

	for actual != nil {
		if actual.Dato.Carnet == id {
			actual.Dato.Nombre = newname
			actual.Dato.Contraseña = newpass
			e = ""
		}
		actual = actual.Siguiente
	}

	return
}

// Verificar si la lista esta vacia
func (d *Lista_doble) Esta_vacia() bool {
	return d.Size == 0
}

// Imprimir datos en la lista doble
func (d *Lista_doble) Print_ListDouble() {
	var actual *NodoD = d.Cabeza

	for actual != nil {
		fmt.Printf("Nombre: %s Carnet: %d \n", actual.Dato.Nombre, actual.Dato.Carnet)
		fmt.Println("---------------------------------------------")
		actual = actual.Siguiente
	}

}
