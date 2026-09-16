export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogSection {
  heading?: string;
  content: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Sunnah & Nikah" | "Pre-Marital Advice" | "Family & In-Laws" | "Communication & Love" | "Budget & Simplicity";
  readTime: string;
  publishedAt: string;
  author: Author;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
  quote?: {
    arabic?: string;
    translation: string;
    source: string;
  };
  sections: BlogSection[];
  keyTakeaways: string[];
  relatedSlugs: string[];
}

export const BLOG_CATEGORIES = [
  "All Articles",
  "Sunnah & Nikah",
  "Pre-Marital Advice",
  "Family & In-Laws",
  "Communication & Love",
  "Budget & Simplicity",
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "sunnah-nikah-simplicity-blessing",
    title: "The Barakah of Simplicity: Reviving the Prophetic Sunnah of Nikah",
    excerpt:
      "Why modern lavish expectations cause delay in weddings, and how returning to an uncomplicated, dignified Sunnah Nikah invites boundless peace and blessings into a new home.",
    category: "Sunnah & Nikah",
    readTime: "5 min read",
    publishedAt: "Sep 05, 2026",
    featured: true,
    author: {
      name: "Mufti Tariq Rehman",
      role: "Islamic Family Counselor & Scholar",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    tags: ["Nikah", "Sunnah", "Simplicity", "Barakah", "Marriage"],
    quote: {
      arabic: "أَعْظَمُ النِّكَاحِ بَرَكَةً أَيْسَرُهُ مَئُونَةً",
      translation:
        "The marriage that brings the most barakah (blessing) is the one with the least financial burden.",
      source: "Musnad Ahmad (24529)",
    },
    sections: [
      {
        heading: "The Heavy Weight of Contemporary Weddings",
        content: [
          "In today's society, the sacred bond of Nikah has often been overshadowed by commercial extravagance. From mandatory five-course banquets to mounting demands for trousseaus and dowries, families find themselves strained under crippling debt before the couple even begins their shared life.",
          "Yet the Messenger of Allah ﷺ set an entirely different standard—one rooted in sincerity, humility, and ease. Nikah was designed to be easy, dignified, and joyous, preserving chastity and honoring two families without financial oppression.",
        ],
      },
      {
        heading: "What Makes an Authentic Sunnah Nikah?",
        content: [
          "A Sunnah Nikah centers on core pillars: mutual consent of the bride and groom, the consent of the righteous Wali, the offering of reasonable and honored Mahr (dower), two upright witnesses, and a joyful Walima meal commensurate with one's genuine means.",
          "When excess display is replaced with genuine intention (Niyyah), emotional and spiritual harmony flourishes. Couples report feeling deeper tranquility (Sakinah) knowing their union did not burden their aging parents.",
        ],
      },
      {
        heading: "Practical Steps for Families Today",
        content: [
          "1. Prioritize Mahr directly to the bride as her rightful security, rather than pouring fortunes into rented chandeliers.",
          "2. Keep the Nikah ceremony intimate inside the Masjid or family home, gathering close well-wishers who pray wholeheartedly for the couple.",
          "3. Say a resolute 'No' to demands that mimic social prestige contests, setting an inspiring precedent for younger siblings and the community.",
        ],
      },
    ],
    keyTakeaways: [
      "Simplicity in marriage is directly linked to enduring spiritual Barakah.",
      "Mahr belongs solely to the bride—honor her rights with respect.",
      "The Walima should be an expression of gratitude, never a burden of debt.",
    ],
    relatedSlugs: [
      "budget-friendly-islamic-wedding-guide",
      "10-vital-questions-before-nikah",
      "role-of-wali-in-islamic-marriage",
    ],
  },
  {
    id: "post-2",
    slug: "10-vital-questions-before-nikah",
    title: "10 Vital Questions Every Prospective Couple Should Ask Before Nikah",
    excerpt:
      "Beyond favorite colors and hobbies: essential inquiries regarding deen, financial responsibilities, emotional maturity, and family boundaries to ensure lifelong compatibility.",
    category: "Pre-Marital Advice",
    readTime: "7 min read",
    publishedAt: "Sep 02, 2026",
    featured: true,
    author: {
      name: "Ustadha Fatima Zahra",
      role: "Matrimonial Consultant & Educator",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    tags: ["Pre-Marital", "Compatibility", "Questions", "Life Partner"],
    quote: {
      translation:
        "A woman is married for four reasons: her wealth, her lineage, her beauty, and her religious commitment. Choose the one with religious commitment and you will prosper.",
      source: "Sahih al-Bukhari (5090)",
    },
    sections: [
      {
        heading: "Moving Beyond Superficial Conversations",
        content: [
          "Meeting a prospective spouse with their Mahram is a sacred opportunity to discern character, values, and vision. Too often, discussions stay confined to polite small talk, leaving critical life perspectives unexplored until after the wedding day.",
          "Honest, guided dialogue in an honorable setting protects both individuals from unmet expectations and ensures genuine alignment in life's core facets.",
        ],
      },
      {
        heading: "Key Conversation Domains",
        content: [
          "1. Spiritual Routine: How does Islam shape your daily decisions, prayer habits, and moral compass?",
          "2. Financial Architecture: What are your perspectives on household spending, debt, savings, and personal financial autonomy?",
          "3. Conflict Resolution: When angered or disappointed, do you withdraw, react, or communicate with gentle patience?",
          "4. In-Laws & Boundaries: How will living arrangements and elderly family care be navigated with balance, dignity, and respect?",
          "5. Parenting & Children: What values and foundational principles do you intend to instill in the next generation?",
        ],
      },
      {
        heading: "Listening for What Remains Unspoken",
        content: [
          "Pay close attention not only to the answers given, but to the humility, emotional maturity, and respect demonstrated when answering tough questions. A partner who listens without defensiveness is a rare and precious blessing.",
        ],
      },
    ],
    keyTakeaways: [
      "Inquire thoroughly about conflict resolution, finances, and deen.",
      "Clear communication before Nikah eliminates unnecessary post-marriage friction.",
      "Involve trusted family guardians to facilitate dignified conversations.",
    ],
    relatedSlugs: [
      "communication-secrets-happy-marriage",
      "role-of-wali-in-islamic-marriage",
      "dealing-with-in-laws-harmony-respect",
    ],
  },
  {
    id: "post-3",
    slug: "communication-secrets-happy-marriage",
    title: "Communication Secrets for a Happy, Long-Lasting Marriage",
    excerpt:
      "Transform disagreements into deeper connection. Practical, Sunnah-inspired communication strategies that cultivate softness, active listening, and unconditional respect.",
    category: "Communication & Love",
    readTime: "6 min read",
    publishedAt: "Aug 29, 2026",
    featured: false,
    author: {
      name: "Dr. Zaid Al-Mansoor",
      role: "Relationship Psychologist & Author",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Communication", "Love", "Respect", "Marriage Harmony"],
    quote: {
      translation:
        "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.",
      source: "Surah Ar-Rum (30:21)",
    },
    sections: [
      {
        heading: "The Power of Gentle Speech",
        content: [
          "Words hold the power to build unbreakable trust or tear down fragile bonds. The Prophet ﷺ reminded us that a kind word is an act of charity. Within a marriage, affectionate language, sincere appreciation, and gentle inflection create an atmosphere where both spouses feel safe.",
          "When disagreements arise, the goal must never be 'winning' an argument, but understanding your partner's emotional state and finding a solution together.",
        ],
      },
      {
        heading: "Three Proven Islamic Communication Habits",
        content: [
          "1. Never go to sleep bearing unaddressed bitterness. A simple handshake, hug, or heartfelt 'Let us make peace before we sleep' restores harmony.",
          "2. Avoid using absolute words like 'You always...' or 'You never...'. Speak directly to the specific situation with kindness.",
          "3. Validate before responding. Saying 'I hear how stressed you felt today' de-escalates ninety percent of defensive reactions.",
        ],
      },
      {
        heading: "Small Daily Gestures That Matter",
        content: [
          "A handwritten note of gratitude, sending a thoughtful midday message, sharing a cup of tea without smartphones in hand—these micro-moments compound over years into an unshakable reservoir of love.",
        ],
      },
    ],
    keyTakeaways: [
      "Listen to understand, not merely to prepare your rebuttal.",
      "Practice daily expressions of gratitude for the small things your spouse does.",
      "Replace criticism with constructive, affectionate requests.",
    ],
    relatedSlugs: [
      "dealing-with-in-laws-harmony-respect",
      "10-vital-questions-before-nikah",
      "sunnah-nikah-simplicity-blessing",
    ],
  },
  {
    id: "post-4",
    slug: "dealing-with-in-laws-harmony-respect",
    title: "Navigating In-Laws with Dignity, Respect, and Healthy Boundaries",
    excerpt:
      "A compassionate Islamic perspective on balancing filial duty to parents while protecting the sacred independence and emotional well-being of the marital union.",
    category: "Family & In-Laws",
    readTime: "8 min read",
    publishedAt: "Aug 22, 2026",
    featured: false,
    author: {
      name: "Ustadha Fatima Zahra",
      role: "Matrimonial Consultant & Educator",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    tags: ["In-Laws", "Family", "Boundaries", "Respect", "Peace"],
    quote: {
      translation:
        "None of you truly believes until he loves for his brother (or sister) what he loves for himself.",
      source: "Sahih Muslim (45)",
    },
    sections: [
      {
        heading: "Two Families Becoming One",
        content: [
          "In South Asian and Islamic communities, Nikah connects not merely two people, but two lineages. While this yields an enriching network of love and mutual support, it can also become a source of strain when expectations are mismatched.",
          "Islam bestows immense honor upon parents, yet also grants a husband and wife a sovereign space of privacy, emotional sanctity, and personal autonomy.",
        ],
      },
      {
        heading: "The Husband's Crucial Role as a Bridge",
        content: [
          "A husband must serve as an empathetic protector and gentle mediator. He should honor his mother and father wholeheartedly without permitting harshness toward his wife, and support his wife without alienating his parents.",
          "Clear, loving boundaries set with gentleness early in the marriage prevent long-term resentment from festering.",
        ],
      },
      {
        heading: "Golden Rules for Peaceful Extended Family Ties",
        content: [
          "1. Never air private marital disagreements to either set of parents. Keep your bedroom matters strictly confidential.",
          "2. Treat in-laws with the gentle courtesy you would wish your own parents to receive from their in-laws.",
          "3. Remember that transition takes time: give new family members grace as they adapt to evolving household dynamics.",
        ],
      },
    ],
    keyTakeaways: [
      "Marital secrets and private conflicts must remain between the husband and wife.",
      "Honor in-laws with polite respect while maintaining healthy marital privacy.",
      "The husband must act as a fair, gentle bridge of understanding.",
    ],
    relatedSlugs: [
      "communication-secrets-happy-marriage",
      "10-vital-questions-before-nikah",
      "role-of-wali-in-islamic-marriage",
    ],
  },
  {
    id: "post-5",
    slug: "budget-friendly-islamic-wedding-guide",
    title: "A Practical Guide to a Beautiful, Budget-Friendly Wedding",
    excerpt:
      "How to design an elegant, unforgettable wedding day without falling into interest-bearing loans, social pressure, or unnecessary stress. Real cost breakdown and tips.",
    category: "Budget & Simplicity",
    readTime: "6 min read",
    publishedAt: "Aug 15, 2026",
    featured: false,
    author: {
      name: "Sameer & Ayesha Khan",
      role: "Community Organizers & Nikah Advocates",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    tags: ["Budget", "Walima", "Financial Peace", "Islamic Wedding"],
    quote: {
      translation:
        "Eat and drink, but do not be excessive. Indeed, He does not like those who commit excess.",
      source: "Surah Al-A'raf (7:31)",
    },
    sections: [
      {
        heading: "Starting Life on Solid Financial Footing",
        content: [
          "Entering marriage free of credit card balances and wedding loans is one of the greatest gifts a young couple can offer their future. Spending tens of thousands of dollars on a four-hour party often leads to years of financial stress during the vulnerable early months of marriage.",
          "True elegance does not come from diamond-encrusted stage backdrops, but from warm hospitality, sincere smiles, and the serenity of a blessed Sunnah union.",
        ],
      },
      {
        heading: "Practical Budgeting Blueprint",
        content: [
          "1. Intimate Guest List: Focus on close family, true friends, and the needy in your locality who truly relish the meal.",
          "2. Daytime or Masjid Nikah: Hosting the Nikah ceremony after Asr or Dhuhr prayer in the Masjid carries natural serenity, zero rental extortion, and deep communal warmth.",
          "3. Quality Over Quantity Catering: A single, delectable traditional main dish, fresh naan, and a heartfelt dessert is far more appreciated than twenty mediocre buffet chafing dishes.",
          "4. Timeless Attire: Opt for dignified, classic ethnic or modest wedding attire that can be worn again on future Eid occasions rather than single-use extravagant couture.",
        ],
      },
    ],
    keyTakeaways: [
      "A wedding is for one day, but the marriage is for a lifetime.",
      "Eliminate unnecessary ceremonial costs and preserve your savings for a secure home.",
      "The Prophet's ﷺ companions celebrated Walimas with dates, barley, and simple sheep—brimming with joy.",
    ],
    relatedSlugs: [
      "sunnah-nikah-simplicity-blessing",
      "10-vital-questions-before-nikah",
      "communication-secrets-happy-marriage",
    ],
  },
  {
    id: "post-6",
    slug: "role-of-wali-in-islamic-marriage",
    title: "The Role of the Guardian (Wali): Protection, Dignity, and Guidance",
    excerpt:
      "Understanding the wisdom behind the Islamic concept of the Wali: not a barrier to happiness, but a caring fatherly or familial shield against deception and harm.",
    category: "Sunnah & Nikah",
    readTime: "5 min read",
    publishedAt: "Aug 08, 2026",
    featured: false,
    author: {
      name: "Mufti Tariq Rehman",
      role: "Islamic Family Counselor & Scholar",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    tags: ["Wali", "Islamic Law", "Protection", "Family Support"],
    quote: {
      translation:
        "There is no marriage without a guardian (Wali) and two trustworthy witnesses.",
      source: "Sunan Abi Dawud (2085)",
    },
    sections: [
      {
        heading: "The Guardian as an Advocate, Not an Obstacle",
        content: [
          "In modern discourse, the guardian's role is sometimes misunderstood as restrictive. In reality, Islamic jurisprudence established the Wali to elevate the bride's status, ensuring she is never left isolated or vulnerable to sweet-tongued deception.",
          "A righteous Wali performs background due diligence, inquires into the character and honesty of the suitor, and negotiates terms with wisdom and fatherly love.",
        ],
      },
      {
        heading: "Balancing Consent and Guidance",
        content: [
          "Islam strictly prohibits forced marriages. A woman's explicit consent is a mandatory pillar for the validity of the Nikah. The role of the Wali is collaborative—combining parental wisdom with the prospective bride's heartfelt approval.",
          "At Asaan Shaadi, all biodatas are guardian-facilitated to uphold this exact balance of protection, transparency, and personal honor.",
        ],
      },
    ],
    keyTakeaways: [
      "The Wali provides emotional protection, background verification, and legal security.",
      "Forced marriage is strictly forbidden in Islam—consent is non-negotiable.",
      "A healthy Wali-daughter relationship fosters confidence and wise matchmaking.",
    ],
    relatedSlugs: [
      "sunnah-nikah-simplicity-blessing",
      "10-vital-questions-before-nikah",
      "dealing-with-in-laws-harmony-respect",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedBlogPosts(currentSlug: string, count = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, count);

  // First try explicitly configured relatedSlugs
  const explicit = current.relatedSlugs
    .map((s) => BLOG_POSTS.find((p) => p.slug === s))
    .filter((p): p is BlogPost => Boolean(p));

  if (explicit.length >= count) {
    return explicit.slice(0, count);
  }

  // Fallback to same category or other posts
  const others = BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && !explicit.some((e) => e.slug === p.slug)
  );

  return [...explicit, ...others].slice(0, count);
}
