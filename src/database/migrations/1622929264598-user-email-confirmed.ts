import {MigrationInterface, QueryRunner} from "typeorm";

export class userEmailConfirmed1622929264598 implements MigrationInterface {
    name = 'userEmailConfirmed1622929264598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email_confirmed" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email_confirmed" DROP DEFAULT`);
    }

}
