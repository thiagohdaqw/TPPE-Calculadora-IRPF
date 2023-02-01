import DescricaoEmBrancoException from "./excecoes/DescricaoEmBrancoException";
import ValorRendimentoInvalidoException from "./excecoes/ValorRendimentoInvalidoException";
import ValorDeducaoInvalidoException from "./excecoes/ValorDeducaoInvalidoException";
import ValorContribuicaoInvalidoException from "./excecoes/ValorContribuicaoInvalidoException";
import ValorPensaoInvalidoException from "./excecoes/ValorPensaoInvalidoException";

export default class Validacao{
    static validaDescricaoRendimento(descricaoRendimento: string): void {
        if (descricaoRendimento == null || descricaoRendimento.trim().length == 0) {
            throw new DescricaoEmBrancoException('O nome do rendimento não pode ser em branco');
        }
    }

    static validaValorRendimento(valorRendimento: number): void {
        if (valorRendimento === null || valorRendimento < 0) {
            throw new ValorRendimentoInvalidoException('O valor do rendimento deve ser maior ou igual a 0');
        }
    }

    static validaDescricaoDeducao(descricaoDeducao: string): void {
        if (descricaoDeducao?.trim().length === 0) {
            throw new DescricaoEmBrancoException('O nome da deducao não pode ser em branco');
        }
    }

    static validaValorDeducao(valor: number): void {
        if (valor === null || valor < 0) {
            throw new ValorDeducaoInvalidoException('O valor da deducao deve ser maior ou igual a 0');
        }
    }

    static validaDescricaoContribuicao(descricaoContribuicao: string): void {
        if (descricaoContribuicao?.trim().length === 0) {
            throw new DescricaoEmBrancoException('O nome da contribuicao não pode ser em branco');
        }
    }

    static validaValorContribuicao(valorContribuicao: number): void {
        if (valorContribuicao === null || valorContribuicao < 0) {
            throw new ValorContribuicaoInvalidoException('O valor da contribuicao deve ser maior ou igual a 0');
        }
    }

    static validaDescricaoPensao(descricaoPensao: string): void {
        if (descricaoPensao?.trim().length === 0) {
            throw new DescricaoEmBrancoException('O nome da pensao não pode ser em branco');
        }
    }

    static validaValorPensao(valorPensao: number): void {
        if (valorPensao === null || valorPensao < 0) {
            throw new ValorPensaoInvalidoException('O valor da pensao deve ser maior ou igual a 0');
        }
    }

}