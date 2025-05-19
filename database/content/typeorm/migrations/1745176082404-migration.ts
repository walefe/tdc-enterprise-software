import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1745176082404 implements MigrationInterface {
  name = 'Migration1745176082404';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "thumbnail" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "url" character varying NOT NULL, CONSTRAINT "PK_12afcbe5bdad28526b88dbdaf3f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tv_show" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "contentId" uuid, "thumbnailId" uuid, CONSTRAINT "REL_77da1c4e54a6552c96732495e9" UNIQUE ("contentId"), CONSTRAINT "REL_ed07b7626662930013fd00f18b" UNIQUE ("thumbnailId"), CONSTRAINT "PK_f1c243400f03d802cd41d81cdf5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "episode" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" character varying NOT NULL, "season" integer NOT NULL, "number" integer NOT NULL, "tvShowId" uuid, "thumbnailId" uuid, CONSTRAINT "REL_6c57a6d8be1b8001ee31093ee9" UNIQUE ("thumbnailId"), CONSTRAINT "PK_7258b95d6d2bf7f621845a0e143" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "video" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "url" character varying NOT NULL, "sizeInKb" integer NOT NULL, "duration" integer NOT NULL, "movieId" uuid, "episodeId" uuid, CONSTRAINT "REL_5321e158adb1a2e78dce10e505" UNIQUE ("movieId"), CONSTRAINT "REL_21d2888680a2b444b145077130" UNIQUE ("episodeId"), CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "contentId" uuid, "thumbnailId" uuid, CONSTRAINT "REL_e5b2943de7b994a3fd7ee8d294" UNIQUE ("contentId"), CONSTRAINT "REL_bdc9c977675b7d593b2b1c6a63" UNIQUE ("thumbnailId"), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."content_type_enum" AS ENUM('MOVIE', 'TV_SHOW')`,
    );
    await queryRunner.query(
      `CREATE TABLE "content" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "type" "public"."content_type_enum" NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tv_show" ADD CONSTRAINT "FK_77da1c4e54a6552c96732495e92" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tv_show" ADD CONSTRAINT "FK_ed07b7626662930013fd00f18b2" FOREIGN KEY ("thumbnailId") REFERENCES "thumbnail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" ADD CONSTRAINT "FK_bc417590af57a49dc42ce4ba038" FOREIGN KEY ("tvShowId") REFERENCES "tv_show"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" ADD CONSTRAINT "FK_6c57a6d8be1b8001ee31093ee99" FOREIGN KEY ("thumbnailId") REFERENCES "thumbnail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_5321e158adb1a2e78dce10e5053" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_21d2888680a2b444b145077130f" FOREIGN KEY ("episodeId") REFERENCES "episode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ADD CONSTRAINT "FK_e5b2943de7b994a3fd7ee8d2940" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ADD CONSTRAINT "FK_bdc9c977675b7d593b2b1c6a635" FOREIGN KEY ("thumbnailId") REFERENCES "thumbnail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie" DROP CONSTRAINT "FK_bdc9c977675b7d593b2b1c6a635"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" DROP CONSTRAINT "FK_e5b2943de7b994a3fd7ee8d2940"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" DROP CONSTRAINT "FK_21d2888680a2b444b145077130f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" DROP CONSTRAINT "FK_5321e158adb1a2e78dce10e5053"`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" DROP CONSTRAINT "FK_6c57a6d8be1b8001ee31093ee99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" DROP CONSTRAINT "FK_bc417590af57a49dc42ce4ba038"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tv_show" DROP CONSTRAINT "FK_ed07b7626662930013fd00f18b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tv_show" DROP CONSTRAINT "FK_77da1c4e54a6552c96732495e92"`,
    );
    await queryRunner.query(`DROP TABLE "content"`);
    await queryRunner.query(`DROP TYPE "public"."content_type_enum"`);
    await queryRunner.query(`DROP TABLE "movie"`);
    await queryRunner.query(`DROP TABLE "video"`);
    await queryRunner.query(`DROP TABLE "episode"`);
    await queryRunner.query(`DROP TABLE "tv_show"`);
    await queryRunner.query(`DROP TABLE "thumbnail"`);
  }
}
