import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TransferFundsUseCase } from 'src/application/modules/wallet/transfer-funds.use-case'; 
import { TransferDto } from './dtos/transfer.dto';

@Controller('wallets')
export class WalletController {


    constructor(
        private readonly transferFundsUseCase : TransferFundsUseCase
    ){}

    @Post('transfer')
    async transfer(@Body() dto: TransferDto){

        try {

            await this.transferFundsUseCase.execute(
                dto.amountInCents,
                dto.fromWalletId,
                dto.toWalletId
                
            )

        return { message: 'Transferência realizada com sucesso!' };
            
        } catch (error : any) {

            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            
        }


    }


}