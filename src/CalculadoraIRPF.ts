import DescricaoEmBrancoException from "./excecoes/DescricaoEmBrancoException";
import ValorRendimentoInvalidoException from "./excecoes/ValorRendimentoInvalidoException";
import ValorDeducaoInvalidoException from "./excecoes/ValorDeducaoInvalidoException";
import Rendimento from "./Rendimento";
import Deducao from "./Deducao";
import ContribuicaoPrevidenciaria from "./ContribuicaoPrevidenciaria";


export default class CalculadoraIRPF {
    rendimentos: Rendimento[];
    deducoes: Deducao[];
    contribuicoes: ContribuicaoPrevidenciaria[];

    constructor() {
        this.rendimentos = [];
        this.deducoes = [];
        this.contribuicoes = [];
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

    cadastraContribuicaoPrevidenciaria(contribuicao: string, valor: number) {
        this.contribuicoes.push(new ContribuicaoPrevidenciaria(contribuicao, valor));
    }

    getTotalContribuicaoPrevidenciaria(): number {
        return this.contribuicoes
            .reduce((soma, contribuicao) => soma + contribuicao.valor, 0);
    }

    getContribuicaoPrevidenciaria(): [string, number][] {
        return this.contribuicoes
        .map(contribuicao => [contribuicao.nome, contribuicao.valor]);
    }

}
