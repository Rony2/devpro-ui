/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elevated": "var(--bg-elevated)",
        "bg-surface": "var(--bg-surface)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        "text-faint": "var(--text-faint)",
        border: "var(--border)",
        brand: "var(--brand)",
        "brand-2": "var(--brand-2)",
        danger: "var(--danger)",
        success: "var(--success)",
        "neo-pink": "var(--neo-pink)",
        "neo-blue": "var(--neo-blue)",
        "neo-yellow": "var(--neo-yellow)",
        "neo-green": "var(--neo-green)",
        "neo-purple": "var(--neo-purple)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "neo-sm": "3px 3px 0px 0px var(--border)",
        "neo": "4px 4px 0px 0px var(--border)",
        "neo-lg": "6px 6px 0px 0px var(--border)",
        "neo-brand": "4px 4px 0px 0px var(--brand)",
        "neo-pink": "4px 4px 0px 0px var(--neo-pink)",
        "neo-green": "4px 4px 0px 0px var(--neo-green)",
        "neo-blue": "4px 4px 0px 0px var(--neo-blue)",
        "neo-yellow": "4px 4px 0px 0px var(--neo-yellow)",
      },
      borderRadius: {
        "neo": "0px",
      },
    },
  },
  plugins: [],
};
