ALTER TABLE "group_members" DROP COLUMN IF EXISTS "deleted_by";--> statement-breakpoint
ALTER TABLE "group_members" DROP COLUMN IF EXISTS "deleted_at";--> statement-breakpoint
ALTER TABLE "groups" DROP COLUMN IF EXISTS "deleted_by";--> statement-breakpoint
ALTER TABLE "groups" DROP COLUMN IF EXISTS "deleted_at";