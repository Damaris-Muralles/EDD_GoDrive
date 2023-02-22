/*
Autor: DM
Año: 2023
*/

package queue

import (
	"fmt"
	"paquetes_modulo/crear_archivos"
)

func (c *Cola) Graph(direccion string) {

	actual := c.Principio

	dot := `
digraph G {
	rankdir=LR
	node [shape=record, colorscheme=ylgnbu9,style=filled, color=white];
	bgcolor="midnightblue";
	fontcolor=white;
	fontname="Comic Sans MS";
	subgraph cluster_0 {
		color="midnightblue";
		label = "Cola de estudiantes";
		f0[shape=cds,fillcolor=4, label="Primer estudiante en cola"];
		f1[shape=rarrow,fillcolor=4, label="Null"];
	`
	nodos := ""
	relaciones := "    f0->"

	for j := 0; j < c.Size; j++ {
		nodos += fmt.Sprintf(`
		n%d[fillcolor=5,label="Carnet: %d&#92;n Nombre: %s"];
		`, j, actual.Dato.Carnet, actual.Dato.Nombre)

		if j < c.Size-1 {
			if j == 0 {
				relaciones += fmt.Sprintf(`n%d[dir ="none" color="midnightblue"];
	n%d->`, j, j)
			} else {
				relaciones += fmt.Sprintf(`n%d[color="white"]
	n%d->`, j, j)
			}

		} else {
			relaciones += fmt.Sprintf(`n%d[color="white"]
	n%d->f1[ color="white"]`, j, j)
		}

		actual = actual.Siguiente

	}

	dot += nodos + "    }\n" + relaciones + "\n}"

	if c.Size != 0 {

		path := fmt.Sprintf(`%s\reportes\reportes_cola\reporte_cola_espera.dot`, direccion)

		crear_archivos.Create_newfile(path, dot)
		crear_archivos.Png_generate(path)
	}

}
