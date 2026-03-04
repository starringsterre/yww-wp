import { useWPContent } from "./useWPContent";
import { fetchNavMenu } from "@/api/wordpress";
import type { WPNavMenu } from "@/api/wordpress";

const fallbackNav: WPNavMenu = {
  nav: [
    {
      href: "/in-company",
      label: "Bedrijfstrajecten",
      children: [
        { href: "/in-company/jaarprogrammas", label: "Jaarprogramma's" },
        { href: "/in-company/workshops-op-maat", label: "Workshops op maat" },
      ],
    },
    {
      href: "/retreats",
      label: "Persoonlijke ontwikkeling retreats",
      children: [
        { href: "/retreats/persoonlijke-ontwikkeling-weekend-training", label: "Weekend trainingen" },
        { href: "/retreats/persoonlijke-ontwikkeling-dag-workshops", label: "Dag workshops" },
      ],
    },
    {
      href: "/inspiratie",
      label: "Inspiratie",
      children: [
        { href: "/inspiratie/evenementen", label: "Evenementen" },
        { href: "/inspiratie/tools-en-handvatten", label: "Tools & Handvatten" },
        { href: "/inspiratie/podcasts", label: "Podcasts" },
      ],
    },
    {
      href: "/ons-verhaal",
      label: "Ons Verhaal",
      children: [
        { href: "/ons-verhaal/over-ella", label: "Over Ella" },
      ],
    },
  ],
  footer: [
    { href: "/", label: "Home" },
    { href: "/retreats", label: "Persoonlijke ontwikkeling retreats" },
    { href: "/in-company", label: "Bedrijfstrajecten" },
    { href: "/inspiratie", label: "Inspiratie" },
    { href: "/ons-verhaal", label: "Ons Verhaal" },
    { href: "/lid-worden", label: "Netwerk" },
  ],
};

export function useNavMenu() {
  return useWPContent({
    queryKey: ["wp", "nav"],
    queryFn: fetchNavMenu,
    fallbackData: fallbackNav,
  });
}
