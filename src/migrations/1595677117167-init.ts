import {MigrationInterface, QueryRunner} from "typeorm";

export class init1595677117167 implements MigrationInterface {
    name = 'init1595677117167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "passwordHashed" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "language" character varying NOT NULL DEFAULT 'en-EN', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
