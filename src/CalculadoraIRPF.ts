import DescricaoEmBrancoException from "./excecoes/DescricaoEmBrancoException";
import ValorRendimentoInvalidoException from "./excecoes/ValorRendimentoInvalidoException";
import ValorDeducaoInvalidoException from "./excecoes/ValorDeducaoInvalidoException";
import Rendimento from "./Rendimento";
import Deducao from "./Deducao";


export default class CalculadoraIRPF {
    rendimentos: Rendimento[];
    deducoes: Deducao[];
    descricao_contribuicao: string;
    valor_contribuicao: number;

    constructor() {
        this.rendimentos = [];
        this.deducoes = [];
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

    cadastrandoDed(deducao: string, valor: number) {
        if (deducao?.trim().length === 0) {
            throw new DescricaoEmBrancoException('O nome da deducao não pode ser em branco');
        }

        if (valor === null || valor < 0) {
            throw new ValorDeducaoInvalidoException('O valor da deducao deve ser maior ou igual a 0');
        }

        this.deducoes.push(new Deducao(deducao, valor));
    }

    getTotalDed(): number {
        return this.deducoes
            .reduce((soma, deducao) => soma + deducao.valor, 0);
    }

    getDed(): [string, number][] {
        return this.deducoes
        .map(deducao => [deducao.nome, deducao.valor]);
    }

    cadastraContribuicaoPrevidenciaria(descricao_contribuicao: string, valor_contribuicao: number) {
        this.descricao_contribuicao = descricao_contribuicao;
        this.valor_contribuicao = valor_contribuicao;
    }

    getTotalContribuicaoPrevidenciaria(): number {
        return 100;
    }

    getContribuicaoPrevidenciaria(): [[string, number]] {
        return [
            ['Contribuicao no contracheque', 100.0]
        ]
    }
}
