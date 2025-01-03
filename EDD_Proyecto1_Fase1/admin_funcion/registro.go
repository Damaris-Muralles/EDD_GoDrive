/*
Autor: DM
Año: 2023
*/
package admin_funcion

import (
	"fmt"
	"paquetes_modulo/estructuras/queue"
	"time"
)

func Agregar_estudiante(cola_student *queue.Cola) {
	//Declaracion de variables
	var nombre string
	var apellido string
	var nombrecompleto string
	var carnet int
	var contraseña string
	var opcionr string

	//Area de codigo
	fmt.Println("")
	fmt.Println("=== Registro de Estudiantes - EDD GoDrive ===")
	fmt.Print("Ingrese Nombre: ")
	fmt.Scan(&nombre)
	fmt.Print("Ingrese Apellido: ")
	fmt.Scan(&apellido)
	fmt.Print("Ingrese Carnet: ")
	fmt.Scan(&carnet)
	fmt.Print("Ingrese Contraseña: ")
	fmt.Scan(&contraseña)
	fmt.Println("=============================================")
	nombrecompleto = nombre + " " + apellido

	cola_student.Encolar(nombrecompleto, carnet, contraseña)

	fmt.Print("Desea registrar otro estudiante s/n: ")
	fmt.Scan(&opcionr)
	switch opcionr {
	case "s":
		Agregar_estudiante(cola_student)
	default:
		fmt.Println("")
	}
	time.Sleep(1 * time.Second)
}
