import HeroSection from "@/components/HeroSection";
import { Link } from "react-router-dom";

export default function Retreats() {
  return (
    <div className="w-full">
      <HeroSection
        backgroundImage="https://images.pexels.com/photos/906097/pexels-photo-906097.jpeg"
        title="Persoonlijke ontwikkeling & groei"
        subtitle="Trainingen en Workshops voor jonge carrière-gedreven vrouwen"
      />

      {/* Sectie 1 */}
      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Persoonlijke Ontwikkeling trainingen & Workshops
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Deze pagina is voor particulieren: jonge vrouwen die willen groeien in energie, richting en zelfvertrouwen via onze workshops en weekend trainingen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <article className="h-full rounded-2xl bg-[#B46555]/25 overflow-hidden flex flex-col">
              <div className="p-6 min-h-[190px] md:min-h-[220px] flex flex-col">
                <Link
                  to="/persoonlijke-ontwikkeling-weekend-training#drie-pijlers"
                  className="relative self-start inline-flex text-3xl font-semibold text-gray-900 mb-3 origin-left after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[#B46555] after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Weekend Trainingen
                </Link>
                <p className="text-gray-700 flex-1">
                  2-daagse weekend intensive in Friesland, gericht op verdieping, reflectie en duurzame gedragsverandering voor deelnemers die bewust tijd willen nemen voor persoonlijke ontwikkeling.
                </p>
                <Link
                  to="/persoonlijke-ontwikkeling-weekend-training#drie-pijlers"
                  className="relative self-start mt-6 inline-flex text-sm font-medium text-[#6B705C] origin-right after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-right after:scale-x-100 after:bg-[#B46555] after:transition-transform after:duration-300 hover:after:scale-x-0"
                >
                  Lees meer
                </Link>
              </div>
              <img loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F25e2fbcf9b2d4e6e939dee29a85f190a?format=webp&width=1800"
                alt="Weekend Trainingen locatie en groepsmoment"
                className="w-full h-56 md:h-64 object-cover"
              />
            </article>

            <article className="h-full rounded-2xl bg-[#B46555]/25 overflow-hidden flex flex-col">
              <div className="p-6 min-h-[190px] md:min-h-[220px] flex flex-col">
                <Link
                  to="/groepstrainingen/ontwikkeling-workshops"
                  className="relative self-start inline-flex text-3xl font-semibold text-gray-900 mb-3 origin-left after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[#B46555] after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Dag Workshops
                </Link>
                <p className="text-gray-700 flex-1">
                  1-daagse workshop waarin je direct werkt aan praktische tools voor energie, focus en richting in werk en leven, toegankelijk en direct toepasbaar in je dagelijks leven.
                </p>
                <Link
                  to="/groepstrainingen/ontwikkeling-workshops"
                  className="relative self-start mt-6 inline-flex text-sm font-medium text-[#6B705C] origin-right after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-right after:scale-x-100 after:bg-[#B46555] after:transition-transform after:duration-300 hover:after:scale-x-0"
                >
                  Lees meer
                </Link>
              </div>
              <img loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fe595860bbcf54834ad2cb6761d7f4bb8?format=webp&width=1800"
                alt="Workshop groep in trainingssetting"
                className="w-full h-56 md:h-64 object-cover"
              />
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
