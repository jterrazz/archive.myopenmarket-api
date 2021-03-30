import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1608031741575 implements MigrationInterface {
  name = 'migration1608031741575';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shop" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "shop" ADD CONSTRAINT "FK_e8f0a5cb5967931a347c31619b6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_e8f0a5cb5967931a347c31619b6"`);
    await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "userId"`);
  }
}
