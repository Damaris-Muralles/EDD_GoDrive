/*
Autor: DM
Año: 2023
*/
package admin_funcion

import (
	"fmt"
	"paquetes_modulo/doublelist"
)

func Ver_sistema(lista_student_record *doublelist.Lista_doble) {
	//Declaracion de variables
	var tecla string

	//Area de codigo
	fmt.Println("")
	fmt.Println("=== Listado de Estudiantes - EDD GoDrive ====")
	fmt.Println("---------------------------------------------")
	if !lista_student_record.Esta_vacia() {
		lista_student_record.Print_ListDouble()

	}
	fmt.Println("=============================================")

	fmt.Print("Presione la tecla s para salir...")
	fmt.Scan(&tecla)

}
