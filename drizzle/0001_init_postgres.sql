-- FileFlow PostgreSQL Schema
-- Run with: pnpm db:push

DO $$ BEGIN
  CREATE TYPE "public"."role" AS ENUM('user', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" varchar(320) UNIQUE,
  "password_hash" varchar(255),
  "google_id" varchar(255) UNIQUE,
  "apple_id" varchar(255) UNIQUE,
  "name" text,
  "login_method" varchar(64),
  "role" "role" DEFAULT 'user' NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "last_signed_in" timestamp DEFAULT now() NOT NULL
);
