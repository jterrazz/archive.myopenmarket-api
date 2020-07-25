import {MigrationInterface, QueryRunner} from "typeorm";

export class user1595666037290 implements MigrationInterface {
    name = 'user1595666037290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "language" character varying NOT NULL DEFAULT 'en-EN'`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
    }

}
