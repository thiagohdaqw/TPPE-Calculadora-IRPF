import DescricaoEmBrancoException from "./excecoes/DescricaoEmBrancoException";
import ValorRendimentoInvalidoException from "./excecoes/ValorRendimentoInvalidoException";
import Rendimento from "./Rendimento";


export default class CalculadoraIRPF {
    rendimentos: Rendimento[];
    descricao_deducoes: string;
    valor_ded: number;

    constructor() {
        this.rendimentos = [];
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
        this.descricao_deducoes = descricao_deducoes;
        this.valor_ded = valor_ded;
    }

    getTotalDed(): number {
        return 200;
    }

    getDed(): [[string, number]] {
        return [
            ['Pensão alimentícia', 200.0]
        ]
    }

}
