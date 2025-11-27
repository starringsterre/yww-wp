interface HeroSectionProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
}

export default function HeroSection({
  backgroundImage,
  title,
  subtitle,
}: HeroSectionProps) {
  return (
    <section
      className="relative py-32 px-4 md:px-8 flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
