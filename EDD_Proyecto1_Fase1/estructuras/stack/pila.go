/*
Autor: DM
Año: 2023
*/

package stack

import "fmt"

// Estructura creada para los datos de los usuarios
type Actions_admin struct {
	Accion    string
	FechaHora string
}

// Estructura para la creacion de la cola
type NodoP struct {
	Dato      *Actions_admin
	Siguiente *NodoP
}

type Pila struct {
	Cabeza *NodoP
	Size   int
}

// FUNCIONES DE LA PILA
// Agregar nuevo elemento en la pila
func (p *Pila) Apilar(accion_r string, tiempo string) {

	var DatosA *Actions_admin = &Actions_admin{accion_r, tiempo}

	Node := &NodoP{
		Dato:      DatosA,
		Siguiente: p.Cabeza,
	}
	p.Cabeza = Node

	p.Size += 1

}

// Eliminar el utimo elemento agregado a la pila
func (p *Pila) Desapilar() {
	p.Cabeza = p.Cabeza.Siguiente
	p.Size -= 1
}

// Verificar si la pila esta vacia
func (p *Pila) Esta_vacia() bool {
	return p.Size == 0
}

// Primer elemento en la pila (es el ultimo elemento agregado)
func (p *Pila) Get_last_element() (Dato_obtenido *Actions_admin) {
	Dato_obtenido = p.Cabeza.Dato
	return
}

// Buscar elemento y devolver posicion ----> No se utiliza en este proyecto
func (p *Pila) Position_item(item_value string) (index int, e bool) {
	var actual *NodoP = p.Cabeza

	e = false

	for i := 0; i < p.Size; i++ {
		if actual.Dato.FechaHora == item_value { //condicional de ejemplo
			index = i
			e = true
		}
		actual = actual.Siguiente
	}
	return
}

// Modificar datos del ultimo elemento agregado----> No se utiliza en este proyecto
func (p *Pila) Modify_last_element(accion string, tiempo string) {
	p.Cabeza.Dato.Accion = accion
	p.Cabeza.Dato.FechaHora = tiempo
}

// Imprimir datos en la pila
func (p *Pila) Print_stack() {
	var actual *NodoP = p.Cabeza

	for actual != nil {
		fmt.Println(actual.Dato.Accion, actual.Dato.FechaHora)
		actual = actual.Siguiente
	}

}
