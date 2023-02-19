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

//FUNCIONES DE LA PILA
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

// Eliminar el elemento de la pila
func (p *Pila) Desapilar() {
	p.Cabeza = p.Cabeza.Siguiente
	p.Size -= 1
}

//Verificar si la pila esta vacia
func (c *Pila) Esta_vacia() bool {
	return c.Size == 0
}


//primer elemento
//graficar
//buscar

//Imprimir datos en la pila
func (p *Pila) Print_stack() {
	var actual *NodoP = p.Cabeza

	for actual != nil {
		fmt.Println(actual.Dato.Accion, actual.Dato.FechaHora)
		actual = actual.Siguiente
	}

}
