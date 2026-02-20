import { W } from "typeorm";
import { Wallet } from "../entities/wallet.entity";

export interface IWalletRepository{

    findById(id : string) : Promise<Wallet | null>;
    save(wallet : Wallet) : Promise<void>

}