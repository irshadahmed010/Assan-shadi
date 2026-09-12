export type Gender = "male" | "female";
export type MaritalStatus = "never_married" | "divorced" | "widowed";
export type ProfileStatus = "pending" | "approved" | "rejected" | "archived";
export type InquiryStatus = "pending" | "reviewed" | "contacted" | "closed";
export type LeadStatus = "new" | "contacted" | "follow_up" | "closed";

export interface Profile {
  id: string;
  profile_code: string; // e.g. "AS-2041"
  full_name: string;
  gender: Gender;
  age: number;
  height: string; // e.g. "5 ft 10 in"
  marital_status: MaritalStatus;
  religion: string;
  sect: string;
  caste?: string;
  mother_tongue: string;
  city: string;
  country: string;
  education: string;
  degree_title: string;
  profession: string;
  employer_type?: string; // Private, Government, Business, Self-Employed
  monthly_income?: string;
  family_type: "nuclear" | "joint";
  family_details?: string;
  religious_values: "practicing" | "moderate" | "liberal";
  about: string;
  partner_preferences: string;
  photo_url: string;
  is_photo_private: boolean;
  is_verified: boolean;
  is_featured: boolean;
  status: ProfileStatus;
  contact_name: string;
  contact_relation: string; // Father, Mother, Self, Brother, Guardian
  contact_phone: string;
  contact_email?: string;
  created_at: string;
  updated_at?: string;
}

export interface Inquiry {
  id: string;
  profile_id?: string;
  profile_code: string;
  sender_name: string;
  sender_relation: string;
  sender_phone: string;
  sender_email: string;
  sender_city: string;
  message: string;
  status: InquiryStatus;
  created_at: string;
}

export interface Lead {
  id: string;
  full_name: string;
  gender: "Male" | "Female";
  mobile_number: string;
  email_address: string;
  status: LeadStatus;
  created_at: string;
  seeking_for?: string;
  note?: string;
  source?: string;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: Author;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
  status: "published" | "draft";
  content?: string;
  sections?: { heading?: string; content: string[] }[];
  keyTakeaways?: string[];
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: string;
  categoryLabel: string;
  city: string;
  year: string;
  created_at?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "superadmin" | "moderator";
  created_at?: string;
}

export interface ProfileFilter {
  gender?: Gender | "all";
  ageMin?: number;
  ageMax?: number;
  city?: string;
  education?: string;
  maritalStatus?: MaritalStatus | "all";
  sect?: string;
  status?: ProfileStatus | "all";
  query?: string;
}

export interface DashboardStats {
  totalProfiles: number;
  pendingProfiles: number;
  approvedProfiles: number;
  totalLeads: number;
  newLeads: number;
  totalInquiries: number;
  pendingInquiries: number;
  totalBlogs: number;
  totalGallery: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
