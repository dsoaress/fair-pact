ALTER TABLE "group_members" DROP CONSTRAINT "group_members_group_id_groups_id_fk";
--> statement-breakpoint
ALTER TABLE "group_transactions" DROP CONSTRAINT "group_transactions_group_id_groups_id_fk";
--> statement-breakpoint
ALTER TABLE "group_transactions" DROP CONSTRAINT "group_transactions_payer_member_id_group_members_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_members" ADD CONSTRAINT "group_members_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_transactions" ADD CONSTRAINT "group_transactions_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_transactions" ADD CONSTRAINT "group_transactions_payer_member_id_group_members_id_fk" FOREIGN KEY ("payer_member_id") REFERENCES "public"."group_members"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
