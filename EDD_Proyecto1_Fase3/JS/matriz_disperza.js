
class MNodo{
    constructor(x, y, valor, format_b64,tipo ){
        this.x = x;
        this.y = y.toString();
        this.valor = valor;
        this.format_b64 =format_b64;
        this.tipo=tipo;
        this.arriba = null;
        this.abajo = null;
        this.derecha = null;
        this.izquierda = null;
    }
}

class SparseMatrix{

    constructor(carpeta){
        this.cabeza =  new MNodo("-1", -1, carpeta,null,"raiz");
        this.cantidad=0;
    }
    
    insertard(x,y,valor,contenido,tipoarchivo){
        console.log("insertando: ",x,y,valor,contenido,tipoarchivo)
      
        let cont=0;
        let existente=true;
        let nameaux=x;

        while(existente) {
            let fileExtension="";
            console.log("resilsdf")
            let resultb=this.buscarPorX(nameaux);
            console.log("result repeticion")
            if  (resultb==null){
                existente=false;
            }else{
                if(y=="NC"){
                    console.log("YA EXISTE UN ARCHIVO CON EL NOMBRE, SE CREO COPIA");
                    cont++;
                    console.log(x.split(".").pop())
                    fileExtension = "."+x.split(".").pop();
                    nameaux=x.split(".")[0];
                    nameaux = nameaux + "_Copia" + cont +fileExtension;
                    console.log("nombre: ",nameaux);
                }else{
                    existente=false;
                }
               
            }
        }
        x=nameaux;
        console.log("insertando1: ",x,y,valor,contenido,tipoarchivo)
        // CREAR CABECERAS DE LAS FILAS O EJE X
        this.#xcabezaers(x,tipoarchivo);
        // CREAR CABECERAS DE LAS COLUMNAS O EJE Y
        
        this.#ycabezaers(y);
        // CREAR EL NUEVO NODO
        const Nodo = new MNodo(x,y,valor,contenido,tipoarchivo);
     
        // AGREGAR AL EJE X
        this.#addX(Nodo, x);
        // AGREGAR AL EJE Y
        this.#addY(Nodo,y);
        this.cantidad++;
    }

