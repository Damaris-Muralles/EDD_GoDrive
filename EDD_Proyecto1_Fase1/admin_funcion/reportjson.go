/*
Autor: DM
Año: 2023
*/

package admin_funcion

import (
	//"encoding/json"
	"fmt"
	"paquetes_modulo/crear_archivos"
	"paquetes_modulo/estructuras/doublelist"
)

func Report_json(direccion string, lista_student_record *doublelist.Lista_doble) {

	contenido := `{
	"alumnos":[`

	for i := 0; i < lista_student_record.Size; i++ {
		datosu, _ := lista_student_record.Get_element(i)
		if i != lista_student_record.Size-1 {
			contenido += fmt.Sprintf(`
		{
			"nombre": "%s",
			"carnet": %d,
			"password": "%s",
			"carpeta_raiz": "/"
		},`, datosu.Nombre, datosu.Carnet, datosu.Contraseña)
		} else {
			contenido += fmt.Sprintf(`
		{
			"nombre": "%s",
			"carnet": %d,
			"password": "%s",
			"carpeta_raiz": "/"
		}
	]
}`, datosu.Nombre, datosu.Carnet, datosu.Contraseña)
		}

	}

	path := fmt.Sprintf(`%s\reportes\reporte_json\alumnos.json`, direccion)
	crear_archivos.Create_newfile(path, contenido)
	fmt.Println("Se genero archivo JSON")

	/*
		alumn, err := json.MarshalIndent(alumnos, "", "  ")
		if err != nil {
			fmt.Printf("Error al codficar: %v", err)
		} else {
			fmt.Println(string(alumn))
		}*/

}
