import DescricaoEmBrancoException from "./excecoes/DescricaoEmBrancoException";
import Rendimento from "./Rendimento";


export default class CalculadoraIRPF {
    rendimentos: Rendimento[];

    constructor() {
        this.rendimentos = [];
    }

    cadastraRedimento(rendimento: string, valor: number) {
        if (rendimento?.trim().length === 0) {
            throw new DescricaoEmBrancoException('O nome do rendimento não pode ser em branco');
        }

        this.rendimentos.push(new Rendimento(rendimento, valor));
    }

    getTotalRendimentos(): number {
        return this.rendimentos
            .reduce((soma, rendimento) => soma + rendimento.valor, 0);
    }

    getRendimentos(): [string, number][] {
        return this.rendimentos
            .map(rendimento => [rendimento.nome, rendimento.valor]);
    }
}
