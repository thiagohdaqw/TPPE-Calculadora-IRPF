import CalculadoraIRPF from "./CalculadoraIRPF";
import { IMPOSTO_FAIXA_5 } from "./Faixas";


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

    /*
       * Método responsável por calcular o valor total do imposto que se enquadra na faixa 5
       * Retorna: valor total do imposto da faixa 5
       * Aqui foram extraídas sub-classes para serem responsáveis pelo cálculo do imposto de acordo com cada faixa
    */

    calcular() {
        let faixa = parseFloat((this.calculadora.getTotalBaseCalculo() - (this.tamanhoFaixa1 + this.tamanhoFaixa2 + this.tamanhoFaixa3 + this.tamanhoFaixa4)).toFixed(2));
        if (faixa > 0) {
            return faixa * IMPOSTO_FAIXA_5;
        }
        return 0;
    }
}
