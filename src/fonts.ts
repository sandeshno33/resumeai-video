import { loadFont as loadSora } from "@remotion/google-fonts/Sora";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

// Load all font weights used in the composition
loadSora("normal", { subsets: ["latin"], weights: ["700", "800"] });
loadDMSans("normal", { subsets: ["latin"], weights: ["400", "500", "600", "700"] });
loadJetBrainsMono("normal", { subsets: ["latin"], weights: ["400", "500"] });

