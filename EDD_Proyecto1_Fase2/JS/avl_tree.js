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
        this.root = null;
    }

    insertar(item){
        this.root = this.#insertRecursive(item, this.root);
       
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
    
    #insertRecursive(item, node){
        if(node == null){
            
            let arbolarchivo = new Tree(item.carpeta_raiz);
            let listaactividad =new CircularList();
            node = new AvlNodo(item,arbolarchivo,JSON.stringify(JSON.decycle(listaactividad)));
        }else if(item.carnet < node.item.carnet){
            node.izquierda = this.#insertRecursive(item, node.izquierda);
            if(this.getaltura(node.izquierda) - this.getaltura(node.derecha) == 2){
                if(item.carnet < node.izquierda.item.carnet){
                    node = this.#rotateizquierda(node);
                }else{
                    node = this.#doubleizquierda(node);
                }
            }
        }else if(item.carnet > node.item.carnet){
            node.derecha = this.#insertRecursive(item, node.derecha);
            if(this.getaltura(node.derecha) - this.getaltura(node.izquierda) == 2){
                if(item.carnet > node.derecha.item.carnet){
                    node = this.#rotatederecha(node);
                }else{
                    node = this.#doublederecha(node);
                }
            }
        }else{
            alert("Elemento ya existe en el árbol");
        }
        node.altura = this.getMaxaltura(this.getaltura(node.izquierda), this.getaltura(node.derecha)) + 1;
        return node;
    }
    #rotatederecha(node1) {
        let node2 = node1.izquierda;
        if (node2 && node2.derecha) {
          // Actualizar enlace derecho de node1
          node1.izquierda = node2.derecha;
          // Actualizar enlace izquierdo de node2
          node2.derecha = node1;
          // Actualizar altura de node1
          node1.altura = this.getMaxaltura(this.getaltura(node1.izquierda), this.getaltura(node1.derecha)) + 1;
          // Actualizar altura de node2
          node2.altura = this.getMaxaltura(this.getaltura(node2.izquierda), node1.altura) + 1;
          // Retornar el nuevo nodo raíz de la subárbol rotado
          return node2;
        } else {
          return node1;
        }
      }
        #rotateizquierda(node2){
            let node1 = node2.izquierda;
            if (node1 && node1.derecha) { // comprobar si node1 tiene un hijo derecho
                node2.izquierda = node1.derecha;
                node1.derecha = node2;
                node2.altura = this.getMaxaltura(this.getaltura(node2.izquierda), this.getaltura(node2.derecha)) + 1;
                node1.altura = this.getMaxaltura(this.getaltura(node1.izquierda), node2.altura) + 1;
                return node1;
            } else {
                // si node1 no tiene un hijo derecho, no se puede hacer la rotación
                return node2;
            }
        }
        #doubleizquierda(node){
            node.izquierda = this.#rotatederecha(node.izquierda);
            return this.#rotateizquierda(node);
        }
        #doublederecha(node){
            node.derecha = this.#rotateizquierda(node.derecha);
            return this.#rotatederecha(node);
        }


    //--------------------------------------------------------------------------
    //                  REPORTE DEL ARBOL
    //--------------------------------------------------------------------------
    treeGraph(){       
        Nodos = "";
        enlaces = "";
        this.#treeGraphRecursive(this.root);
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
        return this.#busquedarecursiva(valor, this.root);
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
        return this.#modifirecursiva(valor1,valor2,userc, this.root);
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

    //--------------------------------------------------------------------------
    //                  RECORRIDO IN ORDER
    //--------------------------------------------------------------------------
    enOrder(){
        let index = {valor: 0};
        let html = this.#enOrderRecursive(this.root, index);
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
    //--------------------------------------------------------------------------
    //                  RECORRIDO PRE ORDER
    //--------------------------------------------------------------------------
    preOrder(){
        let index = {valor: 0};
        let html = this.#preOrderRecursive(this.root, index);
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

    //--------------------------------------------------------------------------
    //                  RECORRIDO POST ORDER
    //--------------------------------------------------------------------------
    postOrder(){
        let index = {valor: 0};
        let html = this.#postOrderRecursive(this.root, index);
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