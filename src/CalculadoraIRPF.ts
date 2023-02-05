import Rendimento from "./Rendimento";
import Deducao from "./Deducao";
import ContribuicaoPrevidenciaria from "./ContribuicaoPrevidenciaria";
import PensaoAlimenticia from "./PensaoAlimenticia";
import Dependente from "./Dependente";
import ImpostoFaixa1 from "./ImpostoFaixa1";
import ImpostoFaixa2 from "./ImpostoFaixa2";
import ImpostoFaixa3 from "./ImpostoFaixa3";
import ImpostoFaixa4 from "./ImpostoFaixa4";
import ImpostoFaixa5 from "./ImpostoFaixa5";
import { TAMANHO_FAIXA_1, TAMANHO_FAIXA_2, TAMANHO_FAIXA_3, TAMANHO_FAIXA_4 } from "./Faixas";
import Validacao from "./Validacoes";

export default class CalculadoraIRPF {
    rendimentos: Rendimento[];
    deducoes: Deducao[];
    contribuicoes: ContribuicaoPrevidenciaria[];
    pensoes: PensaoAlimenticia[];
    dependentes: Dependente[];

    constructor() {
        this.rendimentos = [];
        this.deducoes = [];
        this.contribuicoes = [];
        this.pensoes = [];
        this.dependentes = [];
    }

    cadastraRedimento(rendimento: string, valor: number) {
        Validacao.validaDescricaoRendimento(rendimento);
        Validacao.validaValorRendimento(valor);

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
        Validacao.validaDescricaoDeducao(deducao);
        Validacao.validaValorDeducao(valor);

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
        Validacao.validaDescricaoContribuicao(contribuicao);
        Validacao.validaValorContribuicao(valor);

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
        Validacao.validaDescricaoPensao(pensao);
        Validacao.validaValorPensao(valor);

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
        Validacao.validaNomeDependente(nome);
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

    getTotalImposto(): number {
        let imposto = 0;
        let tamanhoFaixa1 = TAMANHO_FAIXA_1;
        let tamanhoFaixa2 = TAMANHO_FAIXA_2;
        let tamanhoFaixa3 = TAMANHO_FAIXA_3;
        let tamanhoFaixa4 = TAMANHO_FAIXA_4;

        imposto += this.getImpostoFaixa1();
        imposto += this.getImpostoFaixa2(tamanhoFaixa1, tamanhoFaixa2);
        imposto += this.getImpostoFaixa3(tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3);
        imposto += this.getImpostoFaixa4(tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4);
        imposto += this.getImpostoFaixa5(tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4);
        return imposto;
    }

    getImpostoFaixa1() {
        return new ImpostoFaixa1().calcular();
    }

    getImpostoFaixa2(tamanhoFaixa1, tamanhoFaixa2) {
        return new ImpostoFaixa2(this, tamanhoFaixa1, tamanhoFaixa2).calcular();
    }

    getImpostoFaixa3(tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3) {
        return new ImpostoFaixa3(this, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3).calcular();
    }

    getImpostoFaixa4(tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4) {
        return new ImpostoFaixa4(this, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4).calcular();
    }

    getImpostoFaixa5(tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4) {
        return new ImpostoFaixa5(this, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4).calcular();
    }

    getAliquotaEfetiva(): number {
        const totalImposto = this.getTotalImposto();
        const totalRendimentos = this.getTotalRendimentos();
        const percent = (totalImposto / totalRendimentos) * 100.00;

        return Math.fround(percent);
    }
}
