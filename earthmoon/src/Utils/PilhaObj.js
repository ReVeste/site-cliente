class PilhaObj {
    constructor(tam) {
      this.pilha = new Array(tam);
      this.topo = -1;
    }
  
    isEmpty() {
      return this.topo === -1;
    }
  
    isFull() {
      return this.topo === this.pilha.length - 1;
    }
  
    push(info) {
      if (this.isFull()) {
        console.error("Pilha cheia!");
        throw new Error("Pilha cheia!");
      }
      this.pilha[++this.topo] = info;
    }
  
    pop() {
      if (this.isEmpty()) {
        return null;
      }
      return this.pilha[this.topo--];
    }
  
    peek() {
      if (!this.isEmpty()) {
        return this.pilha[this.topo];
      }
      return null;
    }
  
    exibe() {
      if (this.isEmpty()) {
        console.log("Pilha vazia!");
      } else {
        for (let i = this.topo; i >= 0; i--) {
          console.log(this.pilha[i]);
        }
      }
    }
  
    getPilha() {
      return this.pilha;
    }
  
    setPilha(novaPilha) {
      this.pilha = novaPilha;
    }
  
    getTopo() {
      return this.topo;
    }
  
    setTopo(novoTopo) {
      this.topo = novoTopo;
    }
  }

  export default PilhaObj;