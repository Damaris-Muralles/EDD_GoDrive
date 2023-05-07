class Block{
    constructor(index, transmitter, receiver, message, previousHash, hash){
        this.index = index;
        this.timestamp = new Date();
        this.transmitter = transmitter;
        this.receiver = receiver;
        this.message = message;
        this.previousHash = previousHash; 
        this.hash = hash; 

        this.siguiente = null;
        this.anterior = null;
    }

   
}

class BlockChain{
   
    constructor(){
        this.cabeza = null;
        this.cola = null;
        this.tam = 0;
    }


    async insert(transmitter, receiver, message){
        let newNode = new Block(this.tam, transmitter, receiver, message, "","");
        if(this.cabeza == null){
            // HASH ANTERIOR DEL PRIMER BLOQUE
            newNode.previousHash = "00000";
            // ASIGNAR EL HASH AL BLOQUE ACTUAL
            newNode.hash = await this.getSha256(newNode);
            // INSERTAR EL NODO
            this.cabeza = newNode;
            
            this.cola = newNode;
            // AUMENTAR TAMAÑO
            this.tam++;
        }else{
            // ASIGNAR PRIMERO EL HASH ANTERIOR
            newNode.previousHash = this.cola.hash;
            // CREAR EL HASH ACTUAL
            newNode.hash = await this.getSha256(newNode);
            // INSERTAR EL NODO AL FINAL
            this.cola.siguiente = newNode;
            newNode.anterior = this.cola;
            this.cola = newNode;
            // AUMENTAR TAMAÑO
            this.tam++;
        }
    }

   
    // REF: https://stackoverflow.com/questions/63736585/why-does-crypto-subtle-digest-return-an-empty-object
    async getSha256(block){
    
        let str = JSON.stringify(block).toString();
    
        let bytes = new TextEncoder().encode(str);

        let hashBytes = await window.crypto.subtle.digest("SHA-256", bytes);
  
        let hash = Array.prototype.map.call(new Uint8Array(hashBytes), x => ('00' + x.toString(16)).slice(-2)).join('');
    
        return hash;
    }

    // METODO PARA IMPRIMIR en textarea
    print(){        
        let text="";
        if(this.cabeza !== null){
            let temp = this.cabeza;
            
            while(temp !== null){
                text+=`Index: ${temp.index}
TimeStamp: ${this.getFormatDate(temp.timestamp)}
Emisor: ${temp.transmitter}
Receptor: ${temp.receiver}
Mensaje: ${temp.message}
PreviousHash: ${temp.previousHash}
Hash: ${temp.hash}


`;
                temp = temp.siguiente;
            }
        }
        return text;
    }


    getFormatDate(time){
        const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const dateString = time.toLocaleString('es-ES', options);
        const formattedDate = dateString.replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/, '$1-$2-$3::$4:$5:$6');
  
        return formattedDate;
    }


    listmenssage(carnetuser){
        let messagechat=[];
        if(this.cabeza !== null &&this.cabeza!=undefined){
            let temp = this.cabeza;
            while(temp !== null && temp!=undefined){
                if(String(temp.receiver) === String(carnetuser)){
                    messagechat.push({emisor:temp.transmitter , receptor:temp.receiver, mensaje: temp.message, hora:this.getFormatDate(temp.timestamp)});
                }else if(String(temp.transmitter) === String(carnetuser)){
                    messagechat.push({emisor:temp.transmitter , receptor:temp.receiver, mensaje: temp.message, hora:this.getFormatDate(temp.timestamp)});
                }
                temp = temp.siguiente;
            }
            
        }
        return messagechat; 
    }

    blockReport(){
        let nodos="";
        let conexion="";
        if(this.cabeza){
            
            let temp = this.cabeza;
            
            while(temp !== null){
                nodos+=`   N${temp.index} [shape=box label="TimeStamp: ${this.getFormatDate(temp.timestamp)}\\nEmisor: ${temp.transmitter}\\nReceptor: ${temp.receiver}\\nPreviousHash: ${temp.previousHash}" style="filled" fillcolor="skyblue3"];\n`;
            if (temp.index==0){
                conexion+=`   N${temp.index} `;
            }else{
                conexion+=` -> N${temp.index} `;
            }
            
                    temp = temp.siguiente;
                

            }
        }
        return nodos+conexion;
    }


}