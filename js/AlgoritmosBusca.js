export class AlgoritmosBusca {
    constructor(arvore) {
        this.arvore = arvore;
    }

    buscar(valor) {
        return this._buscar(this.arvore.raiz, valor);
    }

    _buscar(no, valor) {
        if (no === null || no.valor === valor) {
            return no;
        }
        if (valor < no.valor) {
            return this._buscar(no.esquerda, valor);
        }
        return this._buscar(no.direita, valor);
    }

    preOrdem() {
        const resultado = [];
        this._preOrdem(this.arvore.raiz, resultado);
        return resultado;
    }
    _preOrdem(no, resultado) {
        if (no !== null) {
            resultado.push(no.valor);
            this._preOrdem(no.esquerda, resultado);
            this._preOrdem(no.direita, resultado);
        }
    }

    emOrdem() {
        const resultado = [];
        this._emOrdem(this.arvore.raiz, resultado);
        return resultado;
    }
    _emOrdem(no, resultado) {
        if (no !== null) {
            this._emOrdem(no.esquerda, resultado);
            resultado.push(no.valor);
            this._emOrdem(no.direita, resultado);
        }
    }

    posOrdem() {
        const resultado = [];
        this._posOrdem(this.arvore.raiz, resultado);
        return resultado;
    }
    _posOrdem(no, resultado) {
        if (no !== null) {
            this._posOrdem(no.esquerda, resultado);
            this._posOrdem(no.direita, resultado);
            resultado.push(no.valor);
        }
    }

    buscaEmLargura() {
        const raiz = this.arvore.raiz;
        if (raiz === null) return [];

        const resultado = [];
        const fila = [raiz];

        while (fila.length > 0) {
            const no = fila.shift();
            resultado.push(no.valor);
            if (no.esquerda !== null) fila.push(no.esquerda);
            if (no.direita !== null) fila.push(no.direita);
        }
        return resultado;
    }
}