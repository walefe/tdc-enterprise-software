-- CreateEnum
CREATE TYPE "Content_type_enum" AS ENUM ('MOVIE', 'TV_SHOW');

-- CreateTable
CREATE TABLE "Video" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "url" VARCHAR NOT NULL,
    "sizeInKb" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "movieId" UUID,
    "episodeId" UUID,

    CONSTRAINT "PK_2a23c3da7a2fc570b1696191b87" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "type" "Content_type_enum" NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "PK_7cb78a77f6c66cb6ea6f4316a5c" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "contentId" UUID,
    "thumbnailId" UUID,

    CONSTRAINT "PK_56d58b76292b87125c5ec8bdde0" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thumbnail" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "url" VARCHAR NOT NULL,

    CONSTRAINT "PK_29cfea45a44edc72c599d42037f" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TvShow" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "contentId" UUID,
    "thumbnailId" UUID,

    CONSTRAINT "PK_0ecc486b5a7a0f90f5857634ed9" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episode" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "season" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "tvShowId" UUID,
    "thumbnailId" UUID,

    CONSTRAINT "PK_7258b95d6d2bf7f621845a0e143" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "REL_46efd1060cb7a7c545b06120d1" ON "Video"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_ce049b6bf5d3e5aee0f3dbd8dc0" ON "Video"("episodeId");

-- CreateIndex
CREATE UNIQUE INDEX "REL_c155b5944bdd1e260a4ae79bc8" ON "Movie"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_a20dc7d8915f1caf6079301b10e" ON "Movie"("thumbnailId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_b6ac53aff4b7200e4b01ca43a9c" ON "TvShow"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_e4e17f7e4fbf10e4bcd61aa8e59" ON "TvShow"("thumbnailId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_6c57a6d8be1b8001ee31093ee99" ON "episode"("thumbnailId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "FK_46efd1060cb7a7c545b06120d14" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "FK_ce049b6bf5d3e5aee0f3dbd8dc0" FOREIGN KEY ("episodeId") REFERENCES "episode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "FK_a20dc7d8915f1caf6079301b10e" FOREIGN KEY ("thumbnailId") REFERENCES "Thumbnail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "FK_c155b5944bdd1e260a4ae79bc82" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TvShow" ADD CONSTRAINT "FK_b6ac53aff4b7200e4b01ca43a9c" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TvShow" ADD CONSTRAINT "FK_e4e17f7e4fbf10e4bcd61aa8e59" FOREIGN KEY ("thumbnailId") REFERENCES "Thumbnail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "episode" ADD CONSTRAINT "FK_6c57a6d8be1b8001ee31093ee99" FOREIGN KEY ("thumbnailId") REFERENCES "Thumbnail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "episode" ADD CONSTRAINT "FK_bc417590af57a49dc42ce4ba038" FOREIGN KEY ("tvShowId") REFERENCES "TvShow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
