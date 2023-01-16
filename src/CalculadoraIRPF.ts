import DescricaoEmBrancoException from "./excecoes/DescricaoEmBrancoException";
import ValorRendimentoInvalidoException from "./excecoes/ValorRendimentoInvalidoException";
import ValorDeducaoInvalidoException from "./excecoes/ValorDeducaoInvalidoException";
import ValorContribuicaoInvalidoException from "./excecoes/ValorContribuicaoInvalidoException";
import ValorPensaoInvalidoException from "./excecoes/ValorPensaoInvalidoException";
import Rendimento from "./Rendimento";
import Deducao from "./Deducao";
import ContribuicaoPrevidenciaria from "./ContribuicaoPrevidenciaria";
import PensaoAlimenticia from "./PensaoAlimenticia";
import Dependente from "./Dependente";
import NomeEmBrancoException from "./excecoes/NomeEmBrancoException";
import ImpostoFaixa1 from "./ImpostoFaixa1";
import ImpostoFaixa2 from "./ImpostoFaixa2";
import ImpostoFaixa3 from "./ImpostoFaixa3";
import ImpostoFaixa4 from "./ImpostoFaixa4";
import ImpostoFaixa5 from "./ImpostoFaixa5";

export default class CalculadoraIRPF {
    rendimentos: Rendimento[];
    deducoes: Deducao[];
    contribuicoes: ContribuicaoPrevidenciaria[];
    pensoes: PensaoAlimenticia[];
    dependentes: Dependente[];
    rendTributavel: number;

    constructor() {
        this.rendimentos = [];
        this.deducoes = [];
        this.contribuicoes = [];
        this.pensoes = [];
        this.dependentes = [];
        this.rendTributavel = 0;

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

    cadastraDeducao(deducao: string, valor: number) {
        if (deducao?.trim().length === 0) {
            throw new DescricaoEmBrancoException('O nome da deducao não pode ser em branco');
        }

        if (valor === null || valor < 0) {
            throw new ValorDeducaoInvalidoException('O valor da deducao deve ser maior ou igual a 0');
        }

        this.deducoes.push(new Deducao(deducao, valor));
    }

    getTotalDeducoes(): number {
        return this.deducoes
            .reduce((soma, deducao) => soma + deducao.valor, 0);
    }

    getDeducoes(): [string, number][] {
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
        if (pensao?.trim().length === 0) {
            throw new DescricaoEmBrancoException('O nome da pensao não pode ser em branco');
        }

        if (valor === null || valor < 0) {
            throw new ValorPensaoInvalidoException('O valor da pensao deve ser maior ou igual a 0');
        }

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

    cadastraDependente(nome: string, dataNascimento: string) {
        if (nome == null || nome?.trim().length == 0) {
            throw new NomeEmBrancoException('O nome do dependente não pode ser em branco');
        }
        this.dependentes.push(new Dependente(nome, dataNascimento));
    }

    getTotalDependentes(): number {
        return this.dependentes.length
    }

    getValorTotalDependentes(): number {
        return this.dependentes.length * 189.59
    }

    getDependentes(): [string, string][] {
        return this.dependentes
            .map((dependente) => [dependente.nome, dependente.dataNascimento]);
    }

    getTotalBaseCalculo(): number {
        return this.getTotalRendimentos() - this.getTotalDeducoes() - this.getTotalContribuicaoPrevidenciaria() - this.getTotalDependentes();
    }

    getTotalImposto(rendTributavel): number {
        let imposto = 0;
        let tamanhoFaixa1 = 1903.98;
        let tamanhoFaixa2 = 922.67;
        let tamanhoFaixa3 = 924.40;
        let tamanhoFaixa4 = 913.63;

        imposto += this.getImpostoFaixa1();
        imposto += this.getImpostoFaixa2(rendTributavel, tamanhoFaixa1, tamanhoFaixa2);
        imposto += this.getImpostoFaixa3(rendTributavel, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3);
        imposto += this.getImpostoFaixa4(rendTributavel, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4);
        imposto += this.getImpostoFaixa5(rendTributavel, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4);
        return imposto;
    }

    getImpostoFaixa1() {
        return new ImpostoFaixa1().calcular();
    }

    getImpostoFaixa2(rendTributavel, tamanhoFaixa1, tamanhoFaixa2) {
        return new ImpostoFaixa2(rendTributavel, tamanhoFaixa1, tamanhoFaixa2).calcular();
    }

    getImpostoFaixa3(rendTributavel, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3) {
        return new ImpostoFaixa3(rendTributavel, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3).calcular();
    }

    getImpostoFaixa4(rendTributavel, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4) {
        return new ImpostoFaixa4(rendTributavel, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4).calcular();
    }

    getImpostoFaixa5(rendTributavel, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4) {
        return new ImpostoFaixa5(rendTributavel, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4).calcular();
    }

    getAliquotaEfetiva(): number {
        const totalImposto = this.getTotalImposto(this.getTotalBaseCalculo());
        const totalRendimentos = this.getTotalRendimentos();
        const percent = (totalImposto / totalRendimentos) * 100.00;

        return Math.fround(percent);
    }
}
