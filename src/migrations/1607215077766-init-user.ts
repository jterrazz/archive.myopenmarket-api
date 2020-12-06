import {MigrationInterface, QueryRunner} from "typeorm";

export class initUser1607215077766 implements MigrationInterface {
    name = 'initUser1607215077766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "handle" character varying NOT NULL, CONSTRAINT "UQ_53197e5dba5dbaf94d29c8edbd3" UNIQUE ("handle"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
