/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // All fonts below are embedded files (assets/fonts) referenced by exact cut, with
        // no OS-provided fallback and no reliance on iOS's family/weight matching — each
        // class renders the same specific file on iOS and Android.
        futura: ["FuturaLTW01-Light"],
        helvetica: ["HelveticaNeueW01-45Light"],
        hoefler: ["HoeflerText-Italic"],
        quatro: ["Quatro-Book"],
        "quatro-black-italic": ["Quatro-BlackItalic"],
      },
    },
  },
  plugins: [],
};
