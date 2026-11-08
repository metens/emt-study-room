CREATE TABLE `attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`payload` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `attempts_owner` ON `attempts` (`owner_id`);--> statement-breakpoint
CREATE TABLE `materials` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`visibility` text NOT NULL,
	`kind` text NOT NULL,
	`payload` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `materials_owner` ON `materials` (`owner_id`);--> statement-breakpoint
CREATE INDEX `materials_visibility` ON `materials` (`visibility`,`status`);--> statement-breakpoint
CREATE TABLE `reports` (
	`id` text PRIMARY KEY NOT NULL,
	`material_id` text NOT NULL,
	`reporter_id` text NOT NULL,
	`reason` text NOT NULL,
	`status` text DEFAULT 'open' NOT NULL,
	`created_at` integer NOT NULL
);
