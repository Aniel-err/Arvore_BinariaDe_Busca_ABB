export class Desenhista {
    constructor(ctx) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        
        this.RAIO_NO = 25;
        this.ESPACO_VERTICAL_BASE = 100;
        this.ESPACO_HORIZONTAL_BASE = 80;
        this.PADDING = 60; 
        this.COR_NO_RAIZ = '#e74c3c';
        this.COR_NO_PADRAO = '#95a5a6';
        this.COR_LINHA = '#7f8c8d';
        this.COR_TEXTO = '#2c3e50';
        this.TAMANHO_FONTE_BASE = 16;
        this.ESPESSURA_LINHA_BASE = 2;
    }

    _obterTravessiaEmOrdem(no, array) {
        if (no === null) return;
        this._obterTravessiaEmOrdem(no.esquerda, array);
        array.push(no);
        this._obterTravessiaEmOrdem(no.direita, array);
    }

    _mapearNosParaProfundidade(no, profundidade, mapa) {
        if (no === null) return;
        mapa.set(no, profundidade);
        this._mapearNosParaProfundidade(no.esquerda, profundidade + 1, mapa);
        this._mapearNosParaProfundidade(no.direita, profundidade + 1, mapa);
    }

    desenharArvore(arvore) {
        const raiz = arvore.raiz;

        const canvasWidth = this.canvas.clientWidth;
        const canvasHeight = this.canvas.clientHeight;
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        if (raiz === null) return;

        const nosEmOrdem = [];
        this._obterTravessiaEmOrdem(raiz, nosEmOrdem);
        const mapaProfundidade = new Map();
        this._mapearNosParaProfundidade(raiz, 0, mapaProfundidade);

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        const mapaCoordsVirtuais = new Map();

        for (let i = 0; i < nosEmOrdem.length; i++) {
            const no = nosEmOrdem[i];
            const profundidade = mapaProfundidade.get(no);
            const vx = i * this.ESPACO_HORIZONTAL_BASE;
            const vy = profundidade * this.ESPACO_VERTICAL_BASE;
            mapaCoordsVirtuais.set(no, { vx, vy });
            if (vx < minX) minX = vx;
            if (vx > maxX) maxX = vx;
            if (vy < minY) minY = vy;
            if (vy > maxY) maxY = vy;
        }

        const larguraConteudo = (maxX - minX) === 0 ? this.RAIO_NO * 2 : maxX - minX;
        const alturaConteudo = (maxY - minY) === 0 ? this.RAIO_NO * 2 : maxY - minY;

        const fatorEscala = Math.min(1, (canvasWidth - 2 * this.PADDING) / larguraConteudo, (canvasHeight - 2 * this.PADDING) / alturaConteudo);

        const centroVirtualX = (minX + maxX) / 2;
        const centroVirtualY = (minY + maxY) / 2;
        const offsetX = (canvasWidth / 2) - (centroVirtualX * fatorEscala);
        const offsetY = (canvasHeight / 2) - (centroVirtualY * fatorEscala);

        const nosParaDesenhar = Array.from(mapaCoordsVirtuais.keys());

        nosParaDesenhar.forEach(no => {
            const coordsPai = mapaCoordsVirtuais.get(no);
            [no.esquerda, no.direita].forEach(filho => {
                if (filho) {
                    const coordsFilho = mapaCoordsVirtuais.get(filho);
                    this.ctx.beginPath();
                    this.ctx.moveTo(coordsPai.vx * fatorEscala + offsetX, coordsPai.vy * fatorEscala + offsetY);
                    this.ctx.lineTo(coordsFilho.vx * fatorEscala + offsetX, coordsFilho.vy * fatorEscala + offsetY);
                    this.ctx.lineWidth = Math.max(0.5, this.ESPESSURA_LINHA_BASE * fatorEscala);
                    this.ctx.strokeStyle = this.COR_LINHA;
                    this.ctx.stroke();
                }
            });
        });

        nosParaDesenhar.forEach(no => {
            const coords = mapaCoordsVirtuais.get(no);
            const xFinal = coords.vx * fatorEscala + offsetX;
            const yFinal = coords.vy * fatorEscala + offsetY;
            const raioFinal = Math.max(2, this.RAIO_NO * fatorEscala);
            
            this.ctx.beginPath();
            this.ctx.arc(xFinal, yFinal, raioFinal, 0, 2 * Math.PI);
            this.ctx.fillStyle = (no === raiz) ? this.COR_NO_RAIZ : this.COR_NO_PADRAO;
            this.ctx.fill();
            this.ctx.strokeStyle = this.COR_TEXTO;
            this.ctx.lineWidth = Math.max(0.5, this.ESPESSURA_LINHA_BASE * fatorEscala);
            this.ctx.stroke();

           
            const tamanhoFonteFinal = this.TAMANHO_FONTE_BASE * fatorEscala;
            this.ctx.fillStyle = this.COR_TEXTO;
            this.ctx.font = `bold ${Math.max(1, tamanhoFonteFinal)}px Segoe UI`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(no.valor, xFinal, yFinal);
        });
    }
}