

export default class ImpostoFaixa1 {
    imposto: number;

    constructor(imposto = 0) {
        this.imposto = imposto;
    }

    /*
       * Método responsável por calcular o valor total do imposto que se enquadra na faixa 1
       * Retorna: valor total do imposto da faixa 1
       * Aqui foram extraídas sub-classes para serem responsáveis pelo cálculo do imposto de acordo com cada faixa
    */

    calcular() {
        if (this.imposto > 0) {
            return this.imposto;
        }
        return 0;
    }
}
