CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_members" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"group_id" varchar(24) NOT NULL,
	"user_id" varchar(24) NOT NULL,
	"created_at" timestamp (6) with time zone NOT NULL,
	CONSTRAINT "group_members_group_id_user_id_unique" UNIQUE("group_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_transaction_participants" (
	"group_transaction_id" varchar(24) NOT NULL,
	"member_id" varchar(24) NOT NULL,
	"amount" integer NOT NULL,
	"payer_member_id" varchar(24) NOT NULL,
	CONSTRAINT "group_transaction_participants_group_transaction_id_member_id_unique" UNIQUE("group_transaction_id","member_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_transactions" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"amount" integer NOT NULL,
	"group_id" varchar(24) NOT NULL,
	"payer_member_id" varchar(24) NOT NULL,
	"created_by" varchar(24) NOT NULL,
	"created_at" timestamp (6) with time zone NOT NULL,
	"updated_by" varchar(24),
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groups" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"created_by" varchar(24) NOT NULL,
	"created_at" timestamp (6) with time zone NOT NULL,
	"updated_by" varchar(24),
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_members" ADD CONSTRAINT "group_members_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_members" ADD CONSTRAINT "group_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_transaction_participants" ADD CONSTRAINT "group_transaction_participants_group_transaction_id_group_transactions_id_fk" FOREIGN KEY ("group_transaction_id") REFERENCES "public"."group_transactions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_transaction_participants" ADD CONSTRAINT "group_transaction_participants_member_id_group_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."group_members"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_transaction_participants" ADD CONSTRAINT "group_transaction_participants_payer_member_id_group_members_id_fk" FOREIGN KEY ("payer_member_id") REFERENCES "public"."group_members"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_transactions" ADD CONSTRAINT "group_transactions_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_transactions" ADD CONSTRAINT "group_transactions_payer_member_id_group_members_id_fk" FOREIGN KEY ("payer_member_id") REFERENCES "public"."group_members"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "group_transactions_group_id_index" ON "group_transactions" USING btree ("group_id");