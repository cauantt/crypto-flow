import { Money } from './money.value-object';

describe('Money Value Object', () => {
  it('deve criar uma instância com valor válido (em centavos)', () => {
    const money = new Money(1500); 
    expect(money.amount).toBe(1500)
  });

   it('deve lançar erro se o valor não for um número inteiro', () => {
    
    expect(() => new Money(10.5)).toThrow('O valor deve ser um número inteiro (centavos).');
  });

   it('deve lançar erro se o valor for negativo', () => {
    
    expect(() => new Money(-100)).toThrow('O valor não pode ser negativo.');
  });

it("deve somar dois valores e retornar corretamente a soma dos valores", () => {

    let dinheiro1 = new Money(1500);
    let dinheiro2 = new Money(500);

    const resultado = dinheiro1.add(dinheiro2);
    
    expect(resultado.amount).toBe(2000);
});

it("deve retornar error se a subtraçao der número negativo", ()=>{

    let saldo = new Money(1000);
    let saque =  new Money(1001);

   

    expect(()=> saldo.subtract(saque)).toThrow("O valor não pode ser negativo.");

});



});