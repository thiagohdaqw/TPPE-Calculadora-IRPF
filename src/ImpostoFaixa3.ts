import { IMPOSTO_FAIXA_3 } from "./Faixas";


export default class ImpostoFaixa3 {
    renda: number;
    tamanhoFaixa1: number;
    tamanhoFaixa2: number;
    tamanhoFaixa3: number;

    constructor(renda, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3) {
        this.renda = renda;
        this.tamanhoFaixa1 = tamanhoFaixa1;
        this.tamanhoFaixa2 = tamanhoFaixa2;
        this.tamanhoFaixa3 = tamanhoFaixa3;
    }

    calcular() {
        let faixa = parseFloat((this.renda - (this.tamanhoFaixa1 + this.tamanhoFaixa2)).toFixed(2));
        if (faixa > 0) {
            if (faixa <= this.tamanhoFaixa3) {
                return faixa * IMPOSTO_FAIXA_3;
            }
            else {
                return this.tamanhoFaixa3 * IMPOSTO_FAIXA_3;
            }
        }
        return 0;
    }
}
