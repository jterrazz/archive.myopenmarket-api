import {MigrationInterface, QueryRunner} from "typeorm";

export class user1607218559590 implements MigrationInterface {
    name = 'user1607218559590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "handle" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."handle" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."handle" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "handle" SET NOT NULL`);
    }

}
