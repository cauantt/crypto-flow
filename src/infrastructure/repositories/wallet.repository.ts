import { Inject, Injectable } from "@nestjs/common";
import { Wallet } from "src/domain/entities/wallet.entity";
import { IWalletRepository } from "src/domain/repositories/wallet.repository.interface";
import { Money } from "src/domain/value-objects/money.value-object";
import { Repository } from "typeorm";
import { WalletTypeOrmEntity } from "../database/entities/wallet.typeorm-entity";

@Injectable()
export class WalletRepository implements IWalletRepository {

    constructor(

        @Inject(Repository<Wallet>)
        private readonly repository : Repository<WalletTypeOrmEntity>
    ){}

    async save(wallet : Wallet) : Promise<void >{


       const dbWallet = this.repository.create({
      id: wallet.id,
      userId: wallet.userId,
      balanceCents: wallet.balance.amount, 
    });

        

        await this.repository.save(dbWallet);
        
     }


    async findById(id: string): Promise<Wallet | null> {
        
        const dbWallet = await this.repository.findOne({ where: { id } });

        if(!dbWallet){

            return null;
        }

       return new Wallet(
      dbWallet.id,
      dbWallet.userId,
      new Money(dbWallet.balanceCents) 
    );

    
    }

}