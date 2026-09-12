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
          50: "#FDFBF7",
          100: "#FAF3E6",
          200: "#F5E6CA",
          300: "#EED3A3",
          400: "#FFD78A",
          500: "#E5C384",
          600: "#C59B48",
          700: "#A67D32",
          800: "#7E5C20",
          900: "#553D14",
          950: "#2E2008",
          DEFAULT: "#E5C384",
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
        mono: ["var(--font-plus-jakarta)", "Arial", "sans-serif"],
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