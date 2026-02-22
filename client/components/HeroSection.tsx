interface HeroSectionProps {
  backgroundImage: string;
  backgroundImageAlt?: string;
  backgroundPosition?: string;
  headingTag?: "h1" | "h2";
  title: string;
  subtitle: string;
}

export default function HeroSection({
  backgroundImage,
  backgroundImageAlt,
  backgroundPosition = "center",
  headingTag = "h1",
  title,
  subtitle,
}: HeroSectionProps) {
  const HeadingTag = headingTag;

  return (
    <section
      className="relative py-32 px-4 md:px-8 flex items-center justify-center min-h-screen bg-cover bg-center"
      role={backgroundImageAlt ? "img" : undefined}
      aria-label={backgroundImageAlt}
      style={{
        backgroundImage: `linear-gradient(rgba(28, 40, 38, 0.35), rgba(28, 40, 38, 0.35)), url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition,
      }}
      >
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <HeadingTag className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6">
            {title}
          </HeadingTag>
          <p className="text-lg md:text-xl text-gray-100 mx-auto">
            {subtitle}
          </p>
        </div>
      </section>
  );
}
