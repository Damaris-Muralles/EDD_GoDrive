
class Tnode{
    constructor(folderName,matrizd){
        this.folderName = folderName;
        this.children = [];
        this.nivel =1;
        this.matrizd =matrizd;
        this.id = null; 
    }
}


class Tree{
    constructor(craiz){
        let disper=new SparseMatrix(craiz);
        let cadjson= JSON.stringify(JSON.decycle(disper));
        this.root = new Tnode(craiz,cadjson);
        this.root.id = 0;
        this.size = 1; 
    }

    insert(folderName, fatherPath){ 
        
        let fatherNode = this.getFolder(fatherPath);
        console.log("nodopadre: ",fatherNode);
        if(fatherNode){
           
            let copyCount = 1;
            let nameaux=folderName;
            //Solo valida que ningun nodo de cada arbol tenga el mismo nombre
            let childNames = fatherNode.children.map(child => child.folderName);
            while(childNames.includes(nameaux)) {
                console.log("YA EXISTE UN ARCHIVO CON EL NOMBRE, SE CREO COPIA");
                /*let fileExtension="";
                if (tipoarchivo!="carpeta"){
                    fileExtension = "."+folderName.split(".").pop();
                    folderName=folderName.split(".")[0];
                }*/
                nameaux = folderName + "-Copia(" + copyCount + ")";
                copyCount++;
            }
            folderName=nameaux;
            this.size += 1;
            let disper=new SparseMatrix(folderName);
            let cadjson= JSON.stringify(JSON.decycle(disper));
            let newNode = new Tnode(folderName,cadjson);
            newNode.nivel=fatherNode.nivel+1;
            /*if (tipoarchivo=="carpeta"){
                
            }else{
                newNode = new Tnode(folderName,convetb64,tipoarchivo,null);
            }
           */
            newNode.id = this.size;
            fatherNode.children.push(newNode);
            return folderName
        } else {
        console.log("Ruta no existe");
        return null
        }
    }

    modifiFolder(nameforlder,newname,fatherPath){
        let fatherNode = this.getFolder(fatherPath);
        let cont=0;
        if(fatherNode ){
            fatherNode.children.map(child => {
                if(child.folderName==nameforlder) {
                let childNames = fatherNode.children.map(child => child.folderName);
                let copyCount = 1;
                let nameaux=newname;
                console.log(childNames)
                while(childNames.includes(nameaux)) {
                    console.log("YA EXISTE UNA CARPETA CON EL NOMBRE, SE CREO COPIA");
                    nameaux = newname+ "-Copia(" + copyCount + ")";
                    copyCount++;
                }
                newname=nameaux;
                child.folderName=newname;
                let disper=new SparseMatrix(newname);
                child.matrizd= JSON.stringify(JSON.decycle(disper));
            }else{
                cont++;
            }});
            
        }
        if (cont==fatherNode.children.length){
           return null
        }else{
            return newname
            
        }
        
    }

    modifiElementMatriz(newmatriz,fatherPath){
        let fatherNode = this.getFolder(fatherPath);
        if(fatherNode ){
            fatherNode.matrizd=newmatriz;
            console.log(fatherNode.matrizd);
            
            
        }else{
            Swal.fire(
                'No se encontro elemento',
                `Presione el boton Ok para cerrar mensaje.`,
                'error'
              )
        }
        
    }
    eliminarfolder(nameforlder, fatherPath){
        let fatherNode = this.getFolder(fatherPath);
        if(fatherNode){
            //let Nodoaux =fatherNode.children.filter(child => child.tipo == "carpeta");
            let childNames = fatherNode.children.map(child => child.folderName);
            if(childNames.includes(nameforlder)) {
                fatherNode.children = fatherNode.children.filter(child => child.folderName != nameforlder);
                return 1
            }else{
                return null
            }
            
        }
    }

    buscararchivo(nameforlder, fatherPath) {
        let fatherNode = this.getFolder(fatherPath);
        console.log (fatherNode);
        if (fatherNode ) {
            let Nodoaux = fatherNode.children;
           /*if(opcion==1){
                Nodoaux = fatherNode.children.filter(child => child.tipo != "carpeta");
                console.log("sdf")
           }else{
                Nodoaux = fatherNode.children;
                console.log("auisdf",Nodoaux)
           }*/
          console.log(Nodoaux);
          let child = Nodoaux.find(child => child.folderName == nameforlder);
          if (child) {
            console.log(child)
            return child;
          } else {
            Swal.fire(
                'No se encontro la carpeta',
                `Presione el boton Ok para cerrar mensaje.`,
                'error'
              )
            return null;
          }
        }
    }

