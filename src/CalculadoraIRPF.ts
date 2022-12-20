

export default class CalculadoraIRPF {
    nomeRendimentos: string[];
    valorRendimentos: number[];

    constructor() {
        this.valorRendimentos = [];
        this.nomeRendimentos = [];
    }

    cadastraRedimento(rendimento: string, valor: number) {
        this.nomeRendimentos.push(rendimento);
        this.valorRendimentos.push(valor);
    }

    getTotalRendimentos(): number {
        return this.valorRendimentos
            .reduce((soma, valor) => soma + valor, 0);
    }

    getRendimentos(): [string, number][] {
        return this.nomeRendimentos
            .map((nome, index) => [nome, this.valorRendimentos[index]]);
    }
}
