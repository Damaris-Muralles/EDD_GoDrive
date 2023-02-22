/*
Autor: DM
Año: 2023
*/
package admin_funcion

import (
	"encoding/csv"
	"fmt"
	"os"
	"paquetes_modulo/estructuras/queue"
	"strconv"
	"time"
)

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
		fmt.Println("No se pudo encontrar el archivo")
	} else {
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
				cola_student.Encolar(datosl[1], carne, datosl[2])
			}
			contador++
		}

		fmt.Println("Se han cargado correctamente los datos")

	}
	time.Sleep(1 * time.Second)
}
