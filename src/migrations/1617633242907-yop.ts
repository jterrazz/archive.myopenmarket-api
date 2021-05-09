import { MigrationInterface, QueryRunner } from 'typeorm';

export class yop1617633242907 implements MigrationInterface {
  name = 'yop1617633242907';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "activity"."type" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "UQ_f27285af15ef48363745ab2d792"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "UQ_f27285af15ef48363745ab2d792" UNIQUE ("type")`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "activity"."type" IS NULL`);
  }
}
