"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileInput } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ShieldCheck, CheckCircle2, UserPlus, Sparkles } from "lucide-react";

export const RegisterBiodataForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      religion: "Islam",
      country: "Pakistan",
      family_type: "nuclear",
      religious_values: "practicing",
      is_photo_private: false,
      photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
      contact_relation: "Father",
    },
  });

  const onSubmit = async (data: ProfileInput) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Submission failed");
      }

      setSubmittedCode(json.data?.profile_code || "AS-PENDING");
      reset();
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedCode) {
    return (
      <div className="bg-[#1e1e1e] rounded-3xl p-8 sm:p-12 border border-white/10 text-center space-y-5 shadow-xl max-w-2xl mx-auto font-sans-modern text-[#FAF7F2]">
        <div className="w-16 h-16 bg-[#9a6a4f]/20 text-[#B9965B] rounded-full flex items-center justify-center mx-auto border border-[#9a6a4f]/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold font-serif-luxury text-[#FAF7F2]">
          Biodata Submitted for Verification!
        </h3>
        <p className="text-stone-300 text-sm leading-relaxed max-w-md mx-auto">
          Alhamdulillah! Your reference profile code is{" "}
          <strong className="text-[#B9965B] font-mono text-base px-2 py-1 bg-white/5 rounded-lg border border-[#B9965B]/30">
            {submittedCode}
          </strong>
          . Our moderation team will contact the guardian for phone verification before activating the profile.
        </p>
        <div className="pt-4">
          <Button variant="outline" className="border-white/20 text-[#FAF7F2] hover:bg-white/10" onClick={() => setSubmittedCode(null)}>
            Submit Another Biodata
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl max-w-4xl mx-auto text-left font-sans-modern text-[#FAF7F2]">
      <div className="border-b border-white/10 pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#B9965B] uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-[#B9965B]" />
          <span>Dignified Registration</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#FAF7F2]">
          Register Candidate Matrimonial Biodata
        </h3>
        <p className="text-stone-300 text-sm mt-1.5">
          Please provide accurate information. Guardians will be contacted to verify authentic intent.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-sm text-rose-300 font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <input type="hidden" {...register("religion")} />
        <input type="hidden" {...register("country")} />
        {/* Section 1: Candidate Basic Information */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-[#FAF7F2] uppercase tracking-wider text-xs border-b border-white/10 pb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#9a6a4f] text-white flex items-center justify-center text-[10px]">
              1
            </span>
            Basic Candidate Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Candidate Full Name"
              placeholder="e.g. Hamza Tariq / Ayesha Siddiqui"
              error={errors.full_name?.message}
              {...register("full_name")}
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#FAF7F2]">
                Gender <span className="text-[#B9965B] ml-1">*</span>
              </label>
              <select
                className="w-full rounded-xl border border-white/15 bg-[#252525] px-3.5 py-2.5 text-sm text-[#FAF7F2] focus:border-[#B9965B] focus:outline-none focus:ring-2 focus:ring-[#B9965B]/20"
                {...register("gender")}
              >
                <option value="female">Female (Bride)</option>
                <option value="male">Male (Groom)</option>
              </select>
            </div>

            <Input
              label="Age (Years)"
              type="number"
              placeholder="e.g. 26"
              error={errors.age?.message}
              {...register("age")}
            />

            <Input
              label="Height"
              placeholder="e.g. 5 ft 8 in"
              error={errors.height?.message}
              {...register("height")}
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#FAF7F2]">
                Marital Status <span className="text-[#B9965B] ml-1">*</span>
              </label>
              <select
                className="w-full rounded-xl border border-white/15 bg-[#252525] px-3.5 py-2.5 text-sm text-[#FAF7F2] focus:border-[#B9965B] focus:outline-none focus:ring-2 focus:ring-[#B9965B]/20"
                {...register("marital_status")}
              >
                <option value="never_married">Never Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>

            <Input
              label="Mother Tongue"
              placeholder="e.g. Urdu, Punjabi, Pashto"
              error={errors.mother_tongue?.message}
              {...register("mother_tongue")}
            />
          </div>
        </div>

        {/* Section 2: Location, Religious Outlook & Caste */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-[#FAF7F2] uppercase tracking-wider text-xs border-b border-white/10 pb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#9a6a4f] text-white flex items-center justify-center text-[10px]">
              2
            </span>
            Location, Religious Outlook & Family
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="City"
              placeholder="e.g. Lahore, Karachi, Islamabad, Dubai"
              error={errors.city?.message}
              {...register("city")}
            />

            <Input
              label="Sect / Religious Outlook"
              placeholder="e.g. Sunni / Moderate / Practicing"
              error={errors.sect?.message}
              {...register("sect")}
            />

            <Input
              label="Caste / Community (Optional)"
              placeholder="e.g. Sheikh, Siddiqui, Rajput, Syed"
              {...register("caste")}
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#FAF7F2]">
                Family Structure
              </label>
              <select
                className="w-full rounded-xl border border-white/15 bg-[#252525] px-3.5 py-2.5 text-sm text-[#FAF7F2] focus:border-[#B9965B] focus:outline-none focus:ring-2 focus:ring-[#B9965B]/20"
                {...register("family_type")}
              >
                <option value="nuclear">Nuclear Family</option>
                <option value="joint">Joint Family</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#FAF7F2]">
                Religious Values
              </label>
              <select
                className="w-full rounded-xl border border-white/15 bg-[#252525] px-3.5 py-2.5 text-sm text-[#FAF7F2] focus:border-[#B9965B] focus:outline-none focus:ring-2 focus:ring-[#B9965B]/20"
                {...register("religious_values")}
              >
                <option value="practicing">Practicing (5 Daily Prayers, Modesty)</option>
                <option value="moderate">Moderate Islamic Values</option>
                <option value="liberal">Liberal / Progressive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Education & Career */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-[#FAF7F2] uppercase tracking-wider text-xs border-b border-white/10 pb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#9a6a4f] text-white flex items-center justify-center text-[10px]">
              3
            </span>
            Education & Career
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Education Level"
              placeholder="e.g. Master's Degree, Bachelor's, MBBS"
              error={errors.education?.message}
              {...register("education")}
            />

            <Input
              label="Exact Degree Title"
              placeholder="e.g. MS Computer Science (LUMS)"
              error={errors.degree_title?.message}
              {...register("degree_title")}
            />

            <Input
              label="Profession / Designation"
              placeholder="e.g. Senior Software Engineer"
              error={errors.profession?.message}
              {...register("profession")}
            />

            <Input
              label="Monthly Income Range (Optional)"
              placeholder="e.g. PKR 300,000+ or AED 15,000"
              {...register("monthly_income")}
            />
          </div>
        </div>

        {/* Section 4: Bio & Partner Expectations */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-[#FAF7F2] uppercase tracking-wider text-xs border-b border-white/10 pb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#9a6a4f] text-white flex items-center justify-center text-[10px]">
              4
            </span>
            Bio & Expectations
          </h4>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#FAF7F2]">
                About Candidate & Family Background <span className="text-[#B9965B] ml-1">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Describe personality, values, hobbies, and family status (min 30 characters)..."
                className="w-full rounded-xl border border-white/15 bg-[#252525] px-3.5 py-2.5 text-sm text-[#FAF7F2] placeholder:text-stone-400 focus:border-[#B9965B] focus:outline-none focus:ring-2 focus:ring-[#B9965B]/20"
                {...register("about")}
              />
              {errors.about?.message && (
                <p className="text-xs text-rose-400 font-medium">{errors.about.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#FAF7F2]">
                Partner Preferences & Expectations <span className="text-[#B9965B] ml-1">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Describe age, education, city, or character requirements sought in a life partner..."
                className="w-full rounded-xl border border-white/15 bg-[#252525] px-3.5 py-2.5 text-sm text-[#FAF7F2] placeholder:text-stone-400 focus:border-[#B9965B] focus:outline-none focus:ring-2 focus:ring-[#B9965B]/20"
                {...register("partner_preferences")}
              />
              {errors.partner_preferences?.message && (
                <p className="text-xs text-rose-400 font-medium">
                  {errors.partner_preferences.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 5: Photo & Privacy Setting */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-[#FAF7F2] uppercase tracking-wider text-xs border-b border-white/10 pb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#9a6a4f] text-white flex items-center justify-center text-[10px]">
              5
            </span>
            Photo & Privacy Controls
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Photo URL (Direct image link)"
              placeholder="https://..."
              error={errors.photo_url?.message}
              {...register("photo_url")}
            />

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="is_photo_private"
                className="w-5 h-5 rounded accent-[#B9965B] text-[#B9965B] focus:ring-[#B9965B] border-white/20 bg-[#252525]"
                {...register("is_photo_private")}
              />
              <label htmlFor="is_photo_private" className="text-sm font-medium text-[#FAF7F2]">
                Keep photo private (Requires guardian consent to unblur)
              </label>
            </div>
          </div>
        </div>

        {/* Section 6: Guardian / Wali Contact Information */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-[#FAF7F2] uppercase tracking-wider text-xs border-b border-white/10 pb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#9a6a4f] text-white flex items-center justify-center text-[10px]">
              6
            </span>
            Guardian / Wali Verification Contacts
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Guardian Name"
              placeholder="e.g. Tariq Mehmood"
              error={errors.contact_name?.message}
              {...register("contact_name")}
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#FAF7F2]">
                Guardian Relation
              </label>
              <select
                className="w-full rounded-xl border border-white/15 bg-[#252525] px-3.5 py-2.5 text-sm text-[#FAF7F2] focus:border-[#B9965B] focus:outline-none focus:ring-2 focus:ring-[#B9965B]/20"
                {...register("contact_relation")}
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Self">Self (Candidate)</option>
                <option value="Brother">Brother</option>
                <option value="Guardian">Uncle / Legal Guardian</option>
              </select>
            </div>

            <Input
              label="Guardian Phone (WhatsApp)"
              placeholder="+92 300 1234567"
              error={errors.contact_phone?.message}
              {...register("contact_phone")}
            />
          </div>
        </div>

        {/* Submission Button */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <ShieldCheck className="w-4 h-4 text-[#B9965B] shrink-0" />
            <span>Information is encrypted and reviewed under strict matrimonial ethics.</span>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full sm:w-auto font-semibold bg-[#9a6a4f] hover:bg-[#b17b5d] text-white"
            leftIcon={<UserPlus className="w-4 h-4" />}
          >
            Submit Biodata for Verification
          </Button>
        </div>
      </form>
    </div>
  );
};
