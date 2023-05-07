
class Tnode{
    constructor(folderName,peso,matrizd){
        this.folderName = folderName;
        this.children = [];
        this.nivel =1;    
        this.matrizd =matrizd;
        this.id = null; 
        this.peso = peso;
    }
}


class Tree{
    constructor(craiz){
        let disper=new SparseMatrix(craiz);
        let cadjson= JSON.stringify(JSON.decycle(disper));
        this.root = new Tnode(craiz,1,cadjson);
        this.root.id = 0;
        this.size = 1; 
    }

    insert(folderName, fatherPath){ 
        
        let fatherNode = this.getFolder(fatherPath);
        if(fatherNode.node){
           
            let copyCount = 1;
            let nameaux=folderName;
            //Solo valida que ningun nodo de cada arbol tenga el mismo nombre
            let childNames = fatherNode.node.children.map(child => child.folderName);
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
            let newNode = new Tnode(folderName,fatherNode.weight+1,cadjson);
            newNode.nivel=fatherNode.node.nivel+1;
            /*if (tipoarchivo=="carpeta"){
                
            }else{
                newNode = new Tnode(folderName,convetb64,tipoarchivo,null);
            }
           */
            newNode.id = this.size;
            fatherNode.node.children.push(newNode);
            return folderName
        } else {
        console.log("Ruta no existe");
        return null
        }
    }

    modifiFolder(nameforlder,newname,fatherPath){
        let fatherNode = this.getFolder(fatherPath);
        let cont=0;
        if(fatherNode.node ){
            fatherNode.node.children.map(child => {
                if(child.folderName==nameforlder) {
                let childNames = fatherNode.node.children.map(child => child.folderName);
                let copyCount = 1;
                let nameaux=newname;
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
        if (cont==fatherNode.node.children.length){
           return null
        }else{
            return newname
            
        }
        
    }

    modifiElementMatriz(newmatriz,fatherPath){
        let fatherNode = this.getFolder(fatherPath);
        if(fatherNode.node ){
            fatherNode.node.matrizd=newmatriz;
            
            
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
        if(fatherNode.node){
            //let Nodoaux =fatherNode.children.filter(child => child.tipo == "carpeta");
            let childNames = fatherNode.node.children.map(child => child.folderName);
            if(childNames.includes(nameforlder)) {
                fatherNode.node.children = fatherNode.node.children.filter(child => child.folderName != nameforlder);
                
                return 1
            }else{
                return null
            }
            
        }
    }

    buscararchivo(nameforlder, fatherPath) {
        let fatherNode = this.getFolder(fatherPath);
        if (fatherNode.node ) {
            let Nodoaux = fatherNode.node.children;
           /*if(opcion==1){
                Nodoaux = fatherNode.children.filter(child => child.tipo != "carpeta");
                console.log("sdf")
           }else{
                Nodoaux = fatherNode.children;
                console.log("auisdf",Nodoaux)
           }*/
          let child = Nodoaux.find(child => child.folderName == nameforlder);
          if (child) {
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
        let newNode = new Tnode(node.folderName,node.peso,node.matrizd);
        newNode.id = node.id;
        newNode.nivel = node.nivel;
        newNode.peso= node.peso;
        newNode.children = node.children.map(child => this.#copiarNode(child));
        
        return newNode;
    }

    getFolder(path){
        if(path == this.root.folderName){
            return {node: this.root, weight: this.root.peso};
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
            return {node: temp, weight: temp.peso}; 
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
                
                node.children.forEach( item  => {
                       
                    connections += ` S_${node.id}-> S_${item.id} [headlabel="${node.peso}"];\n`;
                   
                    
                    queue.push(item);
                });
                
            }
        }
        
        return '\nlayout=neato; \nedge[dir=none]; node[shape="box";];\n' +nodes +'\n'+ connections;
    }

    getHTML(path){
        let node = this.getFolder(path);
        let code = "";
        node.node.children.map(child => {
            code += ` <div class="col-6 col-sm-6 col-md-4 col-lg-3 archivos" onclick="entrarCarpeta('${child.folderName}')">
            <img src="../Img/Carpeta4.png" width="150"/>
            <p class="h6 text-center">${child.folderName}</p>
            </div>`
           
        })
        return code;
    }

}

