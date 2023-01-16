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
        let Faixa1 = 0;
        if (Faixa1 > 0) {
            return Faixa1;
        }
        return 0;
    }

    getImpostoFaixa2(rendTributavel, tamanhoFaixa1, tamanhoFaixa2) {
        let Faixa2 = parseFloat((rendTributavel - tamanhoFaixa1).toFixed(2));

        if (Faixa2 > 0) {
            if (Faixa2 <= tamanhoFaixa2) {
                return Faixa2 * 7.5 / 100;
            }
            else {
                return tamanhoFaixa2 * 7.5 / 100;
            }
        }
        return 0;
    }

    getImpostoFaixa3(rendTributavel, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3) {
        let Faixa3 = parseFloat((rendTributavel - (tamanhoFaixa1 + tamanhoFaixa2)).toFixed(2));
        if (Faixa3 > 0) {
            if (Faixa3 <= tamanhoFaixa3) {
                return Faixa3 * 15 / 100;
            }
            else {
                return tamanhoFaixa3 * 15 / 100;
            }
        }
        return 0;
    }

    getImpostoFaixa4(rendTributavel, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4) {
        let Faixa4 = parseFloat((rendTributavel - (tamanhoFaixa1 + tamanhoFaixa2 + tamanhoFaixa3)).toFixed(2));
        if (Faixa4 > 0) {
            if (Faixa4 <= tamanhoFaixa4) {
                return Faixa4 * 22.5 / 100;
            }
            else {
                return tamanhoFaixa4 * 22.5 / 100;
            }
        }
        return 0;
    }

    getImpostoFaixa5(rendTributavel, tamanhoFaixa1, tamanhoFaixa2, tamanhoFaixa3, tamanhoFaixa4) {
        let Faixa5 = parseFloat((rendTributavel - (tamanhoFaixa1 + tamanhoFaixa2 + tamanhoFaixa3 + tamanhoFaixa4)).toFixed(2));
        if (Faixa5 > 0) {
            return Faixa5 * 27.5 / 100;
        }
        return 0;
    }

    getAliquotaEfetiva(): number {
        const totalImposto = this.getTotalImposto(this.getTotalBaseCalculo());
        const totalRendimentos = this.getTotalRendimentos();
        const percent = (totalImposto / totalRendimentos) * 100.00;

        return Math.fround(percent);
    }
}
