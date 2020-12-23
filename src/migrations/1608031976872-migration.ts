import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1608031976872 implements MigrationInterface {
    name = 'migration1608031976872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_e8f0a5cb5967931a347c31619b6"`);
        await queryRunner.query(`ALTER TABLE "shop" RENAME COLUMN "userId" TO "ownerId"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_28fb7269a26c4e112e151e46f50" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_28fb7269a26c4e112e151e46f50"`);
        await queryRunner.query(`ALTER TABLE "shop" RENAME COLUMN "ownerId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_e8f0a5cb5967931a347c31619b6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
