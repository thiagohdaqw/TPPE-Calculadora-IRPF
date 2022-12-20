import DescricaoEmBrancoException from "./excecoes/DescricaoEmBrancoException";
import ValorRendimentoInvalidoException from "./excecoes/ValorRendimentoInvalidoException";
import Rendimento from "./Rendimento";


export default class CalculadoraIRPF {
    rendimentos: Rendimento[];
    nomeDed: string[];
    valorDed: number[];

    constructor() {
        this.rendimentos = [];
        this.nomeDed = [];
        this.valorDed = [];
    }

    cadastraRedimento(rendimento: string, valor: number) {
        if (rendimento == null || rendimento.trim().length == 0) {
            throw new DescricaoEmBrancoException('O nome do rendimento não pode ser em branco');
        }
        if (valor === null || valor < 0) {
            throw new ValorRendimentoInvalidoException('O valor do rendimento deve ser maior ou igual a 0');
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

    cadastrandoDed(descricao_deducoes: string, valor_ded: number) {
        this.nomeDed.push(descricao_deducoes);
        this.valorDed.push(valor_ded);
    }

    getTotalDed(): number {
        return this.valorDed[0] + (this.valorDed[1] ?? 0);
    }

    getDed(): [string, number][] {
        if (this.nomeDed.length === 1) {
            return [[this.nomeDed[0], this.valorDed[0]]]
        }
        return [
            [this.nomeDed[0], this.valorDed[0]],
            [this.nomeDed[1], this.valorDed[1]]
        ]
    }
}