    copiartree(tree) {
        this.root = this.#copiarNode(tree.root);
        this.size = tree.size;
    }

    #copiarNode(node) {
        if (node === null) {
            return null;
        }
        let newNode = new Tnode(node.folderName, node.matrizd);
        console.log("datos copi: ",node.folderName,  node.matrizd);
        newNode.id = node.id;
        newNode.nivel = node.nivel;
        newNode.children = node.children.map(child => this.#copiarNode(child));
        return newNode;
    }

    getFolder(path){
        if(path == this.root.folderName){
            return this.root;
        }else{
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter( str => str !== '');
            let folder = null;
            while(folders.length > 0){
                let currentFolder = folders.shift()
                folder = temp.children.find(child => child.folderName == currentFolder);
                if(typeof folder == 'undefined' || folder == null){
                    return null;
                }
                temp = folder;
            }
            return temp;
        }
    }
//no uso
    findNode(folderName, node = this.root) {
        if (node.folderName === folderName) {
          return node;
        } else {
          for (let child of node.children) {
            let result = this.findNode(folderName, child);
            if (result) {
              return result;
            }
          }
          return null;
        }
    }

    ngraph(){
        let nodes = "";
        let connections = "";
        let auxconection="";
        let rank="";
        let node = this.root;
        let queue = [];
        queue.push(node);
        console.log("cola",queue)
        while(queue.length !== 0){
            let len = queue.length;
            for(let i = 0; i < len; i ++){
                let node = queue.shift();
                
                nodes += `S_${node.id}[label="${node.folderName}" style="filled" fillcolor="skyblue3"];\n`;
                if (node.children.length>1){
                    
                    nodes +=  `Si_${node.id} [shape="point" width=0.02 style=invis]; \n`;
                    connections += `S_${node.id} -> Si_${node.id} [arrowhead=none];\n`
                    auxconection="Si";
                    if (node.children.length>3){
                        rank+="{rank=same;";
                        rank+=` Si_${node.id};`;
                    }
                }else{
                    auxconection="S";
                }
                let auxarist="a";
                let auxtam=0;
                node.children.forEach( (item, index)  => {
                    if (node.children.length>3){
                        
                        if ((index == node.children.length - 1)&& (node.children.length % 2 != 0)) {
                            connections += `${auxconection}_${node.id} -> S_${item.id};\n`;
                            rank+=`};\n`;
                            
                        } else {
                            auxtam=node.children.length;
                            if ((node.children.length % 2 != 0)) {
                                auxtam--;
                            }
                            nodes +=  `Si_${auxarist}${node.id} [shape="point" width=0.02 style=invis]; \n`;
                            connections += `Si_${auxarist}${node.id} -> S_${item.id};\n`;
                            if (index!=0){
                                if (index<(auxtam /2) ){
                                    connections += `Si_${String.fromCharCode(auxarist.charCodeAt(0) - 1)}${node.id} -> Si_${auxarist}${node.id}[arrowhead=none];\n`;
                                }else{
                                    if (index==(auxtam/2)){
                                        connections += `Si_${String.fromCharCode(auxarist.charCodeAt(0) - 1)}${node.id} -> ${auxconection}_${node.id}[arrowhead=none];\n`;
                                        connections += `${auxconection}_${node.id} -> Si_${auxarist}${node.id}[arrowhead=none];\n`;
                                    }else{
                                        connections += `Si_${String.fromCharCode(auxarist.charCodeAt(0) - 1)}${node.id} -> Si_${auxarist}${node.id}[arrowhead=none];\n`;
                                    }
                                }
                            }
                            rank+=`Si_${auxarist}${node.id};`;
                            if ((index == node.children.length - 1)){
                                rank+=` };\n`;
                            }
                            auxarist=String.fromCharCode(auxarist.charCodeAt(0) + 1);
                        }
                        
                    }else{
                        connections += `${auxconection}_${node.id} -> S_${item.id};\n`;
                    }
                    
                    queue.push(item);
                });
                
            }
        }
        return '\nrankdir=TB;\nsplines=ortho;\nnode[shape="box";];\n' +rank+ nodes +'\n'+ connections;
    }

    getHTML(path){
        let node = this.getFolder(path);
        let code = "";
        node.children.map(child => {
            code += ` <div class="col-6 col-sm-6 col-md-4 col-lg-3 archivos" onclick="entrarCarpeta('${child.folderName}')">
            <img src="../Img/Carpeta4.png" width="150"/>
            <p class="h6 text-center">${child.folderName}</p>
            </div>`
           
        })
        return code;
    }

}

