import { useState, useEffect, useMemo } from "react";
import type { Event } from "@shared/sanity";

interface EventCalendarProps {
  events?: Event[];
}

const dutchMonthNames = [
  "Januari",
  "Februari",
  "Maart",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Augustus",
  "September",
  "Oktober",
  "November",
  "December",
];

type CalendarCategory = "weekend-training" | "workshop" | "terugkom-dag";

const getCategoryLabel = (category: CalendarCategory) => {
  switch (category) {
    case "weekend-training":
      return "Weekend training";
    case "workshop":
      return "Workshop";
    case "terugkom-dag":
      return "Terugkom dag";
  }
};

const getCategoryDescription = (category: CalendarCategory) => {
  switch (category) {
    case "weekend-training":
      return "2-daagse verdieping met reflectie, praktische tools en persoonlijke groei.";
    case "workshop":
      return "1-daagse sessie met concrete oefeningen die je direct kunt toepassen.";
    case "terugkom-dag":
      return "Terugkommoment om inzichten te verdiepen en elkaar opnieuw te ontmoeten.";
  }
};

const getEventCategory = (event: Event): CalendarCategory => {
  const label = event.label.toLowerCase();

  if (
    event.type === "weekend-training" ||
    event.type === "retreat" ||
    label.includes("weekend")
  ) {
    return "weekend-training";
  }

  if (
    event.type === "terugkom-dag" ||
    event.type === "sunday-gathering" ||
    label.includes("terugkom")
  ) {
    return "terugkom-dag";
  }

  return "workshop";
};

const getEventDateLabel = (event: Event, category: CalendarCategory) => {
  if (event.startDate) {
    const startDate = new Date(event.startDate);
    if (!Number.isNaN(startDate.getTime())) {
      if (event.endDate) {
        const endDate = new Date(event.endDate);
        if (!Number.isNaN(endDate.getTime())) {
          if (
            startDate.getFullYear() === endDate.getFullYear() &&
            startDate.getMonth() === endDate.getMonth()
          ) {
            return `${startDate.getDate()}-${endDate.getDate()}/${startDate.getMonth() + 1}`;
          }
          return `${startDate.getDate()}/${startDate.getMonth() + 1}-${endDate.getDate()}/${endDate.getMonth() + 1}`;
        }
      }
      return `${startDate.getDate()}/${startDate.getMonth() + 1}`;
    }
  }

  // Fallback requested: terugkom dag in februari 2026 is morgen (15/2)
  if (category === "terugkom-dag" && event.year === 2026 && event.month === 2) {
    return "15/2";
  }

  return `${event.month}/${
    String(event.year).slice(-2)
  }`;
};

const getEventColor = (category: CalendarCategory) => {
  switch (category) {
    case "weekend-training":
      return "text-white border-[#6B705C]";
    case "workshop":
      return "text-[#1C2826] border-[#B46555]";
    case "terugkom-dag":
      return "text-white border-[#B46555]";
  }
};

const getEventBgColor = (category: CalendarCategory) => {
  switch (category) {
    case "weekend-training":
      return "rgba(107, 112, 92, 0.85)";
    case "workshop":
      return "rgba(180, 101, 85, 0.25)";
    case "terugkom-dag":
      return "rgba(180, 101, 85, 0.85)";
  }
};

