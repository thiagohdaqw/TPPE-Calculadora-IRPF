

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
        return this.valorRendimentos[0] + (this.valorRendimentos[1] ?? 0);
    }

    getRendimentos(): [string, number][] {
        if (this.nomeRendimentos.length === 1) {
            return [[this.nomeRendimentos[0], this.valorRendimentos[0]]]
        }

        return [
            [this.nomeRendimentos[0], this.valorRendimentos[0]],
            [this.nomeRendimentos[1], this.valorRendimentos[1]]
        ];
    }
}
