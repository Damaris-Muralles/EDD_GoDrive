/*
Autor: DM
Año: 2023
*/
package crear_archivos

import (
	"fmt"
	"os"
)

func Create_newfile(direccion string, contenido string) {
	//Crea el archivo
	var _, err = os.Stat(direccion)
	if os.IsNotExist(err) {
		var file, err = os.Create(direccion)
		if err != nil {
			fmt.Println(err.Error())
		}
		defer file.Close()
	} else {
		// Elimina archivo existente
		err := os.Remove(direccion)
		if err == nil {
			var file, err = os.Create(direccion)
			if err != nil {
				fmt.Println(err.Error())
			}
			defer file.Close()
		}
	}

	var file, _ = os.OpenFile(direccion, os.O_RDWR, 0644)

	// Escribir
	_, err = file.WriteString(contenido)
	if err != nil {
		fmt.Println(err.Error())
	}
	// Guardar los cambios
	err = file.Sync()
	if err != nil {
		fmt.Println(err.Error())
	}

}
