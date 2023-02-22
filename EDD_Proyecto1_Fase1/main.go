/*
Autor: DM
Año: 2023
*/

package main

import (
	"fmt"
	"log"
	"os"
	"paquetes_modulo/admin_funcion"
	"paquetes_modulo/estructuras/doublelist"
	"paquetes_modulo/estructuras/queue"
	"paquetes_modulo/estructuras/simple_list"
	"paquetes_modulo/estructuras/stack"
	"strconv"
	"time"
)

// INICIO DE SESION
func Incio_sesion(path string, bitacora_student *simple_list.Lista_simple, lista_student_record *doublelist.Lista_doble, cola_student *queue.Cola, pila_record_admin *stack.Pila) {

	//Declaracion de variables
	var users string
	var password string

	//Area de codigo

	fmt.Print("Ingrese su Usuario: ")
	fmt.Scan(&users)
	fmt.Print("Ingrese su Contraseña: ")
	fmt.Scan(&password)

	//---> Validar datos para admin
	if users == "admin" {
		if password == "admin" {
			admin_funcion.Tablero_Admin(path, bitacora_student, lista_student_record, cola_student, pila_record_admin)
		} else {
			fmt.Println("La contraseña es incorrecta")
			time.Sleep(1 * time.Second)
		}

	} else {
		//---> Validar datos para usuarios
		if !lista_student_record.Esta_vacia() {
			carnet, er := strconv.Atoi(users)
			result, indice := lista_student_record.Search_item(carnet)

			if result {
				datos_start, e := lista_student_record.Get_element(indice)

				if datos_start.Contraseña == password {
					tiempo := time.Now()
					fechayhora := fmt.Sprintf("%02d/%02d/%d %02d:%02d:%02d",
						tiempo.Day(), tiempo.Month(), tiempo.Year(),
						tiempo.Hour(), tiempo.Minute(), tiempo.Second())

					if !bitacora_student.Esta_vacia() {
						last, b := bitacora_student.Search_element(carnet)

						if last {
							bitacora_student.Modify_element(b, "Se inició sesión", fechayhora)
						} else {
							bitacora_student.Add_end(carnet, datos_start.Nombre, "Se inició sesión", fechayhora)
						}

					} else {
						bitacora_student.Add_end(carnet, datos_start.Nombre, "Se inició sesión", fechayhora)
					}

					fmt.Println("Se inició sesión correctamente")
					time.Sleep(1 * time.Second)

					//Se modifica la grafica creada
					lista_student_record.Graph(1, path, bitacora_student)
				} else {
					fmt.Println("La contraseña es incorrecta")
					time.Sleep(1 * time.Second)
				}

				if e != "" {
					fmt.Println(e)
					time.Sleep(1 * time.Second)
				}

			} else {
				fmt.Println("No se ha encontrado en lista de estudiantes registrados")
				time.Sleep(1 * time.Second)
			}

			if er != nil {
				fmt.Println("Error en el nombre de usuario")
				time.Sleep(1 * time.Second)
			}

		} else {
			fmt.Println("No se ha encontrado en lista de estudiantes registrados")
			time.Sleep(1 * time.Second)
		}
	}

}

//FUNCION PRINCIPAL

func main() {

	// Declaracion e inicializacion de variables
	var opcion int
	var retorno int = 0
	var lista_student_record doublelist.Lista_doble = doublelist.Lista_doble{}
	var bitacora_student = simple_list.Lista_simple{}
	var cola_student = queue.Cola{}
	var pila_record_admin = stack.Pila{}

	// Area de odigo

	path, er := os.Getwd()
	if er != nil {
		log.Println(er)
	}
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
			Incio_sesion(path, &bitacora_student, &lista_student_record, &cola_student, &pila_record_admin)
			retorno = 0
		default:
			retorno = 1
		}

	}

}
