/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // All fonts below are embedded files (assets/fonts) referenced by exact cut, with
        // no OS-provided fallback and no reliance on iOS's family/weight matching — each
        // class renders the same specific file on iOS and Android. `quatro` is the default
        // body cut, applied to every <Text> automatically by src/components/Text.tsx.
        futura: ["FuturaLTW01-Light"],
        helvetica: ["HelveticaNeueW01-45Light"],
        hoefler: ["HoeflerText-Italic"],
        "quatro-extralight": ["Quatro-ExtraLight"],
        "quatro-extralight-italic": ["Quatro-ExtraLightItalic"],
        "quatro-light": ["Quatro-Light"],
        "quatro-light-italic": ["Quatro-LightItalic"],
        quatro: ["Quatro-Book"],
        "quatro-italic": ["Quatro-BookItalic"],
        "quatro-regular": ["Quatro-Regular"],
        "quatro-regular-italic": ["Quatro-RegularItalic"],
        "quatro-medium": ["Quatro-Medium"],
        "quatro-medium-italic": ["Quatro-MediumItalic"],
        "quatro-semibold": ["Quatro-SemiBold"],
        "quatro-semibold-italic": ["Quatro-SemiBoldItalic"],
        "quatro-bold": ["Quatro-Bold"],
        "quatro-bold-italic": ["Quatro-BoldItalic"],
        "quatro-black": ["Quatro-Black"],
        "quatro-black-italic": ["Quatro-BlackItalic"],
        "quatro-ultrablack": ["Quatro-UltraBlack"],
        "quatro-ultrablack-italic": ["Quatro-UltraBlackItalic"],
      },
    },
  },
  plugins: [],
};
