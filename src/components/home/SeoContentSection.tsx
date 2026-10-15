import React from "react";
import Link from "next/link";

/**
 * SeoContentSection – purely informational block for search engines.
 * Adds substantial keyword-rich body text that uses words from the H1
 * ("A Partnership For Life"), fixes the low text-to-heading ratio, and
 * covers the target keyword groups without cluttering the visual design.
 */
export const SeoContentSection: React.FC = () => {
  return (
    <section
      id="about-asaan-shaadi"
      className="bg-[#1d1b18] text-[#FAF7F2] py-14 sm:py-16 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid: 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left column */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury tracking-tight text-white leading-snug">
              Asaan Shaadi — Bengaluru&apos;s Most Trusted{" "}
              <span className="text-[#FFD78A] italic">
                Muslim Matrimonial Service
              </span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
              Asaan Shaadi is a Bengaluru-based Muslim matrimonial service
              dedicated to creating a sacred partnership for life — one built on
              faith, mutual respect and dignity. Unlike conventional matchmaking
              portals, we operate as a completely offline Muslim matrimonial
              service near you, guided by the Sunnah of our beloved Prophet ﷺ.
              Every profile on our platform is guardian-verified, ensuring your
              family&apos;s trust and privacy at every step.
            </p>

            <p className="text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
              Whether you are looking for trusted Muslim matrimonial services in
              Bengaluru, Delhi, Mumbai, Hyderabad, Lucknow, or connecting from
              Canada, the USA, Australia or Dubai — Asaan Shaadi offers a single
              dignified platform for practicing Muslims who want a simple,
              dowry-free Nikah. Our service covers a wide range of communities
              and is one of the best Muslim matrimonial websites in India.
            </p>

            <p className="text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
              We serve families seeking Muslim matrimony in Bangalore, Muslim
              matrimony in Kerala, Muslim matrimony in Chennai, Muslim matrimony
              in Mumbai, Muslim matrimony in Tamil Nadu and across India. If you
              have been searching for a{" "}
              <strong className="text-[#FFD78A] font-semibold">
                Muslim matrimonial office near me
              </strong>{" "}
              or a reliable online Muslim matrimonial near me, you have found
              the right place — a platform where matrimonial services meet Islamic
              values.
            </p>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury tracking-tight text-white leading-snug">
              A Partnership For Life — The Asaan Shaadi Difference
            </h3>

            <p className="text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
              Our vision is simple: help every Muslim family find their ideal{" "}
              <em>rishta</em> without stress, dowry pressure or privacy concerns.
              Whether you are looking for Muslim matrimony for divorcees, Muslim
              matrimony for doctors, or simply the best matrimony site for
              Muslims in India, our team personally manages your biodata with
              discretion and speed. We also assist NRI families — including those
              asking about Muslim matrimonial in Canada, Muslim matrimonial in
              Australia and Muslim matrimonial in USA.
            </p>

            <p className="text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
              Families often ask us about pre-marriage guidance, Muslim
              pre-marital counselling, and important Muslim pre-marriage
              questions. Our dedicated relationship supervisors are trained to
              guide both families through every step — from the very first biodata
              exchange to the final Nikah. We believe a true Muslim marriage is a
              sacred contract, not a commercial transaction.
            </p>

            <p className="text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
              Asaan Shaadi is also a platform for interfaith guidance — many
              families approach us with questions like:{" "}
              <em>Is it allowed to marry a non-Muslim?</em>{" "}
              <em>Are Muslim marriages legal in the UK?</em>{" "}
              <em>Is a Muslim marriage recognised in Australia?</em> Our team
              provides honest, Quran-and-Sunnah-based answers so families can
              make informed, halal decisions.
            </p>

            <div className="pt-2">
              <Link
                href="/submit-biodata"
                className="inline-flex items-center gap-2 btn-primary-glow text-white font-semibold px-6 py-3 rounded-[6px] text-sm font-sans-modern transition-all duration-300"
              >
                Register Your Biodata Free →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom keyword-rich summary row */}
        <div className="mt-10 pt-10 border-t border-white/10">
          <p className="text-stone-400 text-xs sm:text-sm font-sans-modern leading-relaxed max-w-5xl">
            Asaan Shaadi serves families across India and abroad — including
            trusted Muslim matrimonial services in Bengaluru, Delhi NCR, Mumbai,
            Kolkata, Hyderabad, Chennai, Lucknow, Bihar and all major Indian
            cities. We are the go-to platform for serious Muslim matrimonial ads,
            Muslim marriage services near you, and Muslim matrimonial events. Our
            zero-dowry charter and strict photo privacy make us a preferred choice
            for dignified, sunnah-aligned Muslim marriages for women and men
            across all professions and communities in India and internationally.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SeoContentSection;
