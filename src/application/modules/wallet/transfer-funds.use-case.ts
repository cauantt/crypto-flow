import { IWalletRepository } from "../../../domain/repositories/wallet.repository.interface";
import { Money } from "../../../domain/value-objects/money.value-object";


export class TransferFundsUseCase {

    constructor(private readonly repository :IWalletRepository){}

    async execute(amount : number, fromWalletId : string ,toWalletId : string ){

        const amountTransfer = new Money(amount);

        const toWallet = await this.repository.findById(toWalletId);
        const fromWallet = await this.repository.findById(fromWalletId);

        if (!fromWallet) {
        throw new Error('Carteira de origem não encontrada.');
        }
        if (!toWallet) {
        throw new Error('Carteira de destino não encontrada.');
        }

        toWallet.deposit(amountTransfer);
        fromWallet.withdraw(amountTransfer);

        await this.repository.save(toWallet);
        await this.repository.save(fromWallet);




    }


}