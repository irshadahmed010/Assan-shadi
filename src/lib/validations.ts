import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const inquirySchema = z.object({
  profile_id: z.string().min(1, "Profile ID is required"),
  profile_code: z.string().min(1, "Profile code is required"),
  sender_name: z.string().min(2, "Name must be at least 2 characters"),
  sender_relation: z
    .string()
    .min(
      2,
      "Relationship to candidate is required (e.g., Parent, Self, Sibling)",
    ),
  sender_phone: z
    .string()
    .min(10, "Please provide a valid phone or WhatsApp number"),
  sender_email: z.string().email("Please provide a valid email address"),
  sender_city: z.string().min(2, "City is required"),
  message: z
    .string()
    .min(
      15,
      "Please provide a brief introduction or proposal note (min 15 chars)",
    ),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const profileSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Please select gender" }),
  }),
  age: z.coerce
    .number()
    .min(18, "Age must be 18 or above")
    .max(75, "Age must be 75 or below"),
  height: z.string().min(2, "Height is required (e.g. 5 ft 8 in)"),
  marital_status: z.enum(["never_married", "divorced", "widowed"], {
    errorMap: () => ({ message: "Please select marital status" }),
  }),
  religion: z.string().min(1, "Religion is required"),
  sect: z.string().min(2, "Sect or religious outlook is required"),
  caste: z.string().optional(),
  mother_tongue: z.string().min(2, "Mother tongue is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(1, "Country is required"),
  education: z.string().min(2, "Highest education level is required"),
  degree_title: z.string().min(2, "Degree title is required"),
  profession: z.string().min(2, "Profession / Job title is required"),
  employer_type: z.string().optional(),
  monthly_income: z.string().optional(),
  family_type: z.enum(["nuclear", "joint"], {
    errorMap: () => ({ message: "Please select family structure" }),
  }),
  family_details: z.string().optional(),
  religious_values: z.enum(["practicing", "moderate", "liberal"], {
    errorMap: () => ({ message: "Please select religious practice level" }),
  }),
  about: z
    .string()
    .min(30, "Please provide a descriptive bio (at least 30 characters)"),
  partner_preferences: z
    .string()
    .min(20, "Please describe expectations from a life partner"),
  photo_url: z
    .string()
    .url("Please provide a valid photo URL")
    .or(z.string().min(1)),
  is_photo_private: z.boolean(),
  contact_name: z.string().min(2, "Guardian / Contact person name is required"),
  contact_relation: z
    .string()
    .min(2, "Relation to candidate is required (e.g., Father, Mother, Self)"),
  contact_phone: z.string().min(10, "Valid contact phone number is required"),
  contact_email: z.string().email().optional().or(z.literal("")),
});

export type ProfileInput = z.infer<typeof profileSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email"),
  phone: z.string().min(10, "Please provide a valid phone number"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const profileModerationSchema = z.object({
  status: z.enum(["pending", "approved", "rejected", "archived"]).optional(),
  is_verified: z.boolean().optional(),
  is_featured: z.boolean().optional(),
});

export type ProfileModerationInput = z.infer<typeof profileModerationSchema>;
