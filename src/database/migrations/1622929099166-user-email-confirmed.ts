import {MigrationInterface, QueryRunner} from "typeorm";

export class userEmailConfirmed1622929099166 implements MigrationInterface {
    name = 'userEmailConfirmed1622929099166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email_confirmed" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email_confirmed"`);
    }

}
