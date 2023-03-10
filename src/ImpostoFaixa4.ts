import CalculadoraIRPF from "./CalculadoraIRPF";
import { IMPOSTO_FAIXA_4 } from "./Faixas";


export default class ImpostoFaixa3 {
    calculadora: CalculadoraIRPF;
    tamanhoFaixa1: number;
    tamanhoFaixa2: number;
    tamanhoFaixa3: number;
    tamanhoFaixa4: number;

    constructor(calculadora, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4) {
        this.calculadora = calculadora;
        this.tamanhoFaixa1 = tamanhoFaixa1;
        this.tamanhoFaixa2 = tamanhoFaixa2;
        this.tamanhoFaixa3 = tamanhoFaixa3;
        this.tamanhoFaixa4 = tamanhoFaixa4;
    }

    calcular() {
        let faixa = parseFloat((this.calculadora.getTotalBaseCalculo() - (this.tamanhoFaixa1 + this.tamanhoFaixa2 + this.tamanhoFaixa3)).toFixed(2));
        if (faixa > 0) {
            if (faixa <= this.tamanhoFaixa4) {
                return faixa * IMPOSTO_FAIXA_4;
            }
            else {
                return this.tamanhoFaixa4 * IMPOSTO_FAIXA_4;
            }
        }
        return 0;
    }
}
