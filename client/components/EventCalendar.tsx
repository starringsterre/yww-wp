import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarEvent {
  month: number;
  type: "retreat" | "mini-retreat" | "sunday-gathering" | "creative-event";
  label: string;
}

const events: Record<number, CalendarEvent[]> = {
  2025: [
    { month: 1, type: "retreat", label: "Weekend retreat" },
    { month: 7, type: "mini-retreat", label: "Mini dag retreat" },
    { month: 10, type: "retreat", label: "Weekend retreat" },
    { month: 12, type: "sunday-gathering", label: "Community zondag" },
  ],
  2026: [
    { month: 2, type: "retreat", label: "Weekend retreat" },
    { month: 3, type: "sunday-gathering", label: "Community zondag" },
    { month: 4, type: "retreat", label: "Weekend retreat" },
    { month: 5, type: "creative-event", label: "Community activiteit op open inschrijving" },
    { month: 6, type: "retreat", label: "Weekend retreat" },
    { month: 8, type: "sunday-gathering", label: "Community zondag" },
    { month: 9, type: "retreat", label: "Weekend retreat" },
    { month: 11, type: "retreat", label: "Weekend retreat" },
    { month: 12, type: "sunday-gathering", label: "Community zondag" },
  ],
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

const getEventColor = (type: string) => {
  switch (type) {
    case "retreat":
      return "bg-[#8f9467] text-white border-[#8f9467]";
    case "mini-retreat":
      return "bg-[#cdb3a2] text-gray-900 border-[#cdb3a2]";
    case "sunday-gathering":
      return "bg-[#555d41] text-white border-[#555d41]";
    case "creative-event":
      return "bg-[#c66e48] text-white border-[#c66e48]";
    default:
      return "bg-gray-100 text-gray-900 border-gray-300";
  }
};

export default function EventCalendar() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const yearEvents = events[selectedYear as keyof typeof events] || [];

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-8">
            Event Kalender
          </h2>

          {/* Year Selector */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <button
              onClick={() => setSelectedYear(2025)}
              className={`text-2xl font-light px-6 py-2 rounded-lg transition-colors ${
                selectedYear === 2025
                  ? "text-gray-900 border-b-2 border-primary"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              2025
            </button>
            <button
              onClick={() => setSelectedYear(2026)}
              className={`text-2xl font-light px-6 py-2 rounded-lg transition-colors ${
                selectedYear === 2026
                  ? "text-gray-900 border-b-2 border-primary"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              2026
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dutchMonthNames.map((monthName, monthIndex) => {
            const monthNumber = monthIndex + 1;
            const monthEventsList = yearEvents.filter((e) => e.month === monthNumber);

            return (
              <div
                key={monthIndex}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {monthName}
                </h3>

                {monthEventsList.length > 0 ? (
                  <div className="space-y-2">
                    {monthEventsList.map((event, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded border text-sm font-medium ${getEventColor(
                          event.type
                        )}`}
                      >
                        {event.label}
                      </div>
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
            <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
            <span className="text-sm text-gray-700">Retreat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
            <span className="text-sm text-gray-700">Mini Retreat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span className="text-sm text-gray-700">Sunday Gathering</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
            <span className="text-sm text-gray-700">Creative Event</span>
          </div>
        </div>
      </div>
    </section>
  );
}
