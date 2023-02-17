package main

import (
	"fmt"
	"time"
)

//SECCION DEL ADMINISTRADOR

func Ver_pendiente() {

	//Declaracion de variables
	var opcion int
	var retorno int = 0

	//Area de codigo
	fmt.Println("")
	fmt.Println("=== Estudiantes Pendientes - EDD GoDrive ====")
	for retorno == 0 {

		fmt.Println("")
		fmt.Println("=============== Pendientes:   ============== ")
		fmt.Println("Estudiante Actual: ")
		menu_pendiente :=
			`
=         1. Aceptar al Estudiante          =
=         2. Rechazar al Estudiante         =
=         3. Volver al Menu                 =
=============================================
`
		fmt.Print(menu_pendiente)
		fmt.Print("Opcion: ")
		fmt.Scan(&opcion)

		switch opcion {
		case 1:
			fmt.Println("Se ha aceptado al estudiante")
			retorno = 0
		case 2:
			fmt.Println("Se ha rechazado al estudiante")
			retorno = 0
		default:
			fmt.Println("Volver menu....")
			retorno = 1
		}
		fmt.Println("---------------------------------------------")
		time.Sleep(1 * time.Second)
	}
}

func Ver_sistema() {
	//Declaracion de variables
	var tecla string

	//Area de codigo
	fmt.Println("")
	fmt.Println("=== Listado de Estudiantes - EDD GoDrive ====")
	fmt.Println("---------------------------------------------")
	fmt.Println("Nombre:                 Carnet:              ")
	fmt.Println("---------------------------------------------")
	fmt.Println("=============================================")
	fmt.Print("Presione la tecla s para salir...")
	fmt.Scan(&tecla)

}

func Agregar_estudiante() {
	//Declaracion de variables
	var nombre string
	var apellido string
	var carnet string
	var contraseña string

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
}

func Carga_masiva() {
	//Declaracion de variables
	var direccion string

	//Area de codigo
	fmt.Println("")
	fmt.Println("=== Registro de Estudiantes - EDD GoDrive ===")
	fmt.Println("")
	fmt.Print("Ingrese Direccion de archivo: ")
	fmt.Scan(&direccion)
}

//INICIO SESION

func Incio_sesion() {

	//Declaracion de variables
	var opcion int
	var retorno int = 0

	// Codigo
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
			Ver_pendiente()
			retorno = 0
		case 2:
			Ver_sistema()
			retorno = 0
		case 3:
			Agregar_estudiante()
			retorno = 0
		case 4:
			Carga_masiva()
			retorno = 0
		default:
			fmt.Println("Cerrando sesion....")
			retorno = 1
		}
	}

}

//SECCION DE USUARIOS --- Principal

func main() {

	// Declaracion de variables
	var opcion int
	var retorno int = 0

	// Codigo
	for retorno == 0 {

		menu_principal :=
			`
=============== EDD GoDrive ===============
=    1. Iniciar Sesion                    =
=    2. Salir del Sistema                 =
===========================================
`
		fmt.Print(menu_principal)
		fmt.Print("Opcion: ")

		fmt.Scan(&opcion)

		switch opcion {
		case 1:
			Incio_sesion()
			retorno = 0
		default:
			retorno = 1
		}

	}

}
