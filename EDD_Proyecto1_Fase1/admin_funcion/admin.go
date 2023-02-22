/*
Autor: DM
Año: 2023
*/
package admin_funcion

import (
	"fmt"
	"paquetes_modulo/estructuras/doublelist"
	"paquetes_modulo/estructuras/queue"
	"paquetes_modulo/estructuras/simple_list"
	"paquetes_modulo/estructuras/stack"
)

func Tablero_Admin(path string, bitacora_student *simple_list.Lista_simple, lista_student_record *doublelist.Lista_doble, cola_student *queue.Cola, pila_record_admin *stack.Pila) {
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
=    5. Reporte Json                        =
=    6. Cerrar Sesion                       =
=============================================
`
		fmt.Print(menu_admin)
		fmt.Print("Opcion: ")
		fmt.Scan(&opcion)

		switch opcion {
		case 1:
			Ver_pendiente(path, bitacora_student, cola_student, lista_student_record, pila_record_admin)
			retorno = 0
		case 2:
			Ver_sistema(lista_student_record)
			retorno = 0
		case 3:
			Agregar_estudiante(path, cola_student)
			retorno = 0
		case 4:
			Carga_masiva(path, cola_student)
			retorno = 0
		case 5:
			Report_json(path,lista_student_record)
			
			retorno = 0
		default:
			fmt.Println("Cerrando sesion....")
			retorno = 1
		}
	}

}