export default function EventCalendar({ events = [] }: EventCalendarProps) {
  const fallbackEvents: Event[] = useMemo(
    () => [
      {
        _id: "fallback-terugkom-2026-02",
        label: "Terugkom dag",
        type: "terugkom-dag",
        year: 2026,
        month: 2,
        startDate: "2026-02-15T09:00:00.000Z",
        description:
          "Terugkomdag om te reflecteren, ervaringen te delen en je volgende stap scherp te maken.",
      },
      {
        _id: "fallback-weekend-2026-10",
        label: "Groep weekend training",
        type: "weekend-training",
        year: 2026,
        month: 6,
        startDate: "2026-06-12T09:00:00.000Z",
        endDate: "2026-06-14T17:00:00.000Z",
        description:
          "Intensieve weekend training met verdieping, groepsreflectie en praktische tools.",
      },
    ],
    [],
  );

  const mergedEvents = useMemo(() => {
    const merged = [...events];

    for (const fallbackEvent of fallbackEvents) {
      const exists = merged.some(
        (event) =>
          event.year === fallbackEvent.year &&
          event.month === fallbackEvent.month &&
          event.label.toLowerCase() === fallbackEvent.label.toLowerCase(),
      );

      if (!exists) {
        merged.push(fallbackEvent);
      }
    }

    return merged;
  }, [events, fallbackEvents]);

  // Get unique years from events for year selector
  const availableYears = Array.from(new Set(mergedEvents.map((e) => e.year))).sort();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(
    availableYears.includes(currentYear)
      ? currentYear
      : availableYears[0] || 2026,
  );
  
  // Update selected year if default year is not available
  useEffect(() => {
    if (availableYears.length > 0 && !availableYears.includes(selectedYear)) {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, selectedYear]);
  
  const yearEvents = mergedEvents.filter((e) => e.year === selectedYear);

  return (
    <section id="event-kalender" className="min-h-screen py-6 px-4 md:px-8 bg-white flex items-center">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <h2 className="text-3xl md:text-4xl font-light text-center text-gray-900 mb-5">
            Event Kalender
          </h2>

          {/* Year Selector */}
          {availableYears.length > 0 && (
            <div className="flex items-center justify-center gap-4 mb-4">
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`text-xl md:text-2xl font-light px-4 py-1.5 rounded-lg transition-colors ${
                    selectedYear === year
                      ? "text-gray-900 border-b-2 border-primary"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {dutchMonthNames.map((monthName, monthIndex) => {
            const monthNumber = monthIndex + 1;
            const monthEventsList = yearEvents.filter(
              (e) => e.month === monthNumber,
            );

            return (
              <div
                key={monthIndex}
                className="bg-gray-50 rounded-lg p-3.5 border border-gray-200"
              >
                <h3 className="text-base font-medium text-gray-900 mb-2.5">
                  {monthName}
                </h3>

                {monthEventsList.length > 0 ? (
                  <div className="space-y-1.5">
                    {monthEventsList.map((event) => (
                      (() => {
                        const category = getEventCategory(event);
                        const categoryLabel = getCategoryLabel(category);
                        const categoryDescription = event.description || getCategoryDescription(category);
                        const dateLabel = getEventDateLabel(event, category);
                        const showSignupCta = category === "weekend-training" || category === "workshop";
                        const signupHref =
                          category === "weekend-training"
                            ? "/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026"
                            : "/groepstrainingen/ontwikkeling-workshops";
                        return (
                          <div
                            key={event._id || `${event.year}-${event.month}-${event.type}`}
                            className={`group relative p-2 rounded border text-xs ${getEventColor(category)}`}
                            style={{ backgroundColor: getEventBgColor(category) }}
                          >
                            <span className="inline-flex mr-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-white/80 text-[#1C2826] font-medium align-middle">
                              {dateLabel}
                            </span>
                            <p className="inline font-semibold align-middle leading-tight">{event.label}</p>

                            <div className="absolute left-0 right-0 -bottom-2 h-2 bg-transparent" />
                            <div className="pointer-events-none absolute left-1/2 top-full z-20 w-64 -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-3 text-[#1C2826] opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
                              <p className="text-sm font-semibold mb-1">{event.label}</p>
                              <p className="text-xs text-gray-600 mb-3">{categoryLabel}</p>
                              <p className="text-sm text-gray-700">{categoryDescription}</p>
                              {showSignupCta && (
                                <a
                                  href={signupHref}
                                  className="inline-block mt-3 px-3 py-1.5 rounded-md text-sm font-medium text-white bg-primary transition-all duration-200 hover:scale-105 hover:bg-accent"
                                >
                                  Meld je aan
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })()
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm italic">Geen events</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap gap-6 justify-center">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "rgba(107, 112, 92, 0.85)" }}
            ></div>
            <span className="text-sm text-gray-700">Weekend training</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "rgba(180, 101, 85, 0.25)" }}
            ></div>
            <span className="text-sm text-gray-700">Workshop</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "rgba(180, 101, 85, 0.85)" }}
            ></div>
            <span className="text-sm text-gray-700">Terugkom dag</span>
          </div>
        </div>
      </div>
    </section>
  );
}
