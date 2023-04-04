// CLASE NODO 
class Tnode{
    constructor(folderName,matrizd){
        this.folderName = folderName;
        this.children = [];
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
            /*if (tipoarchivo=="carpeta"){
                
            }else{
                newNode = new Tnode(folderName,convetb64,tipoarchivo,null);
            }
           */
            newNode.id = this.size;
            fatherNode.children.push(newNode);
        } else {
        console.log("Ruta no existe");
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
                while(childNames.includes(nameaux)) {
                    console.log("YA EXISTE UNA CARPETA CON EL NOMBRE, SE CREO COPIA");
                    nameaux = newname+ "-Copia(" + copyCount + ")";
                    copyCount++;
                }
                newname=nameaux;
                child.folderName=newname;
            }else{
                cont++;
            }});
            
        }
        if (cont==fatherNode.children.length){
            alert("Ruta no existe");
        }else{
            alert("Todo bien");
        }
        
    }

    modifiElementMatriz(newmatriz,fatherPath){
        let fatherNode = this.getFolder(fatherPath);
        if(fatherNode ){
            fatherNode.matrizd=newmatriz;
            console.log(fatherNode.matrizd);
            
            
        }else{
            alert("No existe");
        }
        
    }
    eliminarfolder(nameforlder, fatherPath){
        let fatherNode = this.getFolder(fatherPath);
        if(fatherNode){
            //let Nodoaux =fatherNode.children.filter(child => child.tipo == "carpeta");
            let childNames = fatherNode.children.map(child => child.folderName);
            if(childNames.includes(nameforlder)) {
                fatherNode.children = fatherNode.children.filter(child => child.folderName != nameforlder);

            }else{
                alert("Ruta no es correcta")
            }
            
        }
    }

    buscararchivo(nameforlder, fatherPath) {
        let fatherNode = this.getFolder(fatherPath);
        console.log (fatherNode);
        if (fatherNode ) {
            let Nodoaux = fatherNode.children;
            console.log("auisdf",Nodoaux)
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
            alert("El archivo no existe");
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

        let node = this.root;
        let queue = [];
        queue.push(node);
        while(queue.length !== 0){
            let len = queue.length;
            for(let i = 0; i < len; i ++){
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.folderName}" style="filled" fillcolor="skyblue3"];\n`;
                node.children.forEach( item => {
                    connections += `S_${node.id} -> S_${item.id};\n`
                    queue.push(item);
                });
            }
        }
        return 'node[shape="record"];\n' + nodes +'\n'+ connections;
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

