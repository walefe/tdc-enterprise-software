import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1747401177609 implements MigrationInterface {
  name = 'Migration1747401177609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie" ADD "externalRating" double precision`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "externalRating"`);
  }
}
