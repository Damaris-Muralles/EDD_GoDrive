/*
Autor: DM
Año: 2023
*/

package doublelist

import (
	"fmt"
	"paquetes_modulo/crear_archivos"
	"paquetes_modulo/estructuras/simple_list"
)

func (d *Lista_doble) Graph(op int, direccion string, pilas *simple_list.Lista_simple) {

	actual := d.Cabeza
	dot := `
	digraph G {
		bgcolor="midnightblue";
		fontcolor=white;
		fontname="Comic Sans MS";
		label="Lista de estudiantes registrados";
		node [shape=record, colorscheme=ylgnbu9, style=filled, color=white];
		rankdir=LR;
		
		f0 [ label ="Null" ];
		f1[ label ="Null" ];
	`
	nodos := ""
	relaciones := "    f0->"
	cont1 := 0

	for j := 0; j < d.Size; j++ {
		bitacora := ""
		if pilas.Size > 0 {
			aux := pilas.Cabeza
			for i := 0; i < pilas.Size; i++ {
				if aux.Datos.Carnet == actual.Dato.Carnet {
					if aux.Datos.Pila_inicios.Size > 0 {
						bitacora += fmt.Sprintf("struct%d [fillcolor=3, label=\"", j)
						temp := aux.Datos.Pila_inicios.Cabeza
						for temp.Siguiente != nil {
							bitacora += fmt.Sprintf("%s&#92;n %s|", temp.Dato.Accion, temp.Dato.FechaHora)
							temp = temp.Siguiente

						}
						bitacora += fmt.Sprintf("%s&#92;n %s\"];", temp.Dato.Accion, temp.Dato.FechaHora)

					}
				}
				aux = aux.Siguiente
			}
		}

		nodos += fmt.Sprintf(`
	subgraph cluster_%d {
        style=filled;
		color="lightsteelblue";
		label = "Estudiante #%d";
        n%d [label="Carnet: %d&#92;n Nombre: %s", fillcolor=5];
	    %s	
	}`, cont1, cont1, cont1, actual.Dato.Carnet, actual.Dato.Nombre, bitacora)

		if cont1 < d.Size-1 {
			if cont1 == 0 {
				relaciones += fmt.Sprintf(`n%d[dir="none", color="white"]
	n%d->`, cont1, cont1)
			} else {

				relaciones += fmt.Sprintf(`n%d[color="white"]
	n%d->`, cont1, cont1)
			}

		} else {
			relaciones += fmt.Sprintf(`n%d[color="white"]
	n%d->f1[ color="white"]`, cont1, cont1)
		}

		actual = actual.Siguiente
		cont1++
	}

	actual = d.Final
	for j := d.Size - 1; j > -1; j-- {
		if j != 0 {
			if j == 1 {
				relaciones += fmt.Sprintf(`n%d[color="white"]
	n%d->`, j, j)
			} else {
				relaciones += fmt.Sprintf(`
	n%d->`, j)

			}
		} else {
			relaciones += fmt.Sprintf(`n%d[ color="white"]`, j)
		}
		actual = actual.Anterior
	}

	dot += nodos + "\n" + relaciones + "\n}"
	path := ""
	if op == 0 {
		path = fmt.Sprintf(`%s\reportes\reportes_lista_doble\reporte_estudiantes.dot`, direccion)
	} else {
		path = fmt.Sprintf(`%s\reportes\reportes_inicio_sesion\reporte_sesion_estudiantes.dot`, direccion)
	}

	crear_archivos.Create_newfile(path, dot)
	crear_archivos.Png_generate(path)
}
