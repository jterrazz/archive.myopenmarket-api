import { MigrationInterface, QueryRunner } from 'typeorm';

export class yo1618650498839 implements MigrationInterface {
  name = 'yo1618650498839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "postal_address" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f2575e14038265662f99dfc9a1b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "postal_address"`);
  }
}
