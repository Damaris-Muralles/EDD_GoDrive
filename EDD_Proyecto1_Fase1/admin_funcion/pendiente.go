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

func Ver_pendiente(cola_student *queue.Cola, lista_student_record *doublelist.Lista_doble, pila_record_admin *stack.Pila) {

	//Declaracion de variables
	var opcion int
	var retorno int = 0
	var datos_student *queue.Student
	//Area de codigo
	fmt.Println("")
	fmt.Println("=== Estudiantes Pendientes - EDD GoDrive ====")
	for retorno == 0 {

		fmt.Println("")
		fmt.Printf("=============== Pendientes: %d ==============\n", cola_student.Size)
		menu_pendiente :=
			`
=         1. Aceptar al Estudiante          =
=         2. Rechazar al Estudiante         =
=         3. Volver al Menu                 =
=============================================
`

		if cola_student.Size > 0 {
			datos_student = cola_student.Get_first_element()
			fmt.Printf("Estudiante Actual: %s \n", datos_student.Nombre)
			fmt.Print(menu_pendiente)
		} else {
			fmt.Println("       NO HAY MAS ESTUDIANTES EN COLA        ")
			fmt.Println("=         3. Volver al Menu                 =")
			fmt.Println("=============================================")
		}

		fmt.Print("Opcion: ")
		fmt.Scan(&opcion)

		//tiempo actual en donde se realizo la accion
		tiempo := time.Now()
		fechayhora := fmt.Sprintf("%02d/%02d/%d %02d:%02d:%02d",
			tiempo.Day(), tiempo.Month(), tiempo.Year(),
			tiempo.Hour(), tiempo.Minute(), tiempo.Second())

		switch opcion {
		case 1:
			fmt.Println("Se ha aceptado al estudiante")
			lista_student_record.Insert(datos_student)
			cola_student.Desencolar()
			pila_record_admin.Apilar("Se aceptó a estudiante", fechayhora)
			retorno = 0
		case 2:
			fmt.Println("Se ha rechazado al estudiante")
			cola_student.Desencolar()
			pila_record_admin.Apilar("Se rechazó a estudiante", fechayhora)
			retorno = 0
		default:
			fmt.Println("Volver menu....")
			retorno = 1
		}
		fmt.Println("---------------------------------------------")
		time.Sleep(1 * time.Second)
	}
}
