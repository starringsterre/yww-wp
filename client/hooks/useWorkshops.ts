import { useWPContent } from "./useWPContent";
import { fetchWorkshops } from "@/api/wordpress";
import type { WPWorkshop } from "@/api/wp-types";

const fallbackWorkshops: WPWorkshop[] = [
  {
    id: 1,
    title: "Female leadership workshop",
    subtitle: "Leidinggeven vanuit authenticiteit",
    description:
      "Ontwikkel je eigen leiderschapsstijl en leer hoe je vanuit authenticiteit en kracht kunt leiden.",
    nextDate: "20 maart 2026",
    fromPrice: "EUR 245",
    duration: "09:30 - 17:00",
    location: "Castricum",
    audience: "Jonge vrouwelijke professionals (24+)",
    goal: "Je ontdekt je unieke leiderschapskwaliteiten en leert deze bewust in te zetten in je werk en leven.",
    program: [
      "Inzicht in je leiderschapsstijl",
      "Oefeningen rondom authenticiteit en grenzen",
      "Actieplan voor je volgende stap",
    ],
    investment:
      "EUR 245 excl. BTW — inclusief lunch, koffie, thee en werkmateriaal",
    order: 1,
  },
  {
    id: 2,
    title: "Workshop vitaliteit",
    subtitle: "Energie en balans in werk en leven",
    description:
      "Leer hoe je je energie kunt managen en duurzame balans creëert tussen werk en privé.",
    nextDate: "10 april 2026",
    fromPrice: "EUR 215",
    duration: "09:30 - 17:00",
    location: "Castricum",
    audience: "Jonge professionals (24+)",
    goal: "Je krijgt inzicht in je energiebalans en praktische tools om vitaler te leven en werken.",
    program: [
      "Energiemanagement en stressherkenning",
      "Ademwerk en lichaamsgerichte oefeningen",
      "Persoonlijk vitaliteitsplan",
    ],
    investment:
      "EUR 215 excl. BTW — inclusief lunch, koffie, thee en werkmateriaal",
    order: 2,
  },
  {
    id: 3,
    title: "Workshop mentale weerbaarheid",
    subtitle: "Steviger staan in uitdagende situaties",
    description:
      "Versterk je mentale weerbaarheid en leer omgaan met druk, onzekerheid en verandering.",
    nextDate: "24 april 2026",
    fromPrice: "EUR 225",
    duration: "09:30 - 17:00",
    location: "Castricum",
    audience: "Jonge professionals (24+)",
    goal: "Je ontwikkelt mentale veerkracht en leert effectief omgaan met uitdagende situaties.",
    program: [
      "Herkennen van stresspatronen en overtuigingen",
      "Technieken voor mentale veerkracht",
      "Oefeningen voor grenzen stellen",
    ],
    investment:
      "EUR 225 excl. BTW — inclusief lunch, koffie, thee en werkmateriaal",
    order: 3,
  },
  {
    id: 4,
    title: "Workshop persoonlijke effectiviteit",
    subtitle: "Focus en richting in je werk en leven",
    description:
      "Ontdek wat je drijft en leer hoe je effectiever kunt werken vanuit je eigen kracht.",
    nextDate: "8 mei 2026",
    fromPrice: "EUR 235",
    duration: "09:30 - 17:00",
    location: "Castricum",
    audience: "Jonge professionals (24+)",
    goal: "Je krijgt helderheid over je prioriteiten en leert effectiever werken vanuit focus en richting.",
    program: [
      "Inzicht in je drijfveren en waarden",
      "Timemanagement en prioriteiten stellen",
      "Persoonlijk actieplan",
    ],
    investment:
      "EUR 235 excl. BTW — inclusief lunch, koffie, thee en werkmateriaal",
    order: 4,
  },
];

export function useWorkshops() {
  return useWPContent({
    queryKey: ["wp", "workshops"],
    queryFn: fetchWorkshops,
    fallbackData: fallbackWorkshops,
  });
}
