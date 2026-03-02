import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletTypeOrmEntity } from './infrastructure/database/entities/wallet.typeorm-entity';
import { WalletController } from './infrastructure/http/wallet.controller';
import { TransferFundsUseCase } from './application/modules/wallet/transfer-funds.use-case'; 
import { WalletRepository } from './infrastructure/repositories/wallet.repository';

@Module({
  // Importamos a entidade do TypeORM para ele criar o repositório base
  imports: [TypeOrmModule.forFeature([WalletTypeOrmEntity])],
  controllers: [WalletController],
  providers: [
    WalletRepository, // Cadastramos o repositório real
    {
      // INJEÇÃO DE DEPENDÊNCIA (Módulo 1):
      // Quando alguém pedir a interface 'IWalletRepository'...
      provide: 'IWalletRepository', 
      // ...entregue a classe concreta 'WalletRepository'
      useExisting: WalletRepository, 
    },
    {
      // Ensinando o NestJS a construir o Caso de Uso passando o repositório
      provide: TransferFundsUseCase,
      useFactory: (walletRepo: WalletRepository) => {
        return new TransferFundsUseCase(walletRepo);
      },
      inject: [WalletRepository], // Pega o repositório real cadastrado acima
    }
  ]
})
export class WalletModule {}