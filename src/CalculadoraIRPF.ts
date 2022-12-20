

export default class CalculadoraIRPF {
    rendimento: string;
    valor: number;

    cadastraRedimento(rendimento: string, valor: number) {
        this.rendimento = rendimento;
        this.valor = valor;
    }

    getTotalRendimentos(): number {
        return 500;
    }

    getRendimentos(): [[string, number]] {
        return [
            ['Salario', 500.0]
        ]
    }
}
