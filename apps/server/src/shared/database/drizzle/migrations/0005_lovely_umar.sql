ALTER TABLE "group_members" RENAME COLUMN "user_id" TO "member_id";--> statement-breakpoint
ALTER TABLE "group_transaction_participants" RENAME COLUMN "user_id" TO "member_id";--> statement-breakpoint
ALTER TABLE "group_transaction_participants" RENAME COLUMN "payer_user_id" TO "payer_member_id";--> statement-breakpoint
ALTER TABLE "group_transactions" RENAME COLUMN "payer_user_id" TO "payer_member_id";--> statement-breakpoint
ALTER TABLE "group_members" DROP CONSTRAINT "group_members_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "group_transaction_participants" DROP CONSTRAINT "group_transaction_participants_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "group_transaction_participants" DROP CONSTRAINT "group_transaction_participants_payer_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "group_transactions" DROP CONSTRAINT "group_transactions_payer_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "group_members" DROP CONSTRAINT "group_members_group_id_user_id_pk";--> statement-breakpoint
ALTER TABLE "group_transaction_participants" DROP CONSTRAINT "group_transaction_participants_group_transaction_id_user_id_pk";--> statement-breakpoint
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_group_id_member_id_pk" PRIMARY KEY("group_id","member_id");--> statement-breakpoint
ALTER TABLE "group_transaction_participants" ADD CONSTRAINT "group_transaction_participants_group_transaction_id_member_id_pk" PRIMARY KEY("group_transaction_id","member_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_members" ADD CONSTRAINT "group_members_member_id_users_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_transaction_participants" ADD CONSTRAINT "group_transaction_participants_member_id_users_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_transaction_participants" ADD CONSTRAINT "group_transaction_participants_payer_member_id_users_id_fk" FOREIGN KEY ("payer_member_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_transactions" ADD CONSTRAINT "group_transactions_payer_member_id_users_id_fk" FOREIGN KEY ("payer_member_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
