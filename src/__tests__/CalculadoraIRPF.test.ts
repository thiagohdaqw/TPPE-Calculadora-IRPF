import CalculadoraIRPF from '../CalculadoraIRPF';
import DescricaoEmBrancoException from '../excecoes/DescricaoEmBrancoException';
import ValorRendimentoInvalidoException from '../excecoes/ValorRendimentoInvalidoException';
import ValorDeducaoInvalidoException from '../excecoes/ValorDeducaoInvalidoException';
import ValorContribuicaoInvalidoException from '../excecoes/ValorContribuicaoInvalidoException';

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

    it('Cadastra primeira dedução de pensão alimentícia', () => {
      const calculadora = new CalculadoraIRPF();
    
      calculadora.cadastrandoDed('Pensão alimentícia', 200.0);
    
      expect(calculadora.getTotalDed())
        .toBeCloseTo(200.0, 2);
      expect(calculadora.getDed())
        .toEqual([['Pensão alimentícia', 200.0]]);
    });

    it('Cadastra segunda dedução de pensão alimentícia', () => {
      const calculadora = new CalculadoraIRPF();
    
      calculadora.cadastrandoDed('Pensão alimentícia', 200.0);
      calculadora.cadastrandoDed('Valores pagos via carnê-leão', 120.0);
    
      expect(calculadora.getTotalDed())
        .toBeCloseTo(320.0, 2);
      expect(calculadora.getDed())
        .toEqual([
          ['Pensão alimentícia', 200.0],
          ['Valores pagos via carnê-leão', 120.0]
        ]);
    });


    it('Cadastra terceira dedução de pensão alimentícia', () => {
      const calculadora = new CalculadoraIRPF();
    
      calculadora.cadastrandoDed('Pensão alimentícia', 200.0);
      calculadora.cadastrandoDed('Valores pagos via carnê-leão', 120.0);
      calculadora.cadastrandoDed('Fundo de Previdência dos Servidores públicos (Funpresp)', 610.0);
    
      expect(calculadora.getTotalDed())
        .toBeCloseTo(930.0, 2);
      expect(calculadora.getDed())
        .toEqual([
          ['Pensão alimentícia', 200.0],
          ['Valores pagos via carnê-leão', 120.0],
          ['Fundo de Previdência dos Servidores públicos (Funpresp)', 610.0]
        ]);
    });

    it.each<[[string, number][], number]>([
      [[['Pensão alimentícia', 200], ['Valores pagos via carnê-leão', 90], ['Previdência privada', 800], ['Fundo de Previdência dos Servidores públicos (Funpresp)', 405.30]], 1495.3],
      [[['Pensão alimentícia', 902.14], ['Previdência privada', 290.01]], 1192.15],
      [[['Fundo de Previdência dos Servidores públicos (Funpresp)', 534.25]], 534.25],
    ])
    ('Cadastra deducao %p total %p', (deducoes: [string, number][], total: number) => {
      const calculadora = new CalculadoraIRPF();
      
      deducoes.forEach(([nome, valor]) => calculadora.cadastrandoDed(nome, valor))
      
      expect(calculadora.getTotalDed())
        .toBeCloseTo(total, 2);
      expect(calculadora.getDed())
        .toEqual(deducoes);
    });

    it.each([[null], [''], [' ']])
    ('lança exceção quando nome da deducao está em branco', (nome: string | null) => {
      const calculadora = new CalculadoraIRPF();

      expect(() => {
        calculadora.cadastrandoDed(' ', 500);
      }).toThrow(DescricaoEmBrancoException);
  });

    it.each([[null], [-1], [-10000]])
    ('lança exceção quando valor da deducao é invalida: %p', (valor: number | null) => {
    const calculadora = new CalculadoraIRPF();

    expect(() => {
      calculadora.cadastrandoDed('Pensão alimentícia', valor as number)
    }).toThrowError(ValorDeducaoInvalidoException);
  });

  test('Cadastra contribuição previdenciária oficial no contracheque', () => {
    const calculadora = new CalculadoraIRPF();

    calculadora.cadastraContribuicaoPrevidenciaria('Contribuicao no contracheque', 100.0);

    expect(calculadora.getTotalContribuicaoPrevidenciaria())
      .toBeCloseTo(100.0, 2);
    expect(calculadora.getContribuicaoPrevidenciaria())
      .toEqual([['Contribuicao no contracheque', 100.0]]);
  });

  test('Cadastra segunda contribuição previdenciária oficial no contracheque', () => {
    const calculadora = new CalculadoraIRPF();

    calculadora.cadastraContribuicaoPrevidenciaria('Contribuicao no contracheque', 100.0);
    calculadora.cadastraContribuicaoPrevidenciaria('Contribuição via carnê INSS', 130.0);

    expect(calculadora.getTotalContribuicaoPrevidenciaria())
      .toBeCloseTo(230.0, 2);
    expect(calculadora.getContribuicaoPrevidenciaria())
      .toEqual([
        ['Contribuicao no contracheque', 100.0],
        ['Contribuição via carnê INSS', 130.0]
      ]);
  });

  test('Cadastra terceira contribuicao previdenciaria', () => {
    const calculadora = new CalculadoraIRPF();

    calculadora.cadastraContribuicaoPrevidenciaria('Contribuicao no contracheque', 100.0);
    calculadora.cadastraContribuicaoPrevidenciaria('Contribuição via carnê INSS', 130.0);
    calculadora.cadastraContribuicaoPrevidenciaria('Contribuicao no contracheque IPREV', 500.3);

    expect(calculadora.getTotalContribuicaoPrevidenciaria())
      .toBeCloseTo(730.3, 2);
    expect(calculadora.getContribuicaoPrevidenciaria())
      .toEqual([
        ['Contribuicao no contracheque', 100.0],
        ['Contribuição via carnê INSS', 130.0],
        ['Contribuicao no contracheque IPREV', 500.3]
      ]);
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

});
