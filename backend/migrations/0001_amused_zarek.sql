CREATE TABLE IF NOT EXISTS "Game" (
	"Score" numeric NOT NULL,
	"Username" varchar(256) NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "Game" ADD CONSTRAINT "Game_Username_User_Username_fk" FOREIGN KEY ("Username") REFERENCES "User"("Username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
