ALTER TABLE "group_transactions" ADD COLUMN "date" timestamp (6) with time zone DEFAULT now() NOT NULL;