import { createClient } from "@supabase/supabase-js";
import {
  Profile,
  Inquiry,
  ProfileFilter,
  Lead,
  BlogPost,
  GalleryItem,
  DashboardStats,
} from "@/types/database";
import { MOCK_PROFILES, MOCK_INQUIRIES } from "@/data/mockProfiles";
import { BLOG_POSTS } from "@/data/blogData";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    !supabaseUrl.includes("your_supabase_project_url") &&
    supabaseAnonKey &&
    !supabaseAnonKey.includes("your_supabase_anon_key")
);

// Client-side / Anon Supabase Client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Server-side Admin / Service Role Supabase Client (bypasses RLS for full admin operations)
export const supabaseAdmin =
  isSupabaseConfigured && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false },
      })
    : supabase;

// In-Memory Datasets (Clean & Empty by default for real database operation)
let localProfiles: Profile[] = [];
let localInquiries: Inquiry[] = [];
let localLeads: Lead[] = [];


let localBlogs: BlogPost[] = BLOG_POSTS.map((post) => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  category: post.category,
  readTime: post.readTime,
  publishedAt: post.publishedAt,
  author: post.author,
  imageUrl: post.imageUrl,
  tags: post.tags,
  featured: post.featured,
  status: "published" as const,
  sections: post.sections,
  keyTakeaways: post.keyTakeaways,
  created_at: new Date().toISOString(),
}));

let localGallery: GalleryItem[] = [
  {
    id: "royal-nikah",
    src: "/images/muslim-wedding-couple.jpg",
    title: "Zubair & Maryam",
    caption: "A timeless celebration of faith, pure intentions, and sacred vows.",
    category: "nikah",
    categoryLabel: "Nikah Ceremony",
    city: "Bengaluru",
    year: "2025",
    created_at: new Date().toISOString(),
  },
  {
    id: "ayaan-saba",
    src: "/images/couple-ayaan-saba.jpg",
    title: "Ayaan & Saba",
    caption: "Golden hour sunset vows and lifelong commitment.",
    category: "rings",
    categoryLabel: "Rings & Promises",
    city: "Hyderabad",
    year: "2025",
    created_at: new Date().toISOString(),
  },
  {
    id: "hero-wedding",
    src: "/images/hero-wedding-couple.webp",
    title: "Farhan & Zainab",
    caption: "United in love, dignity, and sunnah values.",
    category: "walima",
    categoryLabel: "Walima & Reception",
    city: "Mumbai",
    year: "2024",
    created_at: new Date().toISOString(),
  },
  {
    id: "rings-henna",
    src: "/images/gallery-mehndi-hands.jpg",
    title: "Sacred Rings & Promises",
    caption: "The beautiful pledge of togetherness and family blessings.",
    category: "rings",
    categoryLabel: "Rings & Promises",
    city: "Delhi",
    year: "2025",
    created_at: new Date().toISOString(),
  },
  {
    id: "hamza-areeba",
    src: "/images/couple-hamza-areeba.jpg",
    title: "Hamza & Areeba",
    caption: "Quiet companionship and mutual respect.",
    category: "walima",
    categoryLabel: "Walima & Reception",
    city: "Bengaluru",
    year: "2024",
    created_at: new Date().toISOString(),
  },
  {
    id: "zaid-hira",
    src: "/images/couple-zaid-hira.jpg",
    title: "Zaid & Hira",
    caption: "Serene vows and embarking on life's journey.",
    category: "rings",
    categoryLabel: "Rings & Promises",
    city: "Dubai",
    year: "2025",
    created_at: new Date().toISOString(),
  },
  {
    id: "twilight-horizons",
    src: "/images/gallery-couple-sunset.jpg",
    title: "Twilight Horizons",
    caption: "Looking forward together towards a blessed future.",
    category: "walima",
    categoryLabel: "Walima & Reception",
    city: "Lucknow",
    year: "2024",
    created_at: new Date().toISOString(),
  },
  {
    id: "mosque-arch-sunset",
    src: "/images/mosque-arch-sunset.jpg",
    title: "Sanctuary of Peace",
    caption: "Spiritual grounding before the Nikah congregation.",
    category: "nikah",
    categoryLabel: "Nikah Ceremony",
    city: "Agra",
    year: "2025",
    created_at: new Date().toISOString(),
  },
  {
    id: "guidance-consultation",
    src: "/images/expert-guidance-consultation.jpg",
    title: "Relationship Supervisor Guidance",
    caption: "Families connecting with respect and transparency.",
    category: "nikah",
    categoryLabel: "Nikah Ceremony",
    city: "Bengaluru",
    year: "2025",
    created_at: new Date().toISOString(),
  },
  {
    id: "mosque-lantern-sunset",
    src: "/images/mosque-lantern-sunset.jpg",
    title: "Light & Serenity",
    caption: "The radiant illumination of faith and marriage.",
    category: "rings",
    categoryLabel: "Rings & Promises",
    city: "Sharjah",
    year: "2025",
    created_at: new Date().toISOString(),
  },
];

