import { createClient } from "@supabase/supabase-js";
import { Profile, Inquiry, ProfileFilter } from "@/types/database";
import { MOCK_PROFILES, MOCK_INQUIRIES } from "@/data/mockProfiles";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseUrl !== "your_supabase_project_url" && supabaseAnonKey && supabaseAnonKey !== "your_supabase_anon_key"
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// In-memory store for development/preview when remote DB is not linked yet
let localProfiles: Profile[] = [...MOCK_PROFILES];
let localInquiries: Inquiry[] = [...MOCK_INQUIRIES];

export const dbService = {
  async getProfiles(filter?: ProfileFilter): Promise<Profile[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from("profiles").select("*");

        if (filter?.gender && filter.gender !== "all") {
          query = query.eq("gender", filter.gender);
        }
        if (filter?.city && filter.city !== "all") {
          query = query.ilike("city", `%${filter.city}%`);
        }
        if (filter?.ageMin) {
          query = query.gte("age", filter.ageMin);
        }
        if (filter?.ageMax) {
          query = query.lte("age", filter.ageMax);
        }
        if (filter?.maritalStatus && filter.maritalStatus !== "all") {
          query = query.eq("marital_status", filter.maritalStatus);
        }
        if (filter?.sect && filter.sect !== "all") {
          query = query.ilike("sect", `%${filter.sect}%`);
        }

        const { data, error } = await query.order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          return data as Profile[];
        }
      } catch (e) {
        console.warn("Supabase query failed, falling back to local dataset:", e);
      }
    }

    // Fallback filter
    let results = [...localProfiles];
    if (filter?.gender && filter.gender !== "all") {
      results = results.filter((p) => p.gender === filter.gender);
    }
    if (filter?.city && filter.city !== "all") {
      results = results.filter((p) =>
        p.city.toLowerCase().includes((filter.city || "").toLowerCase())
      );
    }
    if (filter?.ageMin) {
      results = results.filter((p) => p.age >= (filter.ageMin || 18));
    }
    if (filter?.ageMax) {
      results = results.filter((p) => p.age <= (filter.ageMax || 80));
    }
    if (filter?.maritalStatus && filter.maritalStatus !== "all") {
      results = results.filter((p) => p.marital_status === filter.maritalStatus);
    }
    if (filter?.sect && filter.sect !== "all") {
      results = results.filter((p) =>
        p.sect.toLowerCase().includes((filter.sect || "").toLowerCase())
      );
    }
    if (filter?.query) {
      const q = filter.query.toLowerCase();
      results = results.filter(
        (p) =>
          p.full_name.toLowerCase().includes(q) ||
          p.profession.toLowerCase().includes(q) ||
          p.education.toLowerCase().includes(q) ||
          p.degree_title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.profile_code.toLowerCase().includes(q)
      );
    }

    return results;
  },

  async getProfileById(idOrCode: string): Promise<Profile | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const isUuid = idOrCode.includes("-") && idOrCode.length === 36;
        const column = isUuid ? "id" : idOrCode.startsWith("AS-") ? "profile_code" : "id";

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq(column, idOrCode)
          .single();

        if (!error && data) return data as Profile;
      } catch (e) {
        console.warn("Supabase getProfileById fallback:", e);
      }
    }

    return (
      localProfiles.find((p) => p.id === idOrCode || p.profile_code.toLowerCase() === idOrCode.toLowerCase()) ||
      null
    );
  },

  async createProfile(profileData: Omit<Profile, "id" | "profile_code" | "created_at">): Promise<Profile> {
    const newCode = `AS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newId = `p-${Date.now()}`;

    const newProfile: Profile = {
      ...profileData,
      id: newId,
      profile_code: newCode,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from("profiles").insert([newProfile]).select().single();
        if (!error && data) return data as Profile;
      } catch (e) {
        console.warn("Supabase createProfile fallback:", e);
      }
    }

    localProfiles = [newProfile, ...localProfiles];
    return newProfile;
  },

  async updateProfile(id: string, updates: Partial<Profile>): Promise<Profile | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .update(updates)
          .eq("id", id)
          .select()
          .single();
        if (!error && data) return data as Profile;
      } catch (e) {
        console.warn("Supabase updateProfile fallback:", e);
      }
    }

    const index = localProfiles.findIndex((p) => p.id === id);
    if (index === -1) return null;

    localProfiles[index] = { ...localProfiles[index], ...updates, updated_at: new Date().toISOString() };
    return localProfiles[index];
  },

  async deleteProfile(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("profiles").delete().eq("id", id);
        if (!error) return true;
      } catch (e) {
        console.warn("Supabase deleteProfile fallback:", e);
      }
    }

    const prevLen = localProfiles.length;
    localProfiles = localProfiles.filter((p) => p.id !== id);
    return localProfiles.length < prevLen;
  },

  async getInquiries(): Promise<Inquiry[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("inquiries")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data) return data as Inquiry[];
      } catch (e) {
        console.warn("Supabase getInquiries fallback:", e);
      }
    }

    return localInquiries;
  },

  async createInquiry(inquiryData: Omit<Inquiry, "id" | "created_at" | "status">): Promise<Inquiry> {
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from("inquiries").insert([newInquiry]).select().single();
        if (!error && data) return data as Inquiry;
      } catch (e) {
        console.warn("Supabase createInquiry fallback:", e);
      }
    }

    localInquiries = [newInquiry, ...localInquiries];
    return newInquiry;
  },

  async updateInquiryStatus(id: string, status: Inquiry["status"]): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
        if (!error) return true;
      } catch (e) {
        console.warn("Supabase updateInquiryStatus fallback:", e);
      }
    }

    const index = localInquiries.findIndex((i) => i.id === id);
    if (index !== -1) {
      localInquiries[index].status = status;
      return true;
    }
    return false;
  },
};
