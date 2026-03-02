import { Inject, Injectable } from "@nestjs/common";
import { Wallet } from "src/domain/entities/wallet.entity";
import { IWalletRepository } from "src/domain/repositories/wallet.repository.interface";
import { Money } from "src/domain/value-objects/money.value-object";
import { EntityManager, Repository } from "typeorm";
import { WalletTypeOrmEntity } from "../database/entities/wallet.typeorm-entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class WalletRepository implements IWalletRepository {

    constructor(

        @InjectRepository(WalletTypeOrmEntity)
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

    async saveMultiple(wallets: Wallet[]): Promise<void> {
        
        await this.repository.manager.transaction(async (transactionalEntityManager: EntityManager)=>{

            for(const wallet of wallets){

                const dbWallet = transactionalEntityManager.create(WalletTypeOrmEntity,{
                    id: wallet.id,
                    userId: wallet.userId,
                    balanceCents: wallet.balance.amount,

                });

                await transactionalEntityManager.save(dbWallet);
            }




        });

    }



}