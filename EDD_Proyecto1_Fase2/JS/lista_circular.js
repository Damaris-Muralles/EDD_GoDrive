class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class CircularList {
    constructor() {
      this.head = null;
      this.tail = null;
    }
  
    // INSERTAR AL FINAL
    addEnd(value) {
      let newNode = new Node(value);
  
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
        // Asignar puntero a la cabeza haciendo la lista circular
        newNode.next = this.head.next;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
        this.tail.next = this.head;
      }
    }
  
    // INSERTAR AL INICIO
    addFront(value) {
      let newNode = new Node(value);
  
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
        // Asignar puntero a la cabeza haciendo la lista circular
        newNode.next = this.head.next;
      } else {
        newNode.next = this.head;
        this.head = newNode;
        this.tail.next = newNode;
      }
    }
  
    // MÉTODO PARA IMPRIMIR LA LISTA
    print() {
      let temp = this.head;
  
      while (temp.next !== this.head) {
        console.log(`${temp.value}, `);
        temp = temp.next;
      }
      console.log(`${temp.value}`);
    }
  
    // MÉTODO PARA GENERAR CÓDIGO GRPHVIZ
    graph() {
      let temp = this.head;
      let conn = "";
      let nodes = "";
      let counter = 0;
  
      while (temp.next !== this.head) {
        nodes += `N${counter}[label="Valor:${temp.value}"];\n`;
        conn += `N${counter}->`;
        temp = temp.next;
        counter++;
      }
      nodes += `N${counter}[label="Valor:${temp.value}"];\n`;
      conn += `N${counter}-> N0`;
      console.log(nodes);
      console.log(conn);
    }
  }