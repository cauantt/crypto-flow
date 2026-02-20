import { Money } from "../value-objects/money.value-object";

export class Wallet{

    private readonly _id: string;
    private readonly _userId: string;
    private _balance: Money;

    constructor(
   id: string,
   userId: string,
    balance: Money
    ){

        this._id = id;
        this._userId = userId;
        this._balance = balance;

    }

    get id(): string {

        return this._id;

    }

     get userId(): string {

        return this._userId;

    }

    get balance() : Money {

        return this._balance;
    }

    deposit(amount : Money){

      this._balance =  this._balance.add(amount);

    }

    withdraw(amount : Money){

        this._balance = this._balance.subtract(amount);
    }

}