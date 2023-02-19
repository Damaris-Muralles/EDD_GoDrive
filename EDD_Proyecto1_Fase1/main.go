package main

import (
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
	"time"

	//"paquetes_modulo/stack"
	//"paquetes_modulo/doublelist"
	"paquetes_modulo/queue"
)

//SECCION DEL ADMINISTRADOR

func Ver_pendiente(cola_student *queue.Cola) {

	//Declaracion de variables
	var opcion int
	var retorno int = 0

	//Area de codigo
	fmt.Println("")
	cola_student.Imprint()
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
			nom := cola_student.GetFirtS()
			fmt.Printf("Estudiante Actual: %s \n", nom)
			fmt.Print(menu_pendiente)
		} else {
			fmt.Println("       NO HAY MAS ESTUDIANTES EN COLA        ")
			fmt.Println("=         3. Volver al Menu                 =")
			fmt.Println("=============================================")
		}

		fmt.Print("Opcion: ")
		fmt.Scan(&opcion)

		switch opcion {
		case 1:
			fmt.Println("Se ha aceptado al estudiante")
			cola_student.DeleteS()
			retorno = 0
		case 2:
			fmt.Println("Se ha rechazado al estudiante")
			cola_student.DeleteS()
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

func Agregar_estudiante(cola_student *queue.Cola) {
	//Declaracion de variables
	var nombre string
	var apellido string
	var nombrecompleto string
	var carnet int
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
	nombrecompleto = nombre + " " + apellido

	cola_student.InsertS(nombrecompleto, carnet, contraseña)

}

func Carga_masiva(cola_student *queue.Cola) {
	//Declaracion de variables
	var direccion string
	var contador int = 0

	//Area de codigo
	fmt.Println("")
	fmt.Println("=== Registro de Estudiantes - EDD GoDrive ===")
	fmt.Println("")
	fmt.Print("Ingrese Direccion de archivo: ")
	fmt.Scan(&direccion)

	archivo, error := os.Open(direccion)
	if error != nil {
		panic(error)
	}
	defer archivo.Close()

	leer := csv.NewReader(archivo)
	leer.Comma = ','

	for {
		datosl, d := leer.Read()
		if d != nil {
			break
		}
		if contador > 0 {
			carne, err := strconv.Atoi(datosl[0])
			if err != nil {
				break
			}
			cola_student.InsertS(datosl[1], carne, datosl[2])
		}
		contador++
	}

	fmt.Println("")
	fmt.Println("Se han cargado correctamente los datos")
	time.Sleep(1 * time.Second)

}

func Tablero_Admin() {
	//Declaracion de variables
	var opcion int
	var retorno int = 0
	var cola_student = queue.Cola{}

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
			Ver_pendiente(&cola_student)
			retorno = 0
		case 2:
			Ver_sistema()
			retorno = 0
		case 3:
			Agregar_estudiante(&cola_student)
			retorno = 0
		case 4:
			Carga_masiva(&cola_student)
			retorno = 0
		default:
			fmt.Println("Cerrando sesion....")
			retorno = 1
		}
	}
}

//INICIO SESION

func Incio_sesion() {

	//Declaracion de variables
	var users string
	var password string

	//Area de codigo
	fmt.Print("Ingrese su Usuario: ")
	fmt.Scan(&users)
	fmt.Print("Ingrese su Contraseña: ")
	fmt.Scan(&password)

	if users == "admin" {
		if password == "admin" {
			Tablero_Admin()
		}
	}

}

//SECCION DE USUARIOS --- Principal

func main() {
	// Declaracion de variables
	var opcion int
	var retorno int = 0

	// Area de odigo
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
			//Incio_sesion()
			Tablero_Admin()
			retorno = 0
		default:
			retorno = 1
		}

	}

}
