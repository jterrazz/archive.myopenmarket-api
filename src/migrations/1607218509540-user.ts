import {MigrationInterface, QueryRunner} from "typeorm";

export class user1607218509540 implements MigrationInterface {
    name = 'user1607218509540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password_hashed" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."last_name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."language" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "language" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "language" SET DEFAULT ''`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."language" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" SET DEFAULT ''`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."last_name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET DEFAULT ''`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_hashed"`);
    }

}
