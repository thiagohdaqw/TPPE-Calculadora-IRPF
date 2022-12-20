import CalculadoraIRPF from '../CalculadoraIRPF';


test('Cadastra um rendimento do tipo Salario', () => {
  const calculadora = new CalculadoraIRPF();

  calculadora.cadastraRedimento('Salario', 500.0);

  expect(calculadora.getTotalRendimentos())
    .toBeCloseTo(500.0, 2);
  expect(calculadora.getRendimentos())
    .toEqual([['Salario', 500.0]]);
});


test('Cadastra dois rendimentos', () => {
  const calculadora = new CalculadoraIRPF();

  calculadora.cadastraRedimento('Salario', 500.0);
  calculadora.cadastraRedimento('Aluguel', 750.50);

  expect(calculadora.getTotalRendimentos())
    .toBeCloseTo(1250.50, 2);
  expect(calculadora.getRendimentos())
    .toEqual([
      ['Salario', 500.0],
      ['Aluguel', 750.50]
    ])
});


test('Cadastra três rendimentos', () => {
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