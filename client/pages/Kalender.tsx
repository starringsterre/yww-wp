import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";

export default function Kalender() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            schedule
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upcoming retreats and events from Young Wise Women
          </p>
        </div>
      </section>

      {/* Yearly Event Calendar */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-4">
            Yearly Event Calendar
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Join our expert-led retreats designed for all levels. Find your
            perfect practice time and enhance your mind-body connection.
          </p>

          {/* Calendar Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button className="px-6 py-2 rounded-full bg-primary text-white">
              All Classes
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
              Personal Growth
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
              Inner Wisdom
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
              Energy & Motivation
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-12 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-2 text-gray-700 font-medium">
                    January
                  </th>
                  <th className="text-left py-4 px-2 text-gray-700 font-medium">
                    February
                  </th>
                  <th className="text-left py-4 px-2 text-gray-700 font-medium">
                    March
                  </th>
                  <th className="text-left py-4 px-2 text-gray-700 font-medium">
                    April
                  </th>
                  <th className="text-left py-4 px-2 text-gray-700 font-medium">
                    May
                  </th>
                  <th className="text-left py-4 px-2 text-gray-700 font-medium">
                    June
                  </th>
                  <th className="text-left py-4 px-2 text-gray-700 font-medium">
                    July
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-2">
                    <span className="block bg-purple-100 text-purple-800 px-3 py-2 rounded text-xs font-medium mb-2">
                      Inner Wisdom
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="block bg-blue-100 text-blue-800 px-3 py-2 rounded text-xs font-medium mb-2">
                      Personal Growth
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="block bg-yellow-100 text-yellow-800 px-3 py-2 rounded text-xs font-medium mb-2">
                      Energy & Motivation
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="block bg-purple-100 text-purple-800 px-3 py-2 rounded text-xs font-medium mb-2">
                      Inner Wisdom
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="block bg-blue-100 text-blue-800 px-3 py-2 rounded text-xs font-medium mb-2">
                      Personal Growth
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="block bg-yellow-100 text-yellow-800 px-3 py-2 rounded text-xs font-medium mb-2">
                      Energy & Motivation
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="block bg-blue-100 text-blue-800 px-3 py-2 rounded text-xs font-medium mb-2">
                      Personal Growth
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Personal Growth</p>
              <p className="text-gray-700">
                Deep practice with focus on personal transformation
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Inner Wisdom</p>
              <p className="text-gray-700">
                Connect with your inner guidance and intuition
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Energy & Motivation</p>
              <p className="text-gray-700">
                Dynamic sessions to boost your energy and drive
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Practical Tools</p>
              <p className="text-gray-700">
                Hands-on techniques you can use in daily life
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Retreat */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-12">
            Upcoming Retreat
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="mb-8">
              <p className="text-sm font-medium text-primary mb-2">
                NEXT EDITION
              </p>
              <h3 className="text-3xl font-light text-gray-900 mb-4">
                Young Wise Women Weekend Retreat
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">
                      17 - 19 October 2025
                    </p>
                    <p className="text-sm text-gray-600">
                      Friday 17:30 - Sunday 17:00
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Beautiful Nature Location, Netherlands
                    </p>
                    <p className="text-sm text-gray-600">
                      Comfortable holiday home setting
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">
                      For Young Professionals 24+
                    </p>
                    <p className="text-sm text-gray-600">
                      Limited spots available
                    </p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary text-white hover:bg-primary/90 py-3"
                asChild
              >
                <a href="https://eepurl.com/h-ZlwT" target="_blank" rel="noopener noreferrer">
                  Book Your Spot
                </a>
              </Button>
            </div>

            {/* Program Overview */}
            <div className="border-t border-gray-200 pt-8">
              <h4 className="font-medium text-gray-900 mb-6">
                Program Overview
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900 mb-2">Day 1</p>
                  <p className="text-sm text-gray-600">
                    Arrival • Introductions • Motivation Factor Insights •
                    Evening Walk • Reflection & Breathing Session
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-2">Day 2</p>
                  <p className="text-sm text-gray-600">
                    Yoga Session • Desires Workshop • Mental Release • 1-on-1
                    Coaching • Evening Bonfire
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-2">Day 3</p>
                  <p className="text-sm text-gray-600">
                    Physical Activity • Release & Manifestation • Closing
                    Ceremony • Departure around 17:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Next Edition Not in Your Calendar?
          </h2>
          <p className="text-gray-600 mb-8">
            We organize new retreats regularly. Subscribe to get notified about
            the next opportunity.
          </p>
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 py-3"
            asChild
          >
            <a href="https://eepurl.com/h-ZlwT" target="_blank" rel="noopener noreferrer">
              Subscribe to Newsletter
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
