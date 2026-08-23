import { Text as RNText, type TextProps } from "react-native";

// Matches any of our bundled font-family utility classes (see tailwind.config.js).
// Anything else (weight-only classes like font-semibold, or no font class at all)
// falls back to the default body cut below, so no <Text> ever renders in the OS's
// native font (San Francisco / Roboto).
const HAS_CUSTOM_FONT_FAMILY = /(?:^|\s)font-(?:quatro|futura|helvetica|hoefler)\S*/;

export function Text({ className, ...props }: TextProps) {
  const resolvedClassName = HAS_CUSTOM_FONT_FAMILY.test(className ?? "")
    ? className
    : `font-quatro ${className ?? ""}`.trim();

  return <RNText className={resolvedClassName} {...props} />;
}
