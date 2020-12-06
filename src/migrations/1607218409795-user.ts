import {MigrationInterface, QueryRunner} from "typeorm";

export class user1607218409795 implements MigrationInterface {
    name = 'user1607218409795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "language" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."last_name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."last_name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
