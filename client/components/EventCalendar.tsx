import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarEvent {
  month: number;
  type: "retreat" | "mini-retreat" | "sunday-gathering" | "creative-event";
  label: string;
}

const events: Record<number, CalendarEvent[]> = {
  2025: [
    { month: 1, type: "mini-retreat", label: "Mini retreat" },
    { month: 10, type: "retreat", label: "Weekend retreat" },
    { month: 12, type: "sunday-gathering", label: "Community zondag" },
  ],
  2026: [
    { month: 2, type: "retreat", label: "Weekend retreat" },
    { month: 3, type: "sunday-gathering", label: "Community zondag" },
    { month: 4, type: "retreat", label: "Weekend retreat" },
    {
      month: 5,
      type: "creative-event",
      label: "Community activiteit op open inschrijving",
    },
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
      return "text-white border-[#8f9467]";
    case "mini-retreat":
      return "text-gray-900 border-[#cdb3a2]";
    case "sunday-gathering":
      return "text-white border-[#555d41]";
    case "creative-event":
      return "text-white border-[#504631]";
    default:
      return "text-gray-900 border-gray-300";
  }
};

const getEventBgColor = (type: string) => {
  switch (type) {
    case "retreat":
      return "rgba(143, 148, 103, 0.6)";
    case "mini-retreat":
      return "rgba(205, 179, 162, 0.6)";
    case "sunday-gathering":
      return "rgba(85, 93, 65, 0.6)";
    case "creative-event":
      return "rgba(80, 70, 61, 0.6)";
    default:
      return "rgba(229, 231, 235, 0.6)";
  }
};

export default function EventCalendar() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const yearEvents = events[selectedYear as keyof typeof events] || [];

  return (
    <section className="min-h-screen py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto h-full flex flex-col justify-center">
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
            const monthEventsList = yearEvents.filter(
              (e) => e.month === monthNumber,
            );

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
                          event.type,
                        )}`}
                        style={{ backgroundColor: getEventBgColor(event.type) }}
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
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "rgba(143, 148, 103, 0.6)" }}
            ></div>
            <span className="text-sm text-gray-700">Weekend retreat</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "rgba(205, 179, 162, 0.6)" }}
            ></div>
            <span className="text-sm text-gray-700">Mini dag retreat</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "rgba(85, 93, 65, 0.6)" }}
            ></div>
            <span className="text-sm text-gray-700">Community zondag</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "rgba(80, 70, 61, 0.6)" }}
            ></div>
            <span className="text-sm text-gray-700">
              Community activiteit op open inschrijving
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
