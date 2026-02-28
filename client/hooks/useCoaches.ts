import { useWPContent } from "./useWPContent";
import { fetchCoaches } from "@/api/wordpress";
import type { WPCoach } from "@/api/wp-types";

const fallbackCoaches: WPCoach[] = [
  {
    id: 1,
    name: "Ella Taal",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fedaf553c26414cd5af248f8c42bec4bb?format=webp&width=4000",
    bio: "In 2011 is Awareness in Business opgericht door Ella, ontstaan na een management buy-out bij haar vorige organisatie advies kantoor Second Nature. Al ruim 28 jaar heeft zij ervaring als coach, trainer en organisatie adviseur voor diverse opdrachtgevers in zowel binnen- als buitenland. Ze heeft ervaring van het geven van retreats voor o.a. Management teams, DGA's en CEO's. Ella heeft drie dochters van 27, 25 en 22 en wil graag iets terug doen voor de jongere generatie. Bijdragen aan het welzijn van jonge professionals is een passie die ze door het geven van deze retreats naleeft!",
    role: "Founder & Coach",
    order: 1,
  },
  {
    id: 2,
    name: "Liene Molendijk",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F11834262257d4b5287de33d164171bdd?format=webp&width=4000",
    bio: "Liene (1997) heeft een achtergrond in Psychologie en Leiderschap & Verandering en werkt inmiddels drie jaar bij grote organisatieadviesbureaus. Ze begeleidt uiteenlopende verandertrajecten in het publieke domein, van teams die anders willen samenwerken tot individuen die zoeken naar persoonlijke groei. De mens staat altijd centraal in haar werk. Daarnaast verdiepte ze zich in yoga- en meditatiefilosofie, wat ze meeneemt in het retreat. Zelf bevindt ze zich op de grens van Gen Z en Millennial, waardoor ze zich goed kan inleven in de uitdagingen en verlangens van jonge professionals.",
    role: "Coach & Trainer",
    order: 2,
  },
];

export function useCoaches() {
  return useWPContent({
    queryKey: ["wp", "coaches"],
    queryFn: fetchCoaches,
    fallbackData: fallbackCoaches,
  });
}
