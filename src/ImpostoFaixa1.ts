

export default class ImpostoFaixa1 {
    imposto: number;

    constructor(imposto = 0) {
        this.imposto = imposto;
    }

    calcular() {
        if (this.imposto > 0) {
            return this.imposto;
        }
        return 0;
    }
}
