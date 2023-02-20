/*
Autor: DM
Año: 2023
*/
package admin_funcion

import (
	"fmt"
	"paquetes_modulo/doublelist"
	"paquetes_modulo/queue"
	"paquetes_modulo/stack"
)

func Tablero_Admin(lista_student_record *doublelist.Lista_doble, cola_student *queue.Cola, pila_record_admin *stack.Pila) {
	//Declaracion de variables
	var opcion int
	var retorno int = 0

	// Area de codigo
	for retorno == 0 {

		menu_admin :=
			`
=== DASHBOARD ADMINISTRADOR - EDD GoDrive ===
=    1. Ver Estudiantes Pendientes          =
=    2. Ver Estudiantes del Sistema         =
=    3. Registrar Nuevo Estudiante          =
=    4. Carga Masiva de Estudiantes         =
=    5. Cerrar Sesion                       =
=============================================
`
		fmt.Print(menu_admin)
		fmt.Print("Opcion: ")
		fmt.Scan(&opcion)

		switch opcion {
		case 1:
			Ver_pendiente(cola_student, lista_student_record, pila_record_admin)
			retorno = 0
		case 2:
			Ver_sistema(lista_student_record)
			retorno = 0
		case 3:
			Agregar_estudiante(cola_student)
			retorno = 0
		case 4:
			Carga_masiva(cola_student)
			retorno = 0
		default:
			fmt.Println("Cerrando sesion....")
			retorno = 1
		}
	}

}
