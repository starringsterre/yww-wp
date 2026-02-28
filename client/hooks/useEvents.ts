import { useWPContent } from "./useWPContent";
import { fetchEvents } from "@/api/wordpress";
import type { WPEvent } from "@/api/wp-types";

const fallbackEvents: WPEvent[] = [
  {
    id: 1,
    label: "Terugkom dag",
    type: "terugkom-dag",
    year: 2026,
    month: 2,
    startDate: "2026-02-15T09:00:00.000Z",
    endDate: "",
    description:
      "Terugkomdag om te reflecteren, ervaringen te delen en je volgende stap scherp te maken.",
    link: "",
  },
  {
    id: 2,
    label: "Groep weekend training",
    type: "weekend-training",
    year: 2026,
    month: 6,
    startDate: "2026-06-24T17:30:00.000Z",
    endDate: "2026-06-26T16:00:00.000Z",
    description:
      "Intensieve weekend training met verdieping, groepsreflectie en praktische tools.",
    link: "",
  },
  {
    id: 3,
    label: "Groep weekend training",
    type: "weekend-training",
    year: 2026,
    month: 10,
    startDate: "2026-10-16T17:30:00.000Z",
    endDate: "2026-10-18T16:00:00.000Z",
    description:
      "Vervolgweekend met verdieping, integratie en praktische tools voor je volgende stap.",
    link: "",
  },
];

export function useEvents() {
  return useWPContent({
    queryKey: ["wp", "events"],
    queryFn: fetchEvents,
    fallbackData: fallbackEvents,
  });
}
