CREATE TABLE `medias_to_tags` (
	`media_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	PRIMARY KEY(`media_id`, `tag_id`),
	FOREIGN KEY (`media_id`) REFERENCES `medias`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `medias` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`url` text,
	`path` text,
	`type` text NOT NULL,
	`rate` integer,
	`source_id` integer
);
--> statement-breakpoint
CREATE TABLE `sources` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`url` text
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
