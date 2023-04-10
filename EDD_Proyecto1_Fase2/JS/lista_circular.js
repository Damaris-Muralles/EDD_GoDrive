class NodoCir {
    constructor(valor, fecha, hora) {
      this.valor = valor;
      this.fecha = fecha;
      this.hora = hora;
      this.next = null;
    }
  }
  
  class CircularList {
    constructor() {
      this.head = null;
      this.tail = null;
    }
  
    addEnd(valor) {
      let fechaActual = new Date();
      let mes="";
      if(fechaActual.getMonth()+1>10){
        mes="-0"+(fechaActual.getMonth() + 1);
      }else{
        mes="-"+(fechaActual.getMonth() + 1);
      }
      let fecha=fechaActual.getDate()+mes+"-"+fechaActual.getFullYear();
      let hora=fechaActual.getHours()+":"+fechaActual.getMinutes()+":"+fechaActual.getSeconds();
      let newNodo = new NodoCir(valor,fecha,hora);
      console.log(newNodo)
      if (this.head === null) {
        console.log("head null",this.head);
        this.head = newNodo;
        this.tail = newNodo;
        newNodo.next = this.head;
        console.log("todos",this.head,this.tail, this.head.next);
      } else {
        console.log("tail.inicisal",this.tail);
        this.tail.next = newNodo;
        console.log("tail.next",this.tail.next);
        this.tail = newNodo;
        this.tail.next = this.head;
        console.log("tail, taiil,next",this.tail,this.tail.next);

      }
    }
  
    addFront(valor) {
      let newNodo = new NodoCir(valor);
  
      if (this.head === null) {
        this.head = newNodo;
        this.tail = newNodo;
        newNodo.next = this.head.next;
      } else {
        newNodo.next = this.head;
        this.head = newNodo;
        this.tail.next = newNodo;
      }
    }
  
    print() {
      let aux = this.head;
  
      while (aux.next !== this.head) {
        console.log(`${aux.valor}, `);
        aux = aux.next;
      }
      console.log(`${aux.valor}`);
    }
  
    graphcircular() {
      let aux = this.head;
      let conn = "";
      let rank="{rank=same;";
      let Nodos = "node [shape=rectangle];\nsplines=ortho;\n";
      let counter = 0;
      while (aux.next !== this.head) {
        Nodos += `N${counter}[label="Accion: ${aux.valor}\\nFecha: ${aux.fecha}\\nHora: ${aux.hora}" style="filled" fillcolor="skyblue3"];\n`;
        conn += `N${counter}->`;
        rank+=`N${counter};`;
        aux = aux.next;
        counter++;
      }
      Nodos += `N${counter}[label="Accion:${aux.valor}\\nFecha: ${aux.fecha}\\nHora: ${aux.hora}" style="filled" fillcolor="skyblue3"];\n`;
      conn += `N${counter}-> N0`;
      rank+=`N${counter}}`;
      console.log(Nodos + "\n" +rank+ "\n" +conn);
      return   Nodos + "\n" +rank+ "\n" +conn;
    }
   
  }