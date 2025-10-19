import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  const videoUrl =
    "https://cdn.builder.io/o/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F57a6cd627628468aba1862c033c976da?alt=media&token=7af99d8c-ced3-4c9a-b043-ee4b50c73cc0&apiKey=5a9469c697e2499eab1b2d92d6c4e731";
  const ellaImageUrl =
    "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fedaf553c26414cd5af248f8c42bec4bb?format=webp&width=800";
  const lieneImageUrl =
    "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F11834262257d4b5287de33d164171bdd?format=webp&width=800";

  return (
    <div className="w-full">
      {/* Hero Video Section */}
      <section className="relative w-full h-screen min-h-96 bg-black overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-70"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-light mb-4 max-w-3xl">
            young wise women
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl text-gray-200">
            De community voor jonge wijze vrouwen
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black"
            asChild
          >
            <a href="https://eepurl.com/h-ZlwT" target="_blank" rel="noopener noreferrer">
              Bekijk Retreat
            </a>
          </Button>
        </div>
      </section>

      {/* Atmosphere Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-6 text-gray-900">
            atmosphere
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Young Wise Women is a modern community space where everyone can
            find their perfect practice. We've created a welcoming space with
            professional guidance to help you achieve harmony, strength, and
            flexibility. Our retreat suits all levels—from beginners to advanced
            practitioners.
          </p>

          {/* Three Image Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=600&fit=crop"
                alt="Yoga practice"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=600&fit=crop"
                alt="Wellness meditation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=600&fit=crop"
                alt="Mindfulness"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16 text-gray-900">
            the santosha yoga space
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="text-4xl">🧘</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Certified Instructors
              </h3>
              <p className="text-sm text-gray-600">
                Expert guidance for your practice
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="text-4xl">🌱</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Eco-friendly Materials
              </h3>
              <p className="text-sm text-gray-600">
                Sustainable and natural
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="text-4xl">🎯</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Multiple Styles
              </h3>
              <p className="text-sm text-gray-600">
                Find your perfect practice
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="text-4xl">☕</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Practical Tools
              </h3>
              <p className="text-sm text-gray-600">
                Tea and community space
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900">
              our coaches
            </h2>
            <p className="text-gray-600">
              Experienced and inspiring instructors with years of practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Coach Card 1 - Ella */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={ellaImageUrl}
                  alt="Ella"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-medium text-gray-900 mb-2">
                  Ella
                </h3>
                <p className="text-sm text-gray-600">
                  Certified Vinyasa Flow and meditation instructor
                </p>
              </div>
            </div>

            {/* Coach Card 2 - Liene */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={lieneImageUrl}
                  alt="Liene"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-medium text-gray-900 mb-2">
                  Liene
                </h3>
                <p className="text-sm text-gray-600">
                  Certified Hatha Yoga and stretching instructor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section
        className="py-20 px-4 md:px-8 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=400&fit=crop')`,
        }}
      >
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl font-light text-gray-900 mb-2">
              Stay updated for the next edition
            </h2>
            <p className="text-gray-600 mb-6">
              Subscribe to get notified about our upcoming Young Wise Women
              retreats in 2026.
            </p>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Select preferred month</option>
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90 py-3"
                asChild
              >
                <a href="https://eepurl.com/h-ZlwT" target="_blank" rel="noopener noreferrer">
                  Submit
                </a>
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
