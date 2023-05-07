
class NodeH{
    constructor(carnet, nombre, clave){
        this.carnet = carnet;
        this.nombre = nombre;
        this.clave = clave;
    }
}


class Hasht{

    constructor(){
        this.tabla = new Array(7);
        this.capacidad = 7;
        this.espaciosUsados = 0;
    }


    insertelement(carnet, nombre, clave){
        // OBTENER EL ÍNDICE DE LA FÓRMULA 
        // FÓRMULA: (SUMA ASCII's DEL CARNET) % CAPACIDAD ACTUAL 
     
        let indice = this.calcularIndice(carnet);
        // CREAR NUEVO NODO
        let nodoNuevo = new NodeH(carnet, nombre, clave);
        // COMPROBAR QUE EL INDICE SEA MENOR QUE A CAPACIADAD
        if(indice < this.capacidad){
            // VERIFICAR SI EN EL LA POSICIÓN DEL ARRAY ES NULO
            if(this.tabla[indice] == null){
                // SE AGREGA EL VALOR EN LA POSICIÓN
                this.tabla[indice] = nodoNuevo;
                // AGREGAR A LOS ESPACIOS USADOS
                this.espaciosUsados++;
            }else{
                // OPERACIONES CUANDO EXISTE UNA COLISIÓN
                // NÚMERO DE INTENTOS PARA LA FÓRMULA DE COLISIÓNES
                let contador = 1;
                // REASIGNAR EL ÍNDICE 
                // FÓRMULA DE COLISIÓNES: 
                // [(SUM ASCII's CARNET) % CAPACIDAD ACTUAL] + INTENTOS ^ 2
                indice = this.recalcularIndice(carnet, contador);
                // RECALCULAR HASTA ENCONTRAR UN ÍNDICE QUE ESTÉ VACÍO EN EL ARRAY
                while(this.tabla[indice] != null){
                    // AUMENTAR EL CONTADOR 
                    contador++;
                    // BUSCAR OTRA POSICIÓN CON EL CONTADOR AUMENTADO
                    indice = this.recalcularIndice(carnet, contador);
                }
                // ASIGNAR ESPACIO AL ÍNDICE
                this.tabla[indice] =  nodoNuevo;
                // AGREGAR A LOS ESPACIOS USADOS
                this.espaciosUsados++;
            }

            // MÉTODO QUE AMPLÍA EL ARRAY SI LLEGA AL 75% DE SU CAPACIDAD
            this.verificarcapacidad();
        }
 

    }


    calcularIndice(carnet){
        // SUMAR CARACTERES ASCII DEL CARNET
        let strCarnet = carnet.toString();
        let sum = 0;
        for(let i = 0; i< strCarnet.length; i++){
            sum += strCarnet.charCodeAt(i);
        }
        // APLICAR EL MÓDULO CON LA CAPACIDAD ACTUAL
        let posicion = sum % this.capacidad;
        return posicion;
    }
    

    recalcularIndice(carnet, contador){
        // CALCULA EL ÍNDICE CON LA FÓRMULA Y SE LE AGREGA EL CONTADOR ^ 2
        let indice = this.calcularIndice(carnet) + (contador*contador);
        // SE LE RESTA LA CAPACIDAD SI ESTA ES SUPERADA
        let nuevo =  this.nuevoIndice(indice);
        // SE RETORNA EL VALOR DEL INDICE
        return nuevo;
    }

    nuevoIndice(indice){
        let pos = 0;
        if(indice < this.capacidad){
            pos = indice;
        }else{
            pos = indice - this.capacidad;
            pos = this.nuevoIndice(pos);
        }
        return pos;
    }

    verificarcapacidad(){
        const utilizacion = this.capacidad * 0.75;
        if(this.espaciosUsados > utilizacion){
            this.capacidad = this.generarNuevaCapacidad();
            this.espaciosUsados = 0;
            const temp = this.tabla;
            this.tabla = new Array(this.capacidad);
            temp.forEach(std => {
                this.insertelement(std.carnet, std.nombre, std.clave);
            });
        }

    }


    generarNuevaCapacidad(){
        let num = this.capacidad + 1; // SE LE SUMA UNO SÓLO PARA QUE NO DEVUELVA LA MISMA CAPACIDAD
        while(!this.#Numprimo(num)){
            num++;
        }
        return num;
    }

    
    #Numprimo(num){
        if (num <= 1) {return false}
        if (num === 2) {return true}
        if (num % 2 === 0) {return false}
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
          if (num % i === 0) {return false};
        }
        return true;
    }


    buscarenhash(carnet){
        // OBTENER EL ÍNDICE 
        let indice = this.calcularIndice(carnet);
        console.log("por si hay problema, el incice es:",indice)
        // VERIFICAR QUE EL ÍNDICE ESTÉ DENTRO DE LA CAPACIDAD
        if(indice < this.capacidad){
            try{ // TRY CATCH POR SI ACASO
                // VERIFICAR SI LA POSICIÓN NO ES NULLA Y QUE SI EL CARNET ES EL MISMO
                if(this.tabla[indice] != null && this.tabla[indice].carnet==carnet){
                    return this.tabla[indice].clave;
                
                }else{
                    // MISMA ITERACIÓN DE LA INSERCIÓN HASTA LLEGAR AL VALOR
                    let contador = 1;
                    indice = this.recalcularIndice(carnet, contador);
                    while(this.tabla[indice] != null){
                        contador ++;
                        indice = this.recalcularIndice(carnet, contador);
                        // SE VERIFICA EL CARNET Y SE RETORNA
                        if(this.tabla[indice].carnet==carnet){
                            return this.tabla[indice].clave;
                        }
                    }
                }
            }catch(err){
                console.log("Error ", err);
            }
        }
        return null;
    }

}

