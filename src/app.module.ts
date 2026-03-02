import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from './wallet.module';  // <-- 1. Importe o módulo aqui

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false, 
      }),
    }),
    WalletModule, // <-- 2. Adicione ele aqui!
  ],
})
export class AppModule {}