import CalculadoraIRPF from "./CalculadoraIRPF";
import { IMPOSTO_FAIXA_2 } from "./Faixas";


export default class ImpostoFaixa2 {
    calculadora: CalculadoraIRPF;
    tamanhoFaixa1: number;
    tamanhoFaixa2: number;
    

    constructor(calculadora, tamanhoFaixa1, tamanhoFaixa2) {
        this.calculadora = calculadora;
        this.tamanhoFaixa1 = tamanhoFaixa1;
        this.tamanhoFaixa2 = tamanhoFaixa2;
    }

    /*
       * Método responsável por calcular o valor total do imposto que se enquadra na faixa 2
       * Retorna: valor total do imposto da faixa 2
       * Aqui foram extraídas sub-classes para serem responsáveis pelo cálculo do imposto de acordo com cada faixa
    */
   
    calcular() {
        let faixa = parseFloat((this.calculadora.getTotalBaseCalculo() - this.tamanhoFaixa1).toFixed(2));

        if (faixa > 0) {
            if (faixa <= this.tamanhoFaixa2) {
                return faixa * IMPOSTO_FAIXA_2;
            }
            else {
                return this.tamanhoFaixa2 * IMPOSTO_FAIXA_2;
            }
        }
        return 0;
    }
}
