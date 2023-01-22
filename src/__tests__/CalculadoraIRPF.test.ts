import CalculadoraIRPF from '../CalculadoraIRPF';
import DescricaoEmBrancoException from '../excecoes/DescricaoEmBrancoException';
import ValorRendimentoInvalidoException from '../excecoes/ValorRendimentoInvalidoException';
import ValorDeducaoInvalidoException from '../excecoes/ValorDeducaoInvalidoException';
import ValorContribuicaoInvalidoException from '../excecoes/ValorContribuicaoInvalidoException';
import ValorPensaoInvalidoException from '../excecoes/ValorPensaoInvalidoException';
import NomeEmBrancoException from '../excecoes/NomeEmBrancoException';

enum Deducao {
    Pensao,
    Previdencia,
    Dependente,
    Outros,
};

describe('CalculadoraIRPF', () => {

    it.each<[[string, number][], number]>([
        [[['Salario', 100], ['Aluguel', 500], ['Ação', 800.5], ['Dividendos', 800.1]], 2200.6],
        [[['Lucros', 987.64], ['Aluguel', 0.01]], 987.65],
    ])
        ('cadastra rendimentos %p total %p', (rendimentos: [string, number][], total: number) => {
            const calculadora = new CalculadoraIRPF();

            rendimentos.forEach(([nome, valor]) => calculadora.cadastraRedimento(nome, valor))

            expect(calculadora.getTotalRendimentos())
                .toBeCloseTo(total, 2);
            expect(calculadora.getRendimentos())
                .toEqual(rendimentos);
        });

    it.each([[null], [''], [' ']])
        ('lança exceção quando nome do rendimento está em branco', (nome: string | null) => {
            const calculadora = new CalculadoraIRPF();

            expect(() => {
                calculadora.cadastraRedimento(nome as string, 500);
            }).toThrow(DescricaoEmBrancoException);
        });

    it.each([[null], [-1], [-10000]])
        ('lança exceção quando valor do rendimento é invalido: %p', (valor: number | null) => {
            const calculadora = new CalculadoraIRPF();

            expect(() => {
                calculadora.cadastraRedimento('Salario', valor as number)
            }).toThrowError(ValorRendimentoInvalidoException);
        });


    it.each<[[string, number][], number]>([
        [[['Pensão alimentícia', 200], ['Valores pagos via carnê-leão', 90], ['Previdência privada', 800], ['Fundo de Previdência dos Servidores públicos (Funpresp)', 405.30]], 1495.3],
        [[['Pensão alimentícia', 902.14], ['Previdência privada', 290.01]], 1192.15],
        [[['Fundo de Previdência dos Servidores públicos (Funpresp)', 534.25]], 534.25],
    ])
        ('Cadastra deducao %p total %p', (deducoes: [string, number][], total: number) => {
            const calculadora = new CalculadoraIRPF();

            deducoes.forEach(([nome, valor]) => calculadora.cadastraDeducao(nome, valor))

            expect(calculadora.getTotalDeducoes())
                .toBeCloseTo(total, 2);
            expect(calculadora.getDeducoes())
                .toEqual(deducoes);
        });

    it.each([[null], [''], [' ']])
        ('lança exceção quando nome da deducao está em branco', (nome: string | null) => {
            const calculadora = new CalculadoraIRPF();

            expect(() => {
                calculadora.cadastraDeducao(' ', 500);
            }).toThrow(DescricaoEmBrancoException);
        });

    it.each([[null], [-1], [-10000]])
        ('lança exceção quando valor da deducao é invalida: %p', (valor: number | null) => {
            const calculadora = new CalculadoraIRPF();

            expect(() => {
                calculadora.cadastraDeducao('Pensão alimentícia', valor as number)
            }).toThrowError(ValorDeducaoInvalidoException);
        });


    it.each<[[string, number][], number]>([
        [[['Contribuicao no contracheque', 430], ['Contribuição via carnê INSS', 490], ['Contribuicao no contracheque IPREV', 300]], 1220.0],
        [[['Contribuição via carnê INSS', 560.14], ['Contribuicao no contracheque', 370.01]], 930.15],
        [[['Contribuição via carnê INSS', 700.25]], 700.25],
    ])
        ('Cadastra contribuicao previdenciaria %p total %p', (contribuicoes: [string, number][], total: number) => {
            const calculadora = new CalculadoraIRPF();

            contribuicoes.forEach(([nome, valor]) => calculadora.cadastraContribuicaoPrevidenciaria(nome, valor))

            expect(calculadora.getTotalContribuicaoPrevidenciaria())
                .toBeCloseTo(total, 2);
            expect(calculadora.getContribuicaoPrevidenciaria())
                .toEqual(contribuicoes);
        });

    it('lança exceção quando nome da contribuicao previdenciaria está em branco', () => {
        const calculadora = new CalculadoraIRPF();

        expect(() => {
            calculadora.cadastraContribuicaoPrevidenciaria('  ', 500);
        }).toThrow(DescricaoEmBrancoException);
    })

    it.each([[null], [-1], [-10000]])
        ('lança exceção quando valor da contribuicao é invalida: %p', (valor: number | null) => {
            const calculadora = new CalculadoraIRPF();

            expect(() => {
                calculadora.cadastraContribuicaoPrevidenciaria('Contribuicao no contracheque', valor as number)
            }).toThrowError(ValorContribuicaoInvalidoException);
        });

    it.each<[[string, number][], number]>([
        [[['Pensao filho Jose', 100.10], ['Pensao filho Joao', 200], ['Pensao filha Maria', 120]], 420.10],
        [[['Pensao filho Carlos', 600.50], ['Pensao filha Julia', 600.50]], 1201],
        [[['Pensao filho Matheus', 400.20]], 400.20],
    ])
        ('Cadastra pensao alimenticia %p total %p', (pensoes: [string, number][], total: number) => {
            const calculadora = new CalculadoraIRPF();

            pensoes.forEach(([nome, valor]) => calculadora.cadastraPensaoAlimenticia(nome, valor))

            expect(calculadora.getTotalPensaoAlimenticia())
                .toBeCloseTo(total, 2);
            expect(calculadora.getPensaoAlimenticia())
                .toEqual(pensoes);
        });

    it('lança exceção quando nome da pensao está em branco', () => {
        const calculadora = new CalculadoraIRPF();

        expect(() => {
            calculadora.cadastraPensaoAlimenticia('  ', 500);
        }).toThrow(DescricaoEmBrancoException);
    })

    it.each([[null], [-1], [-10000]])
        ('lança exceção quando valor da pensao é invalida: %p', (valor: number | null) => {
            const calculadora = new CalculadoraIRPF();

            expect(() => {
                calculadora.cadastraPensaoAlimenticia('Pensao filha Julia', valor as number)
            }).toThrowError(ValorPensaoInvalidoException);
        });

    it.each<[[string, string][], number]>([
        [[['André', '12/12/1990'], ['Camila', '08/11/2001'], ['Flávia', '04/09/1998'], ['Antônio', '05/12/1960']], 758.36],
        [[['Arthur', '01/01/2001'], ['Andressa', '30/02/1999']], 379.18]
    ])
        ('cadastra dependentes %p total %p', (dependentes: [string, string][], total: number) => {
            const calculadora = new CalculadoraIRPF();

            dependentes.forEach(([nome, dataNascimento]) => calculadora.cadastraDependente(nome, dataNascimento))

            expect(calculadora.getValorTotalDependentes())
                .toBeCloseTo(total, 1);
            expect(calculadora.getDependentes())
                .toEqual(dependentes);
            expect(calculadora.getTotalDependentes())
                .toBeCloseTo(dependentes.length, 1);
        });

    it.each([[null], [''], [' ']])
        ('lança exceção quando nome do dependente está em branco', (nome: string | null) => {
            const calculadora = new CalculadoraIRPF();

            expect(() => {
                calculadora.cadastraDependente(nome as string, '01/01/2001');
            }).toThrow(NomeEmBrancoException);
        })

    it.each<[[string, number][], [string, number | string, Deducao][], number]>([
            [
                [['Salario', 10000], ['Aluguel', 500], ['Ação', 800.5], ['Dividendos', 800.1]],
                [['Pensão alimentícia', 200, Deducao.Pensao], ['Valores pagos via carnê-leão', 90, Deducao.Outros], ['Previdência privada', 800, Deducao.Previdencia], ['Fundo de Previdência dos Servidores públicos (Funpresp)', 405.30, Deducao.Previdencia]],
                2102.097
            ],
            [
                [['Lucros', 10000.64], ['Aluguel', 0.01]],
                [['Pensão alimentícia', 100.0, Deducao.Pensao], ['Previdência privada', 290.01, Deducao.Previdencia], ['INSS', 550, Deducao.Previdencia], ['Remedio', 100, Deducao.Outros]],
                1622.316
            ]
        ])
        ('Cálculo do Imposto', (rendimentos: [string, number][], deducoes: [string, number | string, Deducao][], total: number) => {
            const calculadora = new CalculadoraIRPF();

            rendimentos.forEach(([nome, valor]) => calculadora.cadastraRedimento(nome, valor));
            deducoes.forEach(([nome, valor, tipo]) => {
                switch(tipo) {
                    case Deducao.Dependente:
                        calculadora.cadastraDependente(nome, valor as string);
                        break;
                    case Deducao.Pensao:
                        calculadora.cadastraPensaoAlimenticia(nome, valor as number);
                        break;
                    case Deducao.Previdencia:
                        calculadora.cadastraContribuicaoPrevidenciaria(nome, valor as number);
                        break;
                    case Deducao.Outros:
                        calculadora.cadastraDeducao(nome, valor as number)
                }
            });

            expect(calculadora.getTotalImposto()).toBeCloseTo(total);
        });

    it.each<[[string, number][], [string, number][], number]>([
        [
            [['Salario', 100], ['Aluguel', 500], ['Ação', 800.5], ['Dividendos', 800.1]],
            [['Pensão alimentícia', 200], ['Valores pagos via carnê-leão', 90], ['Previdência privada', 800], ['Fundo de Previdência dos Servidores públicos (Funpresp)', 405.30]],
            0.00
        ],
        [
            [['Lucros', 5000.64], ['Aluguel', 0.01]],
            [['Pensão alimentícia', 100.0], ['Previdência privada', 290.01]],
            8.02
        ]
    ])
        ('Obtem aliquota efetiva', (rendimentos: [string, number][], deducoes: [string, number][], total: number) => {
            const calculadora = new CalculadoraIRPF();

            rendimentos.forEach(([nome, valor]) => calculadora.cadastraRedimento(nome, valor));
            deducoes.forEach(([nome, valor]) => calculadora.cadastraDeducao(nome, valor));

            expect(calculadora.getAliquotaEfetiva())
                .toBeCloseTo(total, 2);
        })
});
