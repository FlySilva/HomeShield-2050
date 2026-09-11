import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

export const { fontFamily: displayFont } = loadSpaceGrotesk("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

export const { fontFamily: monoFont } = loadJetBrainsMono("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

export const C = {
  bg: "#050B14",
  panel: "#0B1526",
  line: "#16233A",
  cyan: "#22D3EE",
  violet: "#8B5CF6",
  amber: "#F59E0B",
  green: "#34D399",
  red: "#F87171",
  text: "#E5EEF7",
  muted: "#7A8BA3",
};
