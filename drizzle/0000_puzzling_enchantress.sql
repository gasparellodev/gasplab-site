CREATE TABLE "diagnostics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"company" text NOT NULL,
	"contact" text NOT NULL,
	"segment" text NOT NULL,
	"interest" text NOT NULL,
	"challenge" text NOT NULL,
	"url" text,
	"consent" boolean NOT NULL,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
