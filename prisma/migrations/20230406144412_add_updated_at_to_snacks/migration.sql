-- AlterTable
ALTER TABLE "snacks" ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "date_time" SET DEFAULT CURRENT_TIMESTAMP;
