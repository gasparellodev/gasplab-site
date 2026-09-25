CREATE TABLE `diagnostics` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`company` text NOT NULL,
	`contact` text NOT NULL,
	`segment` text NOT NULL,
	`interest` text NOT NULL,
	`challenge` text NOT NULL,
	`url` text,
	`consent` integer NOT NULL,
	`utm_source` text,
	`utm_medium` text,
	`utm_campaign` text,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
