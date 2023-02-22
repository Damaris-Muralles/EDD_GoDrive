/*
Autor: DM
Año: 2023
*/

package stack

import (
	"fmt"
	"paquetes_modulo/crear_archivos"
)

func (p *Pila) Graph(direccion string) {

	actual := p.Cabeza

	dot := `
digraph G {
	rankdir =LR
	node [shape=record, colorscheme=ylgnbu9,style=filled, color=white];
	bgcolor=	midnightblue;
	fontcolor=white;
	fontname="Comic Sans MS";
	subgraph cluster_0 {
		color=	midnightblue;
		label = "Pila del Administrador";
		struct1 [fillcolor=5,label="
	`
	nodos := ""

	for j := 0; j < p.Size; j++ {
		if j == p.Size-1 {
			nodos += fmt.Sprintf(`%s&#92;n %s"];
	}
}`, actual.Dato.Accion, actual.Dato.FechaHora)
		} else {
			nodos += fmt.Sprintf(`%s&#92;n %s|`, actual.Dato.Accion, actual.Dato.FechaHora)
		}

		actual = actual.Siguiente
	}

	dot += nodos

	path := fmt.Sprintf(`%s\reportes\reportes_pila_admin\reporte_acciones_admin.dot`, direccion)
	crear_archivos.Create_newfile(path, dot)
	crear_archivos.Png_generate(path)
}
