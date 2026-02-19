import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersAndWallets1771510730712 implements MigrationInterface {

 public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "name" varchar NOT NULL,
                "email" varchar NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_email" UNIQUE ("email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            );
        `);

        
        await queryRunner.query(`
            CREATE TABLE "wallets" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "user_id" uuid NOT NULL,
                "balance_cents" integer NOT NULL DEFAULT 0,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_wallets" PRIMARY KEY ("id"),
                CONSTRAINT "FK_wallets_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`DROP TABLE "wallets";`);
        await queryRunner.query(`DROP TABLE "users";`);
    }

}
