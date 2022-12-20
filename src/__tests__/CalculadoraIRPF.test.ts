import CalculadoraIRPF from '../CalculadoraIRPF';


test('Cadastra um rendimento do tipo Salario', () => {
  const calculadora = new CalculadoraIRPF();

  calculadora.cadastraRedimento('Salario', 500.0);

  expect(calculadora.getTotalRendimentos())
    .toBeCloseTo(500.0, 2);
  expect(calculadora.getRendimentos())
    .toEqual([['Salario', 500.0]]);
});


test('Cadastra mais um rendimento', () => {
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