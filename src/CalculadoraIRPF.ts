import DescricaoEmBrancoException from "./excecoes/DescricaoEmBrancoException";
import ValorRendimentoInvalidoException from "./excecoes/ValorRendimentoInvalidoException";
import ValorDeducaoInvalidoException from "./excecoes/ValorDeducaoInvalidoException";
import ValorContribuicaoInvalidoException from "./excecoes/ValorContribuicaoInvalidoException";
import Rendimento from "./Rendimento";
import Deducao from "./Deducao";
import ContribuicaoPrevidenciaria from "./ContribuicaoPrevidenciaria";
import PensaoAlimenticia from "./PensaoAlimenticia";

export default class CalculadoraIRPF {
    rendimentos: Rendimento[];
    deducoes: Deducao[];
    contribuicoes: ContribuicaoPrevidenciaria[];
    pensoes: PensaoAlimenticia[];

    constructor() {
        this.rendimentos = [];
        this.deducoes = [];
        this.contribuicoes = [];
        this.pensoes = [];
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
        if (contribuicao?.trim().length === 0) {
            throw new DescricaoEmBrancoException('O nome da contribuicao não pode ser em branco');
        }

        if (valor === null || valor < 0) {
            throw new ValorContribuicaoInvalidoException('O valor da contribuicao deve ser maior ou igual a 0');
        }

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


    cadastraPensaoAlimenticia(pensao: string, valor: number) {
        this.pensoes.push(new PensaoAlimenticia(pensao, valor));
    }

    getTotalPensaoAlimenticia(): number {
        return this.pensoes
            .reduce((soma, pensao) => soma + pensao.valor, 0);
    }

    getPensaoAlimenticia(): [string, number][] {
        return this.pensoes
        .map(pensao => [pensao.nome, pensao.valor]);
    }

}
