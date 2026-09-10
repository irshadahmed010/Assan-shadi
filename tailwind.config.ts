import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          // Burgundy
          primary: "var(--brand-primary)",
          "primary-hover": "var(--brand-primary-hover)",
          "primary-light": "var(--brand-primary-light)",
          burgundy: "#721F32",
          "burgundy-hover": "#5D1728",
          "burgundy-light": "#F5E8EB",

          // Champagne Gold
          gold: "var(--brand-gold)",
          "gold-hover": "var(--brand-gold-hover)",
          "gold-light": "var(--brand-gold-light)",

          // Dark
          dark: "var(--brand-dark)",

          // Backgrounds
          ivory: "var(--brand-ivory)",
          card: "var(--brand-card)",

          // UI
          border: "var(--brand-border)",

          // Text
          text: "var(--brand-text)",
          muted: "var(--brand-muted)",
        },

        burgundy: {
          50: "#FAF3F4",
          100: "#F5E8EB",
          200: "#E8C8CE",
          300: "#DA9DA8",
          400: "#B8556B",
          500: "#94364B",
          600: "#80273B",
          700: "#721F32",
          800: "#5D1728",
          900: "#49101E",
          950: "#2E0A13",
          DEFAULT: "#721F32",
        },

        gold: {
          50: "#FBF8F2",
          100: "#F3EAD9",
          200: "#E5D2B0",
          300: "#D6B987",
          400: "#C7A66C",
          500: "#B9965B",
          600: "#9D7B47",
          700: "#816235",
          800: "#654C28",
          900: "#4D381C",
          950: "#2B1E0D",
          DEFAULT: "#B9965B",
        },
      },

      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Arial", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        "serif-luxury": [
          "var(--font-playfair)",
          "Georgia",
          "serif",
        ],
        "sans-modern": [
          "var(--font-plus-jakarta)",
          "Arial",
          "sans-serif",
        ],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        jakarta: ["var(--font-plus-jakarta)", "Arial", "sans-serif"],
      },

      boxShadow: {
        luxury: "0 20px 60px rgba(114, 31, 50, 0.10)",
        soft: "0 10px 40px rgba(23, 22, 21, 0.08)",
        gold: "0 10px 30px rgba(185, 150, 91, 0.18)",
      },

      borderRadius: {
        luxury: "1.25rem",
      },
    },
  },

  plugins: [],
};

export default config;