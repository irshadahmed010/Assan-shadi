-- ==============================================================================
-- ASAAN SHAADI - DATABASE SCHEMA (SUPABASE POSTGRESQL WITH ROW LEVEL SECURITY)
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id VARCHAR(100) PRIMARY KEY,
    profile_code VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
    age INTEGER NOT NULL CHECK (age >= 18 AND age <= 80),
    height VARCHAR(20) NOT NULL,
    marital_status VARCHAR(20) NOT NULL CHECK (marital_status IN ('never_married', 'divorced', 'widowed')),
    religion VARCHAR(50) DEFAULT 'Islam' NOT NULL,
    sect VARCHAR(60) NOT NULL,
    caste VARCHAR(60),
    mother_tongue VARCHAR(60) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'India' NOT NULL,
    education VARCHAR(100) NOT NULL,
    degree_title VARCHAR(150) NOT NULL,
    profession VARCHAR(150) NOT NULL,
    employer_type VARCHAR(100),
    monthly_income VARCHAR(100),
    family_type VARCHAR(20) NOT NULL CHECK (family_type IN ('nuclear', 'joint')),
    family_details TEXT,
    religious_values VARCHAR(20) NOT NULL CHECK (religious_values IN ('practicing', 'moderate', 'liberal')),
    about TEXT NOT NULL,
    partner_preferences TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    is_photo_private BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'archived')),
    contact_name VARCHAR(150) NOT NULL,
    contact_relation VARCHAR(60) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    contact_email VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. INQUIRIES / PROPOSALS TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id VARCHAR(100) PRIMARY KEY,
    profile_id VARCHAR(100) NOT NULL,
    profile_code VARCHAR(20) NOT NULL,
    sender_name VARCHAR(150) NOT NULL,
    sender_relation VARCHAR(60) NOT NULL,
    sender_phone VARCHAR(50) NOT NULL,
    sender_email VARCHAR(150) NOT NULL,
    sender_city VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contacted', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id VARCHAR(100) PRIMARY KEY DEFAULT ('admin-' || floor(extract(epoch from now()) * 1000)::text),
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name VARCHAR(150) NOT NULL,
    role VARCHAR(30) DEFAULT 'moderator' CHECK (role IN ('superadmin', 'moderator')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);



-- Indexes for lightning fast searches and filtering
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_gender ON public.profiles(gender);
CREATE INDEX IF NOT EXISTS idx_profiles_city ON public.profiles(city);
CREATE INDEX IF NOT EXISTS idx_profiles_age ON public.profiles(age);
CREATE INDEX IF NOT EXISTS idx_profiles_featured ON public.profiles(is_featured);
CREATE INDEX IF NOT EXISTS idx_inquiries_profile_id ON public.inquiries(profile_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);

-- Automatic updated_at timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_profiles_timestamp ON public.profiles;
CREATE TRIGGER set_profiles_timestamp
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can view approved profiles only
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (status = 'approved');

-- Profiles: Anyone can submit a new profile for moderation
CREATE POLICY "Anyone can submit a profile for approval" 
ON public.profiles FOR INSERT 
WITH CHECK (true);

-- Inquiries: Anyone can submit an inquiry for a profile
CREATE POLICY "Anyone can submit an inquiry" 
ON public.inquiries FOR INSERT 
WITH CHECK (true);

-- Admin full access policies (Service role / authorized admin session)
CREATE POLICY "Admins have full access to profiles" 
ON public.profiles FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Admins have full access to inquiries" 
ON public.inquiries FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Admins have full access to admin_users" 
ON public.admin_users FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

-- 4. LEADS TABLE (General & Inquiries)
CREATE TABLE IF NOT EXISTS public.leads (
    id VARCHAR(100) PRIMARY KEY DEFAULT ('lead-' || floor(extract(epoch from now()) * 1000)::text),
    full_name VARCHAR(150) NOT NULL,
    gender VARCHAR(10) NOT NULL DEFAULT 'Male' CHECK (gender IN ('Male', 'Female')),
    mobile_number VARCHAR(50) NOT NULL,
    email_address VARCHAR(150),
    seeking_for VARCHAR(50) DEFAULT 'Myself',
    note TEXT,
    source VARCHAR(50) DEFAULT 'Quick Profile Submission',
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'follow_up', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. QUICK PROFILES TABLE (Dedicated table for Homepage Quick Profile Submission form)
CREATE TABLE IF NOT EXISTS public.quick_profiles (
    id VARCHAR(100) PRIMARY KEY DEFAULT ('qp-' || floor(extract(epoch from now()) * 1000)::text),
    full_name VARCHAR(150) NOT NULL,
    gender VARCHAR(10) NOT NULL DEFAULT 'Male' CHECK (gender IN ('Male', 'Female')),
    mobile_number VARCHAR(50) NOT NULL,
    email_address VARCHAR(150),
    seeking_for VARCHAR(50) DEFAULT 'Myself',
    note TEXT,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'follow_up', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);



-- 5. BLOGS TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(150) UNIQUE NOT NULL,
    title VARCHAR(250) NOT NULL,
    excerpt TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    read_time VARCHAR(30) DEFAULT '5 min read',
    published_at VARCHAR(50),
    author JSONB,
    image_url TEXT,
    tags TEXT[],
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('published', 'draft')),
    content TEXT,
    sections JSONB,
    key_takeaways TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
    id VARCHAR(100) PRIMARY KEY,
    src TEXT NOT NULL,
    title VARCHAR(150) NOT NULL,
    caption TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    category_label VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    year VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quick_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published blogs" ON public.blogs FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public can insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins full access to leads" ON public.leads FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Public can insert quick_profiles" ON public.quick_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins full access to quick_profiles" ON public.quick_profiles FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to blogs" ON public.blogs FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to gallery" ON public.gallery FOR ALL TO service_role USING (true) WITH CHECK (true);

