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
        console.log("quie, con", transmitter,this.tam)
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
        console.log("sdf",this.cabeza, this.cola)
    }

   
    // REF: https://stackoverflow.com/questions/63736585/why-does-crypto-subtle-digest-return-an-empty-object
    async getSha256(block){
    
        let str = JSON.stringify(block).toString();
    
        let bytes = new TextEncoder().encode(str);

        let hashBytes = await window.crypto.subtle.digest("SHA-256", bytes);
  
        let hash = Array.prototype.map.call(new Uint8Array(hashBytes), x => ('00' + x.toString(16)).slice(-2)).join('');
    
        return hash;
    }

    // METODO PARA IMPRIMIR EN CONSOLA
    print(){        
        if(this.cabeza !== null){
            let temp = this.cabeza;
            while(temp !== null){
                console.log(temp);
                temp = temp.siguiente;
            }
        }
    }


    getFormatDate(time){
        const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const dateString = time.toLocaleString('es-ES', options);
        const formattedDate = dateString.replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/, '$1-$2-$3::$4:$5:$6');
  
        return formattedDate;
    }






    // NÚMEROS DE CARNET DEL CHAT
    getMessages(transmitter, receiver){
        if(this.cabeza !== null){
            let msgs = "";
            let temp = this.cabeza;
            while(temp !== null){
                if(String(temp.receiver) === String(transmitter)){
                    if(String(temp.transmitter) === String(receiver)){
                        msgs += `<li class="list-group-item">${temp.message}</li>`;
                    }
                }else if(String(temp.transmitter) === String(transmitter)){
                    if(String(temp.receiver) === String(receiver)){
                        msgs += `<li class="list-group-item bg-primary text-light" style="text-align: right">${temp.message}</li>`;
                    }
                }
                temp = temp.siguiente;
            }
            if(msgs){
                return `
                    <ul class="list-group">
                        ${msgs}
                    </ul>
                `;
            }
        }
        return "No hay mensajes";
    }

    listmenssage(carnetuser){
        let messagechat=[];
        if(this.cabeza !== null &&this.cabeza!=undefined){
            let temp = this.cabeza;
            console.log("por comprobacion",temp, this.cabeza)
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

    blockReport(index = 0){
        if(this.cabeza){
            let temp = this.cabeza;
            while(temp !== null){
                if(temp.index === index){
                    // EL NOMBRE DE LA TABLA TIENE EL INDEX DEL BLOQUE, PARA PODER OBTENER EL SIGUIENTE O EL ANTERIOR
                    return `
                        <table class="table table-bordered" id="block-table" name="${temp.index}">
                            <tbody>
                                <tr>
                                    <th scope="row" class="col-3">Index</th>
                                    <td class="col-9">${temp.index}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Timestamp</th>
                                    <td>${temp.getFormatDate()}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Transmitter</th>
                                    <td>${temp.transmitter}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Receiver</th>
                                    <td>${temp.receiver}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Message</th>
                                    <td>${temp.message}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Previus Hash</th>
                                    <td>${temp.previousHash}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Hash del Bloque</th>
                                    <td>${temp.hash}</td>
                                </tr>
                            </tbody>
                        </table>
                    `;
                }else{
                    temp = temp.siguiente;
                }

            }
        }
        return "";
    }


}