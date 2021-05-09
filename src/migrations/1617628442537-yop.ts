import { MigrationInterface, QueryRunner } from 'typeorm';

export class yop1617628442537 implements MigrationInterface {
  name = 'yop1617628442537';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "activity" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "ip_address" character varying NOT NULL, CONSTRAINT "UQ_f27285af15ef48363745ab2d792" UNIQUE ("type"), CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "password_hashed" character varying NOT NULL DEFAULT '', "language" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shop" ("id" SERIAL NOT NULL, "handle" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "ownerId" integer, CONSTRAINT "UQ_c610b2d2fbea8feab8c5b006c89" UNIQUE ("handle"), CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_followed_shops" ("user_id" integer NOT NULL, "shop_id" integer NOT NULL, CONSTRAINT "PK_d23627464dcb30427571bb53031" PRIMARY KEY ("user_id", "shop_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2916f5bbbf2b269a5e1adac70e" ON "user_followed_shops" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5e53e9a0f8bddd8dff18aa8d49" ON "user_followed_shops" ("shop_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ADD CONSTRAINT "FK_28fb7269a26c4e112e151e46f50" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_followed_shops" ADD CONSTRAINT "FK_2916f5bbbf2b269a5e1adac70e5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_followed_shops" ADD CONSTRAINT "FK_5e53e9a0f8bddd8dff18aa8d492" FOREIGN KEY ("shop_id") REFERENCES "shop"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_followed_shops" DROP CONSTRAINT "FK_5e53e9a0f8bddd8dff18aa8d492"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_followed_shops" DROP CONSTRAINT "FK_2916f5bbbf2b269a5e1adac70e5"`,
    );
    await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_28fb7269a26c4e112e151e46f50"`);
    await queryRunner.query(`DROP INDEX "IDX_5e53e9a0f8bddd8dff18aa8d49"`);
    await queryRunner.query(`DROP INDEX "IDX_2916f5bbbf2b269a5e1adac70e"`);
    await queryRunner.query(`DROP TABLE "user_followed_shops"`);
    await queryRunner.query(`DROP TABLE "shop"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "activity"`);
  }
}
