

export default class ImpostoFaixa2 {
    renda: number;
    tamanhoFaixa1: number;
    tamanhoFaixa2: number;

    constructor(renda, tamanhoFaixa1, tamanhoFaixa2) {
        this.renda = renda;
        this.tamanhoFaixa1 = tamanhoFaixa1;
        this.tamanhoFaixa2 = tamanhoFaixa2;
    }

    calcular() {
        let faixa = parseFloat((this.renda - this.tamanhoFaixa1).toFixed(2));

        if (faixa > 0) {
            if (faixa <= this.tamanhoFaixa2) {
                return faixa * 7.5 / 100;
            }
            else {
                return this.tamanhoFaixa2 * 7.5 / 100;
            }
        }
        return 0;
    }
}
