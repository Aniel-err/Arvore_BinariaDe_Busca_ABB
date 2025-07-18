export class No {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

export class ArvoreBinariaBusca {
    constructor() {
        this.raiz = null;
    }

    inserir(valor) {
        this.raiz = this._inserir(this.raiz, valor);
    }

    _inserir(no, valor) {
        if (no === null) {
            return new No(valor);
        }
        if (valor < no.valor) {
            no.esquerda = this._inserir(no.esquerda, valor);
        } else if (valor > no.valor) {
            no.direita = this._inserir(no.direita, valor);
        }
        return no; 
    }

    remover(valor) {
        this.raiz = this._remover(this.raiz, valor);
    }

    _remover(no, valor) {
        if (no === null) return null;

        if (valor < no.valor) {
            no.esquerda = this._remover(no.esquerda, valor);
        } else if (valor > no.valor) {
            no.direita = this._remover(no.direita, valor);
        } else {
            if (no.esquerda === null) return no.direita;
            if (no.direita === null) return no.esquerda;

            const sucessor = this._encontrarMinimo(no.direita);
            no.valor = sucessor.valor;
            no.direita = this._remover(no.direita, sucessor.valor);
        }
        return no;
    }

    _encontrarMinimo(no) {
        return no.esquerda === null ? no : this._encontrarMinimo(no.esquerda);
    }

        contarNos() {
        return this._contarNos(this.raiz);
    }
    
    _contarNos(no) {
        if (no === null) {
            return 0;
        }
        return 1 + this._contarNos(no.esquerda) + this._contarNos(no.direita);
    }
}
