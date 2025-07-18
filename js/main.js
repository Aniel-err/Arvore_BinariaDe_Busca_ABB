// js/main.js

import { ArvoreBinariaBusca } from './Arvore.js';
import { AlgoritmosBusca } from './AlgoritmosBusca.js';
import { Desenhista } from './Desenhista.js';

document.addEventListener('DOMContentLoaded', () => {

    const abb = new ArvoreBinariaBusca();
    const buscador = new AlgoritmosBusca(abb);

    const canvas = document.getElementById('treeCanvas');
    const ctx = canvas.getContext('2d');
    const desenhista = new Desenhista(ctx);

    const valorInput = document.getElementById('valorInput');
    const inserirBtn = document.getElementById('inserirBtn');
    const removerBtn = document.getElementById('removerBtn');
    const buscarBtn = document.getElementById('buscarBtn');

    const preOrdemEl = document.getElementById('preOrdemResultado');
    const emOrdemEl = document.getElementById('emOrdemResultado');
    const posOrdemEl = document.getElementById('posOrdemResultado');
    const bfsEl = document.getElementById('bfsResultado');


    function formatarArrayParaExibicao(array, itensPorLinha = 20) {
        if (!array || array.length === 0) {
            return "[]";
        }

        let resultadoFormatado = "[\n  ";
        for (let i = 0; i < array.length; i++) {
            resultadoFormatado += array[i];


            if (i < array.length - 1) {
                resultadoFormatado += ", ";
                if ((i + 1) % itensPorLinha === 0) {
                    resultadoFormatado += "\n  ";
                }
            }
        }
        resultadoFormatado += "\n]";
        return resultadoFormatado;
    }


    function lidarComInsercao() {
        const valor = parseInt(valorInput.value, 10);
        if (isNaN(valor)) {
            alert('Por favor, insira um número válido.');
            return;
        }
        abb.inserir(valor);
        valorInput.value = '';
        atualizarVisualizacaoCompleta();
    }

    function lidarComRemocao() {
        const valor = parseInt(valorInput.value, 10);
        if (isNaN(valor)) {
            alert('Por favor, insira um número válido.');
            return;
        }
        if (buscador.buscar(valor) === null) {
            alert(`Valor ${valor} não encontrado na árvore.`);
            return;
        }
        abb.remover(valor);
        valorInput.value = '';
        atualizarVisualizacaoCompleta();
    }

    function lidarComBusca() {
        const valor = parseInt(valorInput.value, 10);
        if (isNaN(valor)) {
            alert('Por favor, insira um número válido.');
            return;
        }
        const noEncontrado = buscador.buscar(valor);
        alert(noEncontrado ? `Valor ${valor} encontrado na árvore!` : `Valor ${valor} NÃO encontrado.`);
        valorInput.value = '';
    }

    function atualizarVisualizacaoCompleta() {
        desenhista.desenharArvore(abb);

        preOrdemEl.textContent = formatarArrayParaExibicao(buscador.preOrdem());
        emOrdemEl.textContent = formatarArrayParaExibicao(buscador.emOrdem());
        posOrdemEl.textContent = formatarArrayParaExibicao(buscador.posOrdem());
        bfsEl.textContent = formatarArrayParaExibicao(buscador.buscaEmLargura());
    }

    inserirBtn.addEventListener('click', lidarComInsercao);
    removerBtn.addEventListener('click', lidarComRemocao);
    buscarBtn.addEventListener('click', lidarComBusca);

    atualizarVisualizacaoCompleta();
});