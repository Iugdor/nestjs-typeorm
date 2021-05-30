import {MigrationInterface, QueryRunner} from "typeorm";

export class usersToken1622340861079 implements MigrationInterface {
    name = 'usersToken1622340861079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "confirmation_account_token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "confirmation_account_token" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_recovery_token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password_recovery_token" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_recovery_token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password_recovery_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "confirmation_account_token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "confirmation_account_token" character varying(100)`);
    }

}
