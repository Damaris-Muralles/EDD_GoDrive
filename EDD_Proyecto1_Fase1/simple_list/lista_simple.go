/*
Autor: DM
Año: 2023
*/

package simple_list

import (
	"fmt"
	"paquetes_modulo/stack"
)

type Actions_users struct {
	Carnet       int
	Nombre       string
	Pila_inicios *stack.Pila
}

// Estructura para la creacion de la cola
type NodoS struct {
	Datos     *Actions_users
	Siguiente *NodoS
}

type Lista_simple struct {
	Cabeza *NodoS
	Cola   *NodoS
	Size   int
}

// FUNCIONES DE LA LISTA SIMPLE

// Insertar nuevo dato al final de la lista (igual que una cola,pero el comportamiento es distinto)
func (s *Lista_simple) Add_end(carnet int, nombre string, accion_r string, tiempo string) {
	var stack_student = stack.Pila{}
	stack_student.Apilar(accion_r, tiempo)
	var AddDatos *Actions_users = &Actions_users{carnet, nombre, &stack_student}

	Node := &NodoS{
		Datos:     AddDatos,
		Siguiente: nil,
	}

	if s.Size == 0 {
		s.Cabeza = Node
	} else {
		s.Cola.Siguiente = Node
	}
	s.Cola = Node
	s.Size += 1
}

// Insertar nuevo dato al inicio de la lista (igual que una pila,pero el comportamiento es distinto)
func (s *Lista_simple) Add_top(carnet int, nombre string, accion_r string, tiempo string) {
	var stack_student = stack.Pila{}
	stack_student.Apilar(accion_r, tiempo)
	var AddDatos *Actions_users = &Actions_users{carnet, nombre, &stack_student}

	Node := &NodoS{
		Datos:     AddDatos,
		Siguiente: nil,
	}

	if s.Size == 0 {
		s.Cola = Node
	} else {
		Node.Siguiente = s.Cabeza
	}
	s.Cabeza = Node
	s.Size += 1
}

// Obtener elemento de una posicion indicada
func (s *Lista_simple) Get_element(index int) (elemento_obtenido *Actions_users, e string) {
	var actual *NodoS = s.Cabeza

	elemento_obtenido = nil
	e = ""

	if index+1 <= s.Size {
		for i := 0; i <= index; i++ {
			if i == index {
				elemento_obtenido = actual.Datos
			}
			actual = actual.Siguiente
		}
	} else {
		e = "El indice no se ecuentra dentro del rango"
	}
	return
}

// Modificar elemento de  la lista en posicion indicada
func (s *Lista_simple) Modify_element(index int, newaccion string, newtime string) (e string) {
	var actual *NodoS = s.Cabeza

	e = ""

	if index+1 <= s.Size {
		for i := 0; i <= index; i++ {
			if i == index {
				actual.Datos.Pila_inicios.Apilar(newaccion, newtime) //tambien se puede modificar un elemento especifico si se desea
			}
			actual = actual.Siguiente
		}
	} else {
		e = "El indice no se ecuentra dentro del rango"
	}
	return
}

// Buscar elemento en la lista y retornar el indice
func (s *Lista_simple) Search_element(element_value int) (result bool, index int) {

	var actual *NodoS = s.Cabeza
	var cont int = 0

	result = false
	index = -1
	for actual != nil {
		if actual.Datos.Carnet == element_value {
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
func (s *Lista_simple) Delete_index(index int) (e string) {
	var actual *NodoS = s.Cabeza

	e = ""

	if index+1 <= s.Size {
		for i := 0; i <= index; i++ {
			if i == index-1 {
				temp := actual.Siguiente
				actual.Siguiente = actual.Siguiente.Siguiente
				temp.Siguiente = nil

			}
			actual = actual.Siguiente
		}
	} else {
		e = "El indice no se ecuentra dentro del rango"
	}

	return
}

// ---->por valor
func (s *Lista_simple) Delete_element(element_value int) (e string) {
	var actual *NodoS = s.Cabeza
	var cont int = 0
	var repeticion int = 0

	e = "El item no existe"

	for actual != nil {
		if actual.Datos.Carnet == element_value && repeticion == 0 {
			s.Delete_index(cont)
			repeticion++
			e = ""
		}
		cont++
		actual = actual.Siguiente
	}

	return
}

// Verificar si la lista esta vacia
func (s *Lista_simple) Esta_vacia() bool {
	return s.Size == 0
}

// Graficar en graphviz

// Imprimir datos en la lista simple
func (s *Lista_simple) Print_Listsimple() {

	var actual *NodoS = s.Cabeza

	for actual != nil {
		fmt.Println(actual.Datos.Carnet, actual.Datos.Pila_inicios)
		actual.Datos.Pila_inicios.Print_stack()
		actual = actual.Siguiente
	}

}
