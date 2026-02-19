-- Create table: users
CREATE TABLE IF NOT EXISTS users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    email text UNIQUE NOT NULL,
    name text,
    password text NOT NULL,
    role text DEFAULT 'user' NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users (email);
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Create table: newsletter_subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    email text UNIQUE NOT NULL,
    subscribed_at timestamp with time zone DEFAULT now() NOT NULL,
    status uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    email text UNIQUE NOT NULL,
    subscribed_at timestamp with time zone DEFAULT now() NOT NULL,
    status text DEFAULT 'active' NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers (email);
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;

-- Create table: contact_inquiries
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    status text DEFAULT 'new' NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE contact_inquiries DISABLE ROW LEVEL SECURITY;

-- Create table: pricing_plans
CREATE TABLE IF NOT EXISTS pricing_plans (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    name text NOT NULL,
    price decimal NOT NULL,
    features jsonb,
    tier text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_pricing_plans_tier ON pricing_plans (tier);
ALTER TABLE pricing_plans DISABLE ROW LEVEL SECURITY;

-- Create table: testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    author_name text NOT NULL,
    author_role text,
    company text,
    content text NOT NULL,
    rating integer NOT NULL,
    author_name text NOT NULL,
    author_role text,
    company text,
    content text NOT NULL,
    is_featured boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