    #xcabezaers(x,tipoarchivo){
        const n_actual = new MNodo("-1",-1, x,null,tipoarchivo);
        if(this.cabeza.abajo == null){
            this.cabeza.abajo = n_actual;
            n_actual.arriba = this.cabeza;
        }else{
            let aux = this.cabeza;

            // ENCONTRAR EL ESPACIO PARA LA CABECERA
            while(aux.abajo != null && aux.abajo.valor < x){
                aux = aux.abajo;
            }
            //INSERTAR AL FINAL SI ES ULTIMO
            if(aux.abajo == null){
                aux.abajo = n_actual;
                n_actual.arriba = aux;
            }else if(aux.abajo != null && aux.abajo.valor != x){
                // INSERCIÓN ENTRE NODOS
                let r = aux.abajo;
                aux.abajo = n_actual;
                n_actual.arriba = aux;
                n_actual.abajo = r;
                r.arriba = n_actual;
            }
        }
    }

    #ycabezaers(y){
        const n_actual = new MNodo("-1",-1, y,null,null);
        if(this.cabeza.derecha == null){
            this.cabeza.derecha = n_actual;
            n_actual.izquierda = this.cabeza;
        }else{
            let aux = this.cabeza;
    
            // ENCONTRAR EL ESPACIO PARA LA CABECERA
            while(aux.derecha != null && aux.derecha.valor < y){
                aux = aux.derecha;
            }
            //INSERTAR AL FINAL SI ES ULTIMO
            if(aux.derecha == null){
                aux.derecha = n_actual;
                n_actual.izquierda = aux;
            }else if(aux.derecha != null && aux.derecha.valor != y){
                // INSERCIÓN ENTRE NODOS
                let r = aux.derecha;
                aux.derecha = n_actual;
                n_actual.izquierda = aux;
                n_actual.derecha = r;
                r.izquierda = n_actual;
            }
        }
    }

    #addX(newNodo, x){
        let aux = this.cabeza;
        // BUSCAR LA CABECERA
        while(aux.valor != x){
            aux = aux.abajo;
        }
        // INSERCION SI LA FILA ESTA VACIA
        if(aux.derecha == null){
            aux.derecha = newNodo;
            newNodo.izquierda = aux;
        }else{
            let n_actual = aux.derecha;
            // INSERTAR ORDENADAMENTE
            if(n_actual.y >= newNodo.y){
                // CAMBIAR DE LUGAR CON EL PRIMERO DE LA LISTA
                newNodo.derecha = n_actual;
                newNodo.derecha.izquierda = newNodo;
                //ENLAZARLO A LA CABECERA
                newNodo.izquierda = aux
                aux.derecha = newNodo
                //ASIGNARLO AL PRIMERO DE LA LISTA
                n_actual = newNodo;
            }else{
                while(n_actual.derecha != null && n_actual.derecha.y < newNodo.y){
                    n_actual = n_actual.derecha;
                }
                newNodo.derecha = n_actual.derecha;
                if(n_actual.derecha != null){
                    newNodo.derecha.izquierda = newNodo;
                }
                n_actual.derecha = newNodo;
                newNodo.izquierda = n_actual;
            }
            
        }

    }
    
    #addY(newNodo, y){
        let aux = this.cabeza;
        // BUSCAR LA CABECERA
        while(aux.abajo != null && aux.valor != y){
            aux = aux.derecha;
        }
        // INSERCION SI LA FILA ESTA VACIA
        if(aux.abajo == null){
            aux.abajo = newNodo;
            newNodo.arriba = aux;
        }else{
            let n_actual = aux.abajo;
            // INSERTAR ORDENADAMENTE
            if(n_actual.x >= newNodo.x){
                // CAMBIAR DE LUGAR CON EL PRIMERO DE LA LISTA
                newNodo.abajo = n_actual;
                newNodo.abajo.arriba = newNodo;
                //ENLAZARLO A LA CABECERA
                newNodo.arriba = aux
                aux.abajo = newNodo
                //ASIGNARLO AL PRIMERO DE LA LISTA
                n_actual = newNodo;
            }else{
                while(n_actual.abajo != null && n_actual.abajo.y < newNodo.y){
                    n_actual = n_actual.abajo;
                }
                newNodo.abajo = n_actual.abajo;
                if(n_actual.abajo != null){
                    newNodo.abajo.arriba = newNodo;
                }
                n_actual.abajo = newNodo;
                newNodo.arriba = n_actual;
            }
            
        }
    }

    printX(){
        let tx = null;
        try { tx = this.cabeza.abajo } catch (error) { tx = null; console.log("errorX1"); }
        let ty = null;
        while(tx != null){
            try { ty = tx.derecha } catch (error) { ty = null; console.log("errorX2"); }
            let str = ""
            while(ty != null){
                str += ty.valor + ",";
                ty = ty.derecha;
            }
            console.log(tx.valor,": ", str)
            tx = tx.abajo;
        }
    }
    
    printY(){
        let ty = null;
        try { ty = this.cabeza.derecha } catch (error) { ty = null; console.log("errorY1"); }
        let tx = null;
        while(ty != null){
            // console.log(ty.valor)
            try { tx = ty.abajo } catch (error) { tx = null; console.log("errorY2"); }
            let str = ""
            while(tx != null){
                str += tx.valor + ",";
                tx = tx.abajo;
            }
            console.log(ty.valor,": ", str)
            ty = ty.derecha;
        }
    }

    Mostrararchivos(){
        let tx = null;
        try { tx = this.cabeza.abajo } catch (error) { tx = null; console.log("errorX1"); }
        let ty = null;
        let cadenaimprarchivos="";
        let arrayar=[];
        while(tx != null){
            try { ty = tx.derecha } catch (error) { ty = null; console.log("errorX2"); }
            let str = ""
            while(ty != null){
                str += ty.valor ;
                ty = ty.derecha;
            }
            arrayar.push({tipo:tx.tipo, valor:tx.valor});
            tx = tx.abajo;
        }
        let arregloSinDuplicados = arrayar.filter((item, index, arr) => {
            return (
              index ==
              arr.findIndex(
                (obj) => JSON.stringify(obj) == JSON.stringify(item)
              )
            );
          });
        arregloSinDuplicados.forEach((tx)=>{
            //console.log(tx.valor,": ", str)
          

            if (tx.tipo=="pdf"){
            cadenaimprarchivos+= ` <div class="col-6 col-sm-6 col-md-4 col-lg-3 archivos" onclick="entrarCarpeta('${tx.valor}')">
            <img src="../Img/archivopng.png" width="100"/>
            <p class="h6 text-center">${tx.valor}</p>
            </div>`
            }
            if (tx.tipo=="txt"){
            cadenaimprarchivos += ` <div class="col-6 col-sm-6 col-md-4 col-lg-3 archivos" onclick="entrarCarpeta('${tx.valor}')">
            <img src="../Img/archivo2.png" width="100"/>
            <p class="h6 text-center">${tx.valor}</p>
            </div>`
            }
            if (tx.tipo!="txt" && tx.tipo!="pdf" && tx.tipo!="raiz"){
            cadenaimprarchivos += ` <div class="col-6 col-sm-6 col-md-4 col-lg-3 archivos" onclick="entrarCarpeta('${tx.valor}')">
            <img src="../Img/imag3.png" width="100"/>
            <p class="h6 text-center">${tx.valor}</p>
            </div>`
            }


        });
        

        return cadenaimprarchivos;
    }


    buscarPorX(x) {
        let aux = this.cabeza;
        let encontrado = false;
        while (aux.abajo != null && !encontrado) {
            
            aux = aux.abajo;
            if (aux.valor == x) {
                encontrado = true;
            }
        }
        if (encontrado) {
            let result = [];
            let n_actual = aux.derecha;
            while (n_actual != null) {
                result.push(n_actual);
                n_actual = n_actual.derecha;
            }
            return result;
        } else {
            return null;
        }
    }

    copiarmatriz(matriz,valorx,nuevoy ,nuevovalor) {
        // Copiar el valor de la cabeza
        this.cabeza.valor = matriz.cabeza.valor;
        this.cabeza.format_b64 = matriz.cabeza.format_b64;
        this.cabeza.tipo = matriz.cabeza.tipo;
        this.cantidad=0;
        // Recorrer los nodos de la matriz original
        let copiaext=null;
        let n_actualentRow = matriz.cabeza.abajo;
        while (n_actualentRow != null) {
            console.log("row: ",n_actualentRow)
            let n_actualentColumn = n_actualentRow.derecha;
            while (n_actualentColumn != null) {
                // Insertar un nuevo nodo con los mismos valores
                console.log("colum: ",n_actualentColumn)
                if(nuevoy!=null){
                    if (n_actualentColumn.x==valorx){
                        
                        console.log("cambio de dato",n_actualentColumn.x)
                        if(n_actualentColumn.y=="NC"){
                            
                            this.insertard(n_actualentColumn.x,nuevoy,nuevovalor, n_actualentColumn.format_b64, n_actualentColumn.tipo);
                            
                        }else{
                            this.insertard(n_actualentColumn.x,n_actualentColumn.y,n_actualentColumn.valor, n_actualentColumn.format_b64, n_actualentColumn.tipo);
                            copiaext={form:n_actualentColumn.format_b64, ta:n_actualentColumn.tipo};
                        }
                       
                    }else{
                        console.log("igual dato: ",n_actualentColumn.x)
                        this.insertard(n_actualentColumn.x,n_actualentColumn.y,n_actualentColumn.valor, n_actualentColumn.format_b64, n_actualentColumn.tipo);
                    }
                }else{
                    console.log("no hay",n_actualentColumn.x)
                    this.insertard(n_actualentColumn.x,n_actualentColumn.y,n_actualentColumn.valor, n_actualentColumn.format_b64, n_actualentColumn.tipo);
                }
                
                n_actualentColumn = n_actualentColumn.derecha;
            }
            n_actualentRow = n_actualentRow.abajo;
        }

        return copiaext;
    }

    
    
    dgraph(){

        if(this.cantidad>0){
            let code = "graph [nodesep=\"0.8\", ranksep=\"0.6\"]; \n";
            code +=`M0[ label = \"${this.cabeza.valor}\" width = 1.5 shape = \"square\" style = \"filled\" fillcolor =\"midnightblue\" fontcolor=\"white\" group=\"0\"]; \n`;
            let dat= this.#cabezaersGraph()
            if (dat!=null){
                code+=dat;
                code += this.#NodosGraph()
                return(code)
            }else{
                console.log("no se han dado permisos");
                return null;
            }
           
        }
        else{
            console.log("no se puede crear la matriz por falta de archivos");
            return null;
        }
        
    }
    #cabezaersGraph(){
        let conn = "";
        let Nodos = "";
        let rank = "{rank = same; M0; "
        let aux = null;
        let aux1 = null;
        try { aux1 = this.cabeza.derecha } catch (error) { aux1 = null; console.log("GRAPH"); }
        if (aux1.valor!="NC"){
            conn += 'M0 ';
        }
        while(aux1 != null){
            if(aux1.valor!="NC"){
                Nodos += "Y" + aux1.valor + `[label="${aux1.valor}" width = 1.5 shape ="square" style="filled" fillcolor="skyblue3" group = ${aux1.valor} ];\n`
                rank += "Y" + aux1.valor + ";";
            }
                if(aux1.derecha != null && aux1.derecha.valor!="NC"){
                    conn += "-> Y" + aux1.valor + " ";
                }else{
                    
                    if (aux1.valor!="NC"){
                    conn += "-> Y" + aux1.valor;
                    }
                }
            
               
           
            aux1 = aux1.derecha;
        }
        conn +=  `[dir="both"];\n`;
        conn += 'M0 ';
        let contador=0;
        try { aux = this.cabeza.abajo } catch (error) { aux = null; console.log("GRAPH"); }
        while(aux != null){
            console.log(aux.derecha, aux.izquierda);
            if (aux.derecha.y!="NC"){
                contador++
                Nodos += "X" + aux.valor.split(".")[0] + `[label="${aux.valor}" width = 1.5 shape ="square" style="filled" fillcolor="skyblue3" group="0"];\n`
                if(aux.abajo != null){
                    conn += "-> X" + aux.valor.split(".")[0] + " ";
                    
                }else{
                    conn += "-> X" + aux.valor.split(".")[0];
                    
                }
            }
           
            aux = aux.abajo;
        }
        conn+=`[dir="both"];\n`;
        if (contador>0){
            rank += "}";
            return Nodos +"\n"+ conn +"\n"+ rank +"\n";
        }else{
            console.log("no se puede crear porque no hay archivos con permisos");
            return null;
        }
       
    }

    #NodosGraph(){
        let conn = "";
        let Nodos = "";
        let rank = ""
        let tx = null;
        try { tx = this.cabeza.abajo } catch (error) { tx = null; console.log("errorX1"); }
        let ty = null;
        while(tx != null){
            try { ty = tx.derecha } catch (error) { ty = null; console.log("errorX2"); } 
            if(ty.y!="NC"){
                conn += `X${ty.x.split(".")[0]} -> `
            }
            
            while(ty != null){
                if (ty.y!="NC"){
                    Nodos += `S${ty.x.split(".")[0]}_${ty.y}[label="${ty.valor}" width=1.5 shape="square" style="filled" fillcolor="slategray1" group="${ty.y}"];\n`
                    rank += `{rank=same; X${ty.x.split(".")[0]}; S${ty.x.split(".")[0]}_${ty.y};}\n`;
                }
                
                if(ty.derecha != null && ty.derecha.y !="NC"){
                    conn += `S${ty.x.split(".")[0]}_${ty.y} ->`;
                }else{
                    if (ty.y!="NC"){
                    conn += `S${ty.x.split(".")[0]}_${ty.y} [dir="both"]; \n`;
                    }
                }
                ty = ty.derecha;
            }
            tx = tx.abajo;
        }
        
        try { ty = this.cabeza.derecha } catch (error) { ty = null; console.log("errorY1"); }
        tx = null;
        while(ty != null){
            try { tx = ty.abajo } catch (error) { tx = null; console.log("errorX2"); } 
            if (tx.y!="NC"){
                conn += `Y${tx.y} -> `
                while(tx != null){
                    if(tx.abajo != null){
                        conn += `S${tx.x.split(".")[0]}_${tx.y} ->`;
                    }else{
                        if (ty.y!="NC"){
                        conn += `S${tx.x.split(".")[0]}_${tx.y} [dir="both"]; \n`;
                        }
                    }
                    tx = tx.abajo;
                }
            }
            
            ty = ty.derecha;
        }

        return Nodos + "\n" + rank + "\n" + conn;
    }
}
