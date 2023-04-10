//--------------------------------------------------------------------------
//                      CLASE NODO
//--------------------------------------------------------------------------
class AvlNodo{
    constructor(item, treenari,actividad){
        
        this.item = item;
        this.izquierda = null;
        this.derecha = null;
        this.treenari = treenari;
        this.actividad =actividad;
        this.altura = 0;
        console.log("datos en nodo", this.izquierda,this.derecha, this.treenari, this.altura);
    }
}

//--------------------------------------------------------------------------
//                   VARIABLES GLOBALES
//--------------------------------------------------------------------------
let = Nodos = "";
let = enlaces = "";

//--------------------------------------------------------------------------
//                   CLASE ARBOL AVL
//--------------------------------------------------------------------------
class AvlTree{
    constructor(){
        this.raizavl = null;
    }

   

    getaltura(Nodo){
        if (Nodo === null) {
            return -1;
          } else {
            return Nodo.altura;
          }
    }
    getMaxaltura(alturaizquierda, alturaderecha){
        if (alturaizquierda > alturaderecha) {
            return alturaizquierda;
          } else {
            return alturaderecha;
          }
    }


    //--------------------------------------------------------------------------
    //                  METODO DE INSERCIÓN
    //--------------------------------------------------------------------------
    insertar(item){
        console.log("insertando a: ",item.nombre);
        this.raizavl = this.#insertRecursive(item, this.raizavl);
       console.log("Salio con: ",this.raizavl);
    }
    #insertRecursive(item, node){
        console.log("metodo recursivo_ ",node)
        if(node == null){
            console.log("node derecha: ",node);
            let arbolarchivo = new Tree(item.carpeta_raiz);
            let listaactividad =new CircularList();
            var node12 =  new AvlNodo(item,arbolarchivo,JSON.stringify(JSON.decycle(listaactividad)));
            
            return node12;
            
        }
        if(item.carnet < node.item.carnet){
            console.log("node izquierda: ",node.izquierda);
            node.izquierda = this.#insertRecursive(item, node.izquierda);
            if(this.getaltura(node.derecha) - this.getaltura(node.izquierda)<  -1){
                
                if(item.carnet < node.izquierda.item.carnet){
                    node = this.#rotateizquierda(node);
                }else{
                    node = this.#doubleizquierda(node);
                }
            }
        }else if(item.carnet > node.item.carnet){
            console.log("node derecha: ",node.derecha);
            node.derecha = this.#insertRecursive(item, node.derecha);
            if(this.getaltura(node.derecha) - this.getaltura(node.izquierda) > 1){
                console.log("1");
                if(item.carnet > node.derecha.item.carnet){
                    node = this.#rotatederecha(node);
                }else{
                    node = this.#doublederecha(node);
                }
            }
        }else{
            console.log("repetido: ",node);
        }
        node.altura = this.getMaxaltura(this.getaltura(node.izquierda), this.getaltura(node.derecha)) + 1;
        console.log("node final: ",node);
        return node;
       
    }
    #rotatederecha(node1) {
        let node2 = node1.derecha;
        console.log("nodo aux2: ",node1);
          // Actualizar enlace derecho de node1
          node1.derecha = node2.izquierda;
          // Actualizar enlace izquierdo de node2
          node2.izquierda = node1;
          // Actualizar altura de node1
          node1.altura = this.getMaxaltura(this.getaltura(node1.derecha), this.getaltura(node1.izquierda)) + 1;
          // Actualizar altura de node2
          node2.altura = this.getMaxaltura(this.getaltura(node1.derecha), node1.altura) + 1;
          // Retornar el nuevo nodo raíz de la subárbol rotado
          console.log("rotderecha: ",node2);
          return node2;
      }
    #rotateizquierda(node2){
        let node1 = node2.izquierda;
        console.log("nodo aux1: ",node1);
            node2.izquierda = node1.derecha;
            node1.izquierda = node2;
            node2.altura = this.getMaxaltura(this.getaltura(node2.derecha), this.getaltura(node2.izquierda)) + 1;
            node1.altura = this.getMaxaltura(this.getaltura(node2.derecha), node2.altura) + 1;
            console.log("rotizqu: ",node1);
            return node1;
        
    }
    #doubleizquierda(node){
        console.log("dobleizquierda: ", node);
        node.izquierda = this.#rotateizquierda(node.izquierda);
        return this.#rotatederecha(node);
    }
    #doublederecha(node){
        console.log("dolederecha: ",node);
        node.derecha = this.#rotateizquierda(node.derecha);
        return this.#rotatederecha(node);
    }


    treeGraph(){       
        Nodos = "";
        enlaces = "";
        console.log(this.raizavl);
        this.#treeGraphRecursive(this.raizavl);
        // console.log(Nodos,enlaces);
        return Nodos + enlaces;
    }
    #treeGraphRecursive(nodo_actual){
            if(nodo_actual.izquierda != null){
                this.#treeGraphRecursive(nodo_actual.izquierda);
                enlaces += `S_${nodo_actual.item.carnet} -> S_${nodo_actual.izquierda.item.carnet};\n`;
            }
            Nodos += `S_${nodo_actual.item.carnet}[shape=box label="${nodo_actual.item.carnet}\\n${nodo_actual.item.nombre}\\nAltura: ${nodo_actual.altura}" style="filled" fillcolor="skyblue3"];`
            if(nodo_actual.derecha != null){
                this.#treeGraphRecursive(nodo_actual.derecha);
                enlaces += `S_${nodo_actual.item.carnet} -> S_${nodo_actual.derecha.item.carnet};\n`;
            }
    
       
    }
    

    busqueda(valor ) {
        return this.#busquedarecursiva(valor, this.raizavl);
    }
    #busquedarecursiva(valor, nodo){
        if (nodo==null){
            return null;
        }else if (valor == nodo.item.carnet){
            //console.log(nodo.item.carnet, valor)
            return nodo;
        }else if (valor < nodo.item.carnet){
            return this.#busquedarecursiva(valor,nodo.izquierda);
        }else {
            return this.#busquedarecursiva(valor,nodo.derecha);
        }
    }

    modificacion(valor1,valor2,userc ) {
        return this.#modifirecursiva(valor1,valor2,userc, this.raizavl);
    }
    #modifirecursiva(valor1,valor2,userc, nodo){
        if (nodo==null){
            return null;
        }else if (userc == nodo.item.carnet){
            nodo.treenari=valor1;
            nodo.actividad =valor2;
        }else if (userc < nodo.item.carnet){
            return this.#modifirecursiva(valor1,valor2,userc,nodo.izquierda);
        }else {
            return this.#modifirecursiva(valor1,valor2,userc,nodo.derecha);
        }
    }

    enOrder(){
        let index = {valor: 0};
        console.log("ordeer",this.raizavl);
        let html = this.#enOrderRecursive(this.raizavl, index);
        return html;
    }
    #enOrderRecursive(nodo_actual, index){
        let row = "";
        if(nodo_actual.izquierda != null){
            row += this.#enOrderRecursive(nodo_actual.izquierda, index);
        }
        row +=`
            <tr>
                <th scope="row">${index.valor+1}</th>
                <th>${nodo_actual.item.carnet}</th>
                <td>${nodo_actual.item.nombre}</td>
                <td>${nodo_actual.item.password}</td>
            </tr>
        `;
        index.valor++;
        if(nodo_actual.derecha != null){
            row += this.#enOrderRecursive(nodo_actual.derecha, index);
        }
        return row;
    }

    preOrder(){
        let index = {valor: 0};
        console.log("oder",this.raizavl);
        let html = this.#preOrderRecursive(this.raizavl, index);
        return html;
    }
    #preOrderRecursive(nodo_actual, index){
        let row = "";
        row +=`
            <tr>
                <th scope="row">${index.valor+1}</th>
                <th>${nodo_actual.item.carnet}</th>
                <td>${nodo_actual.item.nombre}</td>
                <td>${nodo_actual.item.password}</td>
            </tr>
        `;
        index.valor++;
        if(nodo_actual.izquierda != null){
            row += this.#preOrderRecursive(nodo_actual.izquierda, index);
        }
        if(nodo_actual.derecha != null){
            row += this.#preOrderRecursive(nodo_actual.derecha, index);
        }
        return row;
    }

    postOrder(){
        let index = {valor: 0};
        let html = this.#postOrderRecursive(this.raizavl, index);
        return html;
    }
    #postOrderRecursive(nodo_actual, index){
        let row = "";
        if(nodo_actual.izquierda != null){
            row += this.#postOrderRecursive(nodo_actual.izquierda, index);
        }
        if(nodo_actual.derecha != null){
            row += this.#postOrderRecursive(nodo_actual.derecha, index);
        }
        row +=`
            <tr>
                <th scope="row">${index.valor+1}</th>
                <th>${nodo_actual.item.carnet}</th>
                <td>${nodo_actual.item.nombre}</td>
                <td>${nodo_actual.item.password}</td>
            </tr>
        `;
        index.valor++;
        return row;
    }


}