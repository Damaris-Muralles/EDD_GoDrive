/*
Autor: DM
Año: 2023
*/
package crear_archivos

import (
	"os"
	"os/exec"
	"strings"
)

func Png_generate(direccion string) {
	pathdot, _ := exec.LookPath("dot")
	cmd, _ := exec.Command(pathdot, "dot", "-Tpng", direccion).Output()

	mode := int(0777)
	os.WriteFile(strings.Replace(direccion, ".dot", ".png", -1), cmd, os.FileMode(mode))

}
