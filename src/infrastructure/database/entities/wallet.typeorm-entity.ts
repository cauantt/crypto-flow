import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('wallets') // Tem que ser exatamente o nome da tabela da Migration
export class WalletTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

 
  @Column({ name: 'balance_cents', type: 'int' })
  balanceCents: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}