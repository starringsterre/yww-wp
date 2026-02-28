import { useWPContent } from "./useWPContent";
import { fetchBlogs } from "@/api/wordpress";
import type { WPBlog } from "@/api/wp-types";

const fallbackBlogs: WPBlog[] = [
  {
    id: "motivation-factor",
    title: "De Motivation Factor als Tool voor Richting",
    excerpt:
      "Hoe je met de Motivation Factor helder krijgt wat je energie geeft, waar je op leegloopt en welke keuzes beter bij je passen.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop",
  },
  {
    id: "persoonlijke-groei",
    title: "Persoonlijke Groei in de Praktijk: Voorbeelden",
    excerpt:
      "Concrete voorbeelden van vrouwen die stappen zetten in grenzen aangeven, focus hervinden en met meer rust presteren.",
    image: "/persoonlijke-groei-training.jpg",
  },
  {
    id: "vrouwelijk-leiderschap",
    title: "Vrouwelijk Leiderschap: Zichtbaar en Authentiek",
    excerpt:
      "Wat vrouwelijk leiderschap vandaag vraagt, en hoe je met vertrouwen positie inneemt zonder jezelf kwijt te raken.",
    image: "/vrouwelijk-leiderschap-training.webp",
  },
];

export function useBlogs() {
  return useWPContent({
    queryKey: ["wp", "blogs"],
    queryFn: fetchBlogs,
    fallbackData: fallbackBlogs,
  });
}
