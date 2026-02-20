import { Wallet } from "./wallet.entity";
import { Money } from "../value-objects/money.value-object";
import { randomUUID } from "crypto";


describe ('Wallet entity', ()=>{

    it('Deve criar um objeto Wallet com id, userId e balance',()=>{

        const saldoInicial = new Money(1500);
        const wallet =  new Wallet("aasdasdasda", "1", saldoInicial);


        expect(wallet.id).toBe("aasdasdasda");
        expect(wallet.userId).toBe("1");
        expect(wallet.balance.amount).toBe(1500);
});

    it("deve realizar um depósito corretamente" , ()=>{

        const wallet =  new Wallet("aasdasdasda", "1", new Money(1000));
        const deposito =  new Money(100);

        wallet.deposit(deposito);

        expect(wallet.balance.amount).toBe(1100);});


    it("deve realizar um saque corretamente" , ()=>{

        const wallet =  new Wallet("aasdasdasda", "1", new Money(1000));
        const saque =  new Money(100);

        wallet.withdraw(saque);

        expect(wallet.balance.amount).toBe(900);});


    it("deve repassar o erro do Money ao tentar sacar mais do que tem" , ()=>{

        const wallet =  new Wallet("aasdasdasda", "1", new Money(1000));
        const saque =  new Money(1100);

        expect(()=> wallet.withdraw(saque)).toThrow('O valor não pode ser negativo.');
    });

});