-- ==============================================================================
-- ASSAN SHADI - DATABASE SEED SCRIPT
-- ==============================================================================

-- 1. Default Superadmin User (Password: Admin@123456)
INSERT INTO public.admin_users (id, email, password_hash, name, role)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'admin@assanshadi.com',
    '$2a$10$w8uQZ06dO08oF7tD44cEze7a5G8j7f4U7sK4YF5YmO3I7Vd1L7NKe',
    'Assan Shadi Admin',
    'superadmin'
)
ON CONFLICT (email) DO NOTHING;

-- 2. Seed Approved Matrimonial Profiles
INSERT INTO public.profiles (
    id, profile_code, full_name, gender, age, height, marital_status, religion, sect, caste, 
    mother_tongue, city, country, education, degree_title, profession, employer_type, monthly_income, 
    family_type, family_details, religious_values, about, partner_preferences, photo_url, 
    is_photo_private, is_verified, is_featured, status, contact_name, contact_relation, contact_phone, contact_email
)
VALUES 
(
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'AS-1021', 'Hamza Tariq', 'male', 29, '5 ft 11 in', 
    'never_married', 'Islam', 'Sunni / Moderate', 'Sheikh', 'Urdu', 'Lahore', 'Pakistan', 
    'Master''s Degree', 'MS Computer Science (LUMS)', 'Senior Software Engineer', 'Tech Multinational', 'PKR 550,000+', 
    'nuclear', 'Father retired government director, mother homemaker.', 'practicing', 
    'A grounded, career-oriented individual who balances deen and worldly ambitions. I pray 5 times a day, enjoy weekend hiking, reading history, and believe in mutual respect.', 
    'Seeking an educated, family-oriented partner (24-28 years) who values respect, modesty, and kindness.', 
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800', 
    FALSE, TRUE, TRUE, 'approved', 'Tariq Mahmood (Father)', 'Father', '+92 300 4589211', 'tariq.mahmood@example.com'
),
(
    'b2eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'AS-1022', 'Dr. Ayesha Siddiqui', 'female', 27, '5 ft 5 in', 
    'never_married', 'Islam', 'Sunni / Practicing', 'Siddiqui', 'Urdu', 'Islamabad', 'Pakistan', 
    'Doctorate / Medical', 'MBBS, FCPS Resident', 'Resident Medical Officer', 'Shifa International Hospital', 'PKR 200,000+', 
    'joint', 'Respectable family from Islamabad. Father is a civil servant.', 'practicing', 
    'Compassionate, hardworking doctor passionate about pediatric healthcare. Observes hijab and values Islamic ethics. Enjoys culinary arts and family gatherings.', 
    'Looking for a well-settled, humble professional with strong moral values, good family background, and supportive mindset.', 
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800', 
    TRUE, TRUE, TRUE, 'approved', 'Dr. Farooq Siddiqui (Father)', 'Father', '+92 333 5128743', 'farooq.siddiqui@example.com'
),
(
    'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'AS-1023', 'Bilal Ahmed Khan', 'male', 32, '6 ft 0 in', 
    'never_married', 'Islam', 'Sunni', 'Yousafzai', 'Pashto & Urdu', 'Peshawar', 'Pakistan', 
    'Master''s Degree', 'CFA Chartered Financial Analyst', 'Investment Banker / FinTech Lead', 'Private Banking Firm', 'PKR 650,000+', 
    'nuclear', 'Traditional yet progressive family. Father is a businessman.', 'moderate', 
    'Ambitious and disciplined. I enjoy fitness, financial markets, world travel, and deep conversations. I believe a successful marriage is rooted in trust and humor.', 
    'Looking for an intelligent, warm, and articulate life partner. Must value modern aspirations and family warmth.', 
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800', 
    FALSE, TRUE, TRUE, 'approved', 'Mrs. Nasreen Khan (Mother)', 'Mother', '+92 345 9012384', 'nasreen.khan@example.com'
),
(
    'b4eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'AS-1024', 'Zainab Fatima', 'female', 26, '5 ft 4 in', 
    'never_married', 'Islam', 'Sunni / Moderate', 'Malik', 'Punjabi & Urdu', 'Karachi', 'Pakistan', 
    'Bachelor''s Degree', 'BBA Marketing (IBA Karachi)', 'Brand Strategist & Content Lead', 'FMCG Brand', 'PKR 250,000+', 
    'nuclear', 'Decent family settled in Clifton, Karachi. Father is a retired naval officer.', 'moderate', 
    'Creative, empathetic, and enthusiastic about life. I appreciate art, architecture, and interior design. Looking to build a peaceful, loving home.', 
    'Seeking an educated, mature partner who has a positive outlook on life, respects women''s career aspirations, and possesses a healthy sense of humor.', 
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800', 
    FALSE, TRUE, FALSE, 'approved', 'Capt (R) Tahir Malik (Father)', 'Father', '+92 321 8294611', 'tahir.malik@example.com'
)
ON CONFLICT (profile_code) DO NOTHING;
