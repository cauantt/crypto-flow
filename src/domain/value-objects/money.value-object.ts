export class Money {

    private readonly _amountInCents: number;

    constructor(amountInCents: number){

        if(!Number.isInteger(amountInCents)){

            throw new Error('O valor deve ser um número inteiro (centavos).');
        }

        if(amountInCents < 0){

            throw new Error('O valor não pode ser negativo.');
        
        }

        this._amountInCents = amountInCents;


    }


    get amount() : number{

        return this._amountInCents;}


    add(other : Money){

        
        return new Money(this._amountInCents + other._amountInCents)}


    subtract(other : Money){

    

        return new Money(this._amountInCents - other._amountInCents);
    }
}