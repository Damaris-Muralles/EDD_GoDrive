/*
Autor: DM
Año: 2023
*/
package admin_funcion

import (
	"fmt"
	"paquetes_modulo/estructuras/doublelist"
	"paquetes_modulo/estructuras/queue"
	"paquetes_modulo/estructuras/stack"
	"time"
)

func Tablero_Admin(path string, lista_student_record *doublelist.Lista_doble, cola_student *queue.Cola, pila_record_admin *stack.Pila) {
	//Declaracion de variables
	var opcion int
	var report int
	var retorno int = 0
	var retornor int

	// Area de codigo
	for retorno == 0 {
		retornor = 0
		menu_admin :=
			`
=== DASHBOARD ADMINISTRADOR - EDD GoDrive ===
=    1. Ver Estudiantes Pendientes          =
=    2. Ver Estudiantes del Sistema         =
=    3. Registrar Nuevo Estudiante          =
=    4. Carga Masiva de Estudiantes         =
=    5. Reportes                            =
=    6. Cerrar Sesion                       =
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
		case 5:
			menu_reporte :=
				`
========== Reportes - EDD GoDrive ===========
=    1. Reporte de la pila del admin        =
=    2. Reporte de cola de espera           =
=    3. Reporte de estudiantes registrados  =
=    4. Reporte de bitacora de estudiantes  =
=    5. Reporte Json                        =
=    6. Salir                               =
=============================================

`
			for retornor == 0 {
				fmt.Print(menu_reporte)
				fmt.Print("Ver reporte: ")
				fmt.Scan(&report)
				switch report {
				case 1:
					pila_record_admin.Graph(path)
					fmt.Println("Se genero reporte de la pila del administrador")
				case 2:
					cola_student.Graph(path)
					fmt.Println("Se genero reporte de la cola")
				case 3:
					lista_student_record.Graph(0, path)
					fmt.Println("Se genero reporte de la lista doble, excluyendo la pila")
				case 4:
					lista_student_record.Graph(1, path)
					fmt.Println("Se genero reporte de la lista doble y pila de los estudiantes")
				case 5:
					Report_json(path, lista_student_record)
				default:
					retornor = 1
				}
				time.Sleep(1 * time.Second)
			}
			retorno = 0
		default:
			fmt.Println("Cerrando sesion....")
			retorno = 1
		}
	}

}
