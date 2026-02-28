import { useWPContent } from "./useWPContent";
import { fetchGlobalOptions } from "@/api/wordpress";
import type { WPGlobalOptions } from "@/api/wp-types";

const fallbackOptions: WPGlobalOptions = {
  footer: {
    about_text:
      "Het netwerk waar jonge vrouwen reflectie, rust en ruimte ervaren. Ontdek wat je drijft, verstevig je koers en groei met gelijkgestemde vrouwen.",
    copyright: "",
  },
  contact: {
    email: "info@youngwisewomen.nl",
    phone: "+31 (0)6 55334728",
  },
  social: {
    instagram: "http://instagram.com/youngwisewomen",
    linkedin: "",
  },
  brands: [],
};

export function useGlobalSettings() {
  return useWPContent({
    queryKey: ["wp", "options"],
    queryFn: fetchGlobalOptions,
    fallbackData: fallbackOptions,
  });
}
