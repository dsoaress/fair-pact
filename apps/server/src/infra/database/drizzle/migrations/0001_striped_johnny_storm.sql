ALTER TABLE "group_members" ADD COLUMN "deleted_by" varchar(24);--> statement-breakpoint
ALTER TABLE "group_members" ADD COLUMN "deleted_at" timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "groups" ADD COLUMN "deleted_by" varchar(24);--> statement-breakpoint
ALTER TABLE "groups" ADD COLUMN "deleted_at" timestamp (6) with time zone;