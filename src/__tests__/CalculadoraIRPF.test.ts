import CalculadoraIRPF from '../CalculadoraIRPF';
import DescricaoEmBrancoException from '../excecoes/DescricaoEmBrancoException';
import ValorRendimentoInvalidoException from '../excecoes/ValorRendimentoInvalidoException';

describe('CalculadoraIRPF', () => {

  it('cadastra um rendimento do tipo Salario', () => {
    const calculadora = new CalculadoraIRPF();
  
    calculadora.cadastraRedimento('Salario', 500.0);
  
    expect(calculadora.getTotalRendimentos())
      .toBeCloseTo(500.0, 2);
    expect(calculadora.getRendimentos())
      .toEqual([['Salario', 500.0]]);
  });


  it('cadastra dois rendimentos', () => {
    const calculadora = new CalculadoraIRPF();
  
    calculadora.cadastraRedimento('Salario', 500.0);
    calculadora.cadastraRedimento('Aluguel', 750.50);
  
    expect(calculadora.getTotalRendimentos())
      .toBeCloseTo(1250.50, 2);
    expect(calculadora.getRendimentos())
      .toEqual([
        ['Salario', 500.0],
        ['Aluguel', 750.50]
      ]);
  });
  
  
  it('Cadastra três rendimentos', () => {
    const calculadora = new CalculadoraIRPF();
  
    calculadora.cadastraRedimento('Salario', 500.0);
    calculadora.cadastraRedimento('Aluguel', 750.50);
    calculadora.cadastraRedimento('Ação', 1550.50);
  
    expect(calculadora.getTotalRendimentos())
      .toBeCloseTo(2801.0, 2);
    expect(calculadora.getRendimentos())
      .toEqual([
        ['Salario', 500.0],
        ['Aluguel', 750.50],
        ['Ação', 1550.50]
      ])
  });


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

    test('Cadastra primeira dedução de pensão alimentícia', () => {
      const calculadora = new CalculadoraIRPF();
    
      calculadora.cadastrandoDed('Pensão alimentícia', 200.0);
    
      expect(calculadora.getTotalDed())
        .toBeCloseTo(200.0, 2);
      expect(calculadora.getDed())
        .toEqual([['Pensão alimentícia', 200.0]]);
    });

    test('Cadastra segunda dedução de pensão alimentícia', () => {
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


    test('Cadastra terceira dedução de pensão alimentícia', () => {
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

});