export const dbService = {
  /* =========================================================================
     PROFILES / BIODATAS
     ========================================================================= */
  async getProfiles(filter?: ProfileFilter): Promise<Profile[]> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        let query = client.from("profiles").select("*");

        if (filter?.gender && filter.gender !== "all") {
          query = query.eq("gender", filter.gender);
        }
        if (filter?.status && filter.status !== "all") {
          query = query.eq("status", filter.status);
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
        if (!error && Array.isArray(data)) {
          return data as Profile[];
        }
      } catch (e) {
        console.warn("Supabase query failed, falling back to local dataset:", e);
      }
    }

    // Local in-memory filter
    let results = [...localProfiles];
    if (filter?.gender && filter.gender !== "all") {
      results = results.filter((p) => p.gender === filter.gender);
    }
    if (filter?.status && filter.status !== "all") {
      results = results.filter((p) => p.status === filter.status);
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
          p.city.toLowerCase().includes(q) ||
          p.profile_code.toLowerCase().includes(q)
      );
    }

    return results;
  },

  async getProfileById(idOrCode: string): Promise<Profile | null> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const isUuid = idOrCode.includes("-") && idOrCode.length === 36;
        const column = isUuid ? "id" : idOrCode.startsWith("AS-") ? "profile_code" : "id";

        const { data, error } = await client
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
      localProfiles.find(
        (p) =>
          p.id === idOrCode ||
          p.profile_code.toLowerCase() === idOrCode.toLowerCase()
      ) || null
    );
  },

  async createProfile(
    profileData: Omit<Profile, "id" | "profile_code" | "created_at">
  ): Promise<Profile> {
    const newCode = `AS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newId = `p-${Date.now()}`;

    const newProfile: Profile = {
      ...profileData,
      id: newId,
      profile_code: newCode,
      created_at: new Date().toISOString(),
    };

    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { data, error } = await client
          .from("profiles")
          .insert([newProfile])
          .select()
          .single();
        if (!error && data) return data as Profile;
      } catch (e) {
        console.warn("Supabase createProfile fallback:", e);
      }
    }

    localProfiles = [newProfile, ...localProfiles];
    return newProfile;
  },

  async updateProfile(id: string, updates: Partial<Profile>): Promise<Profile | null> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { data, error } = await client
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

    localProfiles[index] = {
      ...localProfiles[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    return localProfiles[index];
  },

  async deleteProfile(id: string): Promise<boolean> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { error } = await client.from("profiles").delete().eq("id", id);
        if (!error) return true;
      } catch (e) {
        console.warn("Supabase deleteProfile fallback:", e);
      }
    }

    const prevLen = localProfiles.length;
    localProfiles = localProfiles.filter((p) => p.id !== id);
    return localProfiles.length < prevLen;
  },

  /* =========================================================================
     INQUIRIES / PROPOSAL MESSAGES
     ========================================================================= */
  async getInquiries(): Promise<Inquiry[]> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { data, error } = await client
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

  async createInquiry(
    inquiryData: Omit<Inquiry, "id" | "created_at" | "status">
  ): Promise<Inquiry> {
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { data, error } = await client
          .from("inquiries")
          .insert([newInquiry])
          .select()
          .single();
        if (!error && data) return data as Inquiry;
      } catch (e) {
        console.warn("Supabase createInquiry fallback:", e);
      }
    }

    localInquiries = [newInquiry, ...localInquiries];
    return newInquiry;
  },

  async updateInquiryStatus(
    id: string,
    status: Inquiry["status"]
  ): Promise<boolean> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { error } = await client
          .from("inquiries")
          .update({ status })
          .eq("id", id);
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

  async deleteInquiry(id: string): Promise<boolean> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { error } = await client.from("inquiries").delete().eq("id", id);
        if (!error) return true;
      } catch (e) {
        console.warn("Supabase deleteInquiry fallback:", e);
      }
    }

    const prevLen = localInquiries.length;
    localInquiries = localInquiries.filter((i) => i.id !== id);
    return localInquiries.length < prevLen;
  },

  /* =========================================================================
     LEADS (Contact Page & Public Inquiries)
     ========================================================================= */
  async getLeads(): Promise<Lead[]> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { data, error } = await client
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) return data as Lead[];

        // Try quick_profiles table as fallback if leads is empty
        const qp = await client
          .from("quick_profiles")
          .select("*")
          .order("created_at", { ascending: false });
        if (!qp.error && qp.data && qp.data.length > 0) {
          return qp.data.map((item: any) => ({
            ...item,
            source: item.source || "Quick Profile Submission",
          })) as Lead[];
        }
      } catch (e) {
        // Table might not exist yet in Supabase, using local fallback
      }
    }

    return localLeads;
  },

  async createLead(leadData: Omit<Lead, "id" | "created_at" | "status">): Promise<Lead> {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: "new",
      created_at: new Date().toISOString(),
    };

    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        // 1. Try insert into leads
        const { data, error } = await client
          .from("leads")
          .insert([newLead])
          .select()
          .single();

        // 2. Also mirror into quick_profiles table if it exists
        try {
          await client.from("quick_profiles").insert([{
            id: newLead.id,
            full_name: newLead.full_name,
            gender: newLead.gender,
            mobile_number: newLead.mobile_number,
            email_address: newLead.email_address,
            seeking_for: newLead.seeking_for,
            note: newLead.note,
            status: newLead.status,
            created_at: newLead.created_at,
          }]);
        } catch {}

        if (!error && data) return data as Lead;

        // 3. Fallback: if leads table didn't work, insert into quick_profiles directly
        const qpRes = await client
          .from("quick_profiles")
          .insert([{
            id: newLead.id,
            full_name: newLead.full_name,
            gender: newLead.gender,
            mobile_number: newLead.mobile_number,
            email_address: newLead.email_address,
            seeking_for: newLead.seeking_for,
            note: newLead.note,
            status: newLead.status,
            created_at: newLead.created_at,
          }])
          .select()
          .single();

        if (!qpRes.error && qpRes.data) {
          return { ...newLead, ...qpRes.data, source: "Quick Profile Submission" };
        }
      } catch (e) {
        console.warn("Supabase createLead fallback:", e);
      }
    }

    localLeads = [newLead, ...localLeads];
    return newLead;
  },

  async updateLeadStatus(id: string, status: Lead["status"]): Promise<boolean> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { error } = await client.from("leads").update({ status }).eq("id", id);
        if (!error) return true;
      } catch (e) {
        console.warn("Supabase updateLeadStatus fallback:", e);
      }
    }

    const index = localLeads.findIndex((l) => l.id === id);
    if (index !== -1) {
      localLeads[index].status = status;
      return true;
    }
    return false;
  },

  async deleteLead(id: string): Promise<boolean> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { error } = await client.from("leads").delete().eq("id", id);
        if (!error) return true;
      } catch (e) {
        console.warn("Supabase deleteLead fallback:", e);
      }
    }

    const prevLen = localLeads.length;
    localLeads = localLeads.filter((l) => l.id !== id);
    return localLeads.length < prevLen;
  },

  /* =========================================================================
     BLOGS MANAGEMENT
     ========================================================================= */
  async getBlogs(): Promise<BlogPost[]> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { data, error } = await client
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) return data as BlogPost[];
      } catch (e) {
        // Fallback
      }
    }

    return localBlogs;
  },

  async getBlogById(idOrSlug: string): Promise<BlogPost | null> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { data, error } = await client
          .from("blogs")
          .select("*")
          .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
          .single();
        if (!error && data) return data as BlogPost;
      } catch (e) {
        // Fallback
      }
    }

    return localBlogs.find((b) => b.id === idOrSlug || b.slug === idOrSlug) || null;
  },

  async createBlog(blogData: Omit<BlogPost, "id" | "created_at">): Promise<BlogPost> {
    const newBlog: BlogPost = {
      ...blogData,
      id: `blog-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { data, error } = await client
          .from("blogs")
          .insert([newBlog])
          .select()
          .single();
        if (!error && data) return data as BlogPost;
      } catch (e) {
        console.warn("Supabase createBlog fallback:", e);
      }
    }

    localBlogs = [newBlog, ...localBlogs];
    return newBlog;
  },

  async updateBlog(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { data, error } = await client
          .from("blogs")
          .update(updates)
          .eq("id", id)
          .select()
          .single();
        if (!error && data) return data as BlogPost;
      } catch (e) {
        console.warn("Supabase updateBlog fallback:", e);
      }
    }

    const idx = localBlogs.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    localBlogs[idx] = { ...localBlogs[idx], ...updates };
    return localBlogs[idx];
  },

  async deleteBlog(id: string): Promise<boolean> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { error } = await client.from("blogs").delete().eq("id", id);
        if (!error) return true;
      } catch (e) {
        console.warn("Supabase deleteBlog fallback:", e);
      }
    }

    const prevLen = localBlogs.length;
    localBlogs = localBlogs.filter((b) => b.id !== id);
    return localBlogs.length < prevLen;
  },

  /* =========================================================================
     GALLERY / MEDIA MANAGEMENT
     ========================================================================= */
  async getGalleryItems(): Promise<GalleryItem[]> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { data, error } = await client
          .from("gallery")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && Array.isArray(data) && data.length > 0) {
          return data.map((item: any) => ({
            ...item,
            categoryLabel: item.category_label || item.categoryLabel || item.category,
          })) as GalleryItem[];
        }
      } catch (e) {
        // Fallback
      }
    }

    return localGallery;
  },

  async createGalleryItem(
    itemData: Omit<GalleryItem, "id" | "created_at">
  ): Promise<GalleryItem> {
    const newItem: GalleryItem = {
      ...itemData,
      id: `media-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const payload: any = {
          ...newItem,
          category_label: itemData.categoryLabel || (itemData as any).category_label,
        };
        const { data, error } = await client
          .from("gallery")
          .insert([payload])
          .select()
          .single();
        if (!error && data) return { ...data, categoryLabel: data.category_label || data.categoryLabel || data.category } as GalleryItem;
      } catch (e) {
        console.warn("Supabase createGalleryItem fallback:", e);
      }
    }

    localGallery = [newItem, ...localGallery];
    return newItem;
  },

  async deleteGalleryItem(id: string): Promise<boolean> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { error } = await client.from("gallery").delete().eq("id", id);
        if (!error) return true;
      } catch (e) {
        console.warn("Supabase deleteGalleryItem fallback:", e);
      }
    }

    const prevLen = localGallery.length;
    localGallery = localGallery.filter((g) => g.id !== id);
    return localGallery.length < prevLen;
  },

  async updateGalleryItem(
    id: string,
    updates: Partial<GalleryItem>
  ): Promise<GalleryItem | null> {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const payload: any = {
          ...updates,
          ...(updates.categoryLabel ? { category_label: updates.categoryLabel } : {}),
        };
        const { data, error } = await client
          .from("gallery")
          .update(payload)
          .eq("id", id)
          .select()
          .single();
        if (!error && data) return { ...data, categoryLabel: data.category_label || data.categoryLabel || data.category } as GalleryItem;
      } catch (e) {
        console.warn("Supabase updateGalleryItem fallback:", e);
      }
    }

    const index = localGallery.findIndex((g) => g.id === id);
    if (index !== -1) {
      localGallery[index] = { ...localGallery[index], ...updates };
      return localGallery[index];
    }
    return null;
  },

  /* =========================================================================
     DASHBOARD STATS AGGREGATION
     ========================================================================= */
  async getDashboardStats(): Promise<DashboardStats> {
    const [profiles, inquiries, leads, blogs, gallery] = await Promise.all([
      this.getProfiles(),
      this.getInquiries(),
      this.getLeads(),
      this.getBlogs(),
      this.getGalleryItems(),
    ]);

    return {
      totalProfiles: profiles.length,
      pendingProfiles: profiles.filter((p) => p.status === "pending").length,
      approvedProfiles: profiles.filter((p) => p.status === "approved").length,
      totalLeads: leads.length,
      newLeads: leads.filter((l) => l.status === "new").length,
      totalInquiries: inquiries.length,
      pendingInquiries: inquiries.filter((i) => i.status === "pending").length,
      totalBlogs: blogs.filter((b) => b.status === "published").length,
      totalGallery: gallery.length,
    };
  },
};
