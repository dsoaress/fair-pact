ALTER TABLE "users" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp (6) with time zone NOT NULL;