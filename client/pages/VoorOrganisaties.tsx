import { type FormEvent, useState } from "react";

import { usePageContent } from "@/hooks/usePageContent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import HeroSection from "@/components/HeroSection";
import FloatingBrandsSection from "@/components/FloatingBrandsSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BROCHURE_DOWNLOAD_URL = "/brochure-in-company.pdf";
const BROCHURE_DOWNLOAD_FILENAME = "young-wise-women-brochure.pdf";
const CALENDLY_KENNISMAKING_URL = "https://calendly.com/youngwisewomen/kennismaking";

type RoleOption =
  | "hr-people-culture"
  | "learning-development"
  | "directie-founder"
  | "anders";

type BrochureFormData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: RoleOption | "";
};

type FormErrors = Partial<Record<keyof BrochureFormData, string>>;

const initialFormData: BrochureFormData = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  role: "",
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function VoorOrganisaties() {
  const { data: cms } = usePageContent("voor-organisaties");
  const [isBrochureDialogOpen, setIsBrochureDialogOpen] = useState(false);
  const [isKennismakingDialogOpen, setIsKennismakingDialogOpen] = useState(false);
  const [formData, setFormData] = useState<BrochureFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmittingBrochure, setIsSubmittingBrochure] = useState(false);
  const [brochureSubmitError, setBrochureSubmitError] = useState("");

  const updateField = <K extends keyof BrochureFormData>(
    key: K,
    value: BrochureFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      nextErrors.firstName = "Voornaam is verplicht.";
    }
    if (!formData.lastName.trim()) {
      nextErrors.lastName = "Achternaam is verplicht.";
    }
    if (!formData.email.trim()) {
      nextErrors.email = "E-mailadres is verplicht.";
    } else if (!isValidEmail(formData.email)) {
      nextErrors.email = "Vul een geldig e-mailadres in.";
    }
    if (!formData.company.trim()) {
      nextErrors.company = "Bedrijf is verplicht.";
    }

    return nextErrors;
  };

  const handleBrochureDownload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setBrochureSubmitError("");
    setIsSubmittingBrochure(true);

    try {
      const response = await fetch("/api/bedrijfs/brochure-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          role: formData.role || "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit brochure lead");
      }

      const anchor = document.createElement("a");
      anchor.href = BROCHURE_DOWNLOAD_URL;
      anchor.download = BROCHURE_DOWNLOAD_FILENAME;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      setFormData(initialFormData);
      setErrors({});
      setIsBrochureDialogOpen(false);
    } catch (_error) {
      setBrochureSubmitError("Er ging iets mis bij het verzenden. Probeer het opnieuw.");
    } finally {
      setIsSubmittingBrochure(false);
    }
  };

  return (
    <div className="w-full">
      <HeroSection
        backgroundImage="/incompany-training-vrouw.png"
        backgroundImageAlt="incompany ontwikkeling training vrouw"
        backgroundPosition="center top"
        title={cms?.hero_title || "Bedrijfstrajecten"}
        subtitle={cms?.hero_subtitle || "Het Netwerk voor jonge vrouwelijke professionals"}
      />

      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            {cms?.intro_heading || "Jaarprogramma voor jonge vrouwelijke professionals"}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {cms?.intro_text || "We begeleiden groepen jonge vrouwen een jaar lang met een combinatie van 1-op-1 coaching, groepssessies, een dag workshop en een weekend training (intensief). Zo bouwen zij rust, zelfvertrouwen en leiderschap op dat direct impact heeft op werk en welzijn."}
          </p>
        </div>
      </section>

      <FloatingBrandsSection title={cms?.brands_heading || "talent uit deze organisaties ontwikkelde zich via YWW"} />

      <section className="min-h-screen py-20 px-4 md:px-8 bg-gray-50 flex items-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 text-center mb-12">
            {cms?.program_heading || "Wat zit er in het programma"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group p-6 rounded-lg border border-gray-200 bg-[rgba(184,183,163,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:border-[#B46555] hover:bg-[#B46555]">
              <h3 className="text-xl font-medium text-gray-900 mb-3 transition-colors duration-300 group-hover:text-white">
                {cms?.program_1_title || "1-op-1 coaching"}
              </h3>
              <p className="text-gray-700 transition-colors duration-300 group-hover:text-white">
                {cms?.program_1_text || "Persoonlijke begeleiding op thema's als energie, grenzen, loopbaanrichting en persoonlijk leiderschap."}
              </p>
            </div>

            <div className="group p-6 rounded-lg border border-gray-200 bg-[rgba(184,183,163,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:border-[#B46555] hover:bg-[#B46555]">
              <h3 className="text-xl font-medium text-gray-900 mb-3 transition-colors duration-300 group-hover:text-white">
                {cms?.program_2_title || "Groepssessies"}
              </h3>
              <p className="text-gray-700 transition-colors duration-300 group-hover:text-white">
                {cms?.program_2_text || "Interactieve sessies waarin deelnemers van elkaar leren, samen reflecteren en eigenaarschap versterken."}
              </p>
            </div>

            <div className="group p-6 rounded-lg border border-gray-200 bg-[rgba(184,183,163,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:border-[#B46555] hover:bg-[#B46555]">
              <h3 className="text-xl font-medium text-gray-900 mb-3 transition-colors duration-300 group-hover:text-white">
                {cms?.program_3_title || "Dag workshop"}
              </h3>
              <p className="text-gray-700 transition-colors duration-300 group-hover:text-white">
                {cms?.program_3_text || "Een verdiepende dag buiten de dagelijkse werkcontext om focus, rust en richting terug te pakken."}
              </p>
            </div>

            <div className="group p-6 rounded-lg border border-gray-200 bg-[rgba(184,183,163,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:border-[#B46555] hover:bg-[#B46555]">
              <h3 className="text-xl font-medium text-gray-900 mb-3 transition-colors duration-300 group-hover:text-white">
                {cms?.program_4_title || "Weekend training (intensief)"}
              </h3>
              <p className="text-gray-700 transition-colors duration-300 group-hover:text-white">
                {cms?.program_4_text || "Een intensieve meerdaagse ervaring met ruimte voor reflectie, gedragsverandering en duurzame borging van inzichten."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            {cms?.cta_heading || "Interesse in een programma op maat?"}
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            {cms?.cta_text || "We stemmen inhoud, ritme en groepsgrootte af op jullie organisatie."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={isKennismakingDialogOpen} onOpenChange={setIsKennismakingDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary text-white hover:bg-accent hover:scale-105">
                  {cms?.cta_button_1 || "Plan een kennismaking"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl border-0 bg-[#f7f3ea] p-0 shadow-2xl">
                <div className="p-6 sm:p-8">
                  <DialogHeader className="space-y-3 text-left">
                    <DialogTitle className="font-['Lora',Georgia,serif] text-3xl leading-tight text-[#1c2826]">
                      Plan een kennismaking
                    </DialogTitle>
                    <DialogDescription className="text-sm text-[#4f5b58]">
                      Kies direct een moment via Calendly.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-6 space-y-4">
                    <Button size="lg" className="w-full bg-primary text-white hover:bg-accent" asChild>
                      <a
                        href={CALENDLY_KENNISMAKING_URL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open Calendly
                      </a>
                    </Button>

                    <p className="text-center text-sm text-[#4f5b58]">
                      Of bel mij op{" "}
                      <a href="tel:0655334728" className="font-medium text-[#1c2826] underline underline-offset-2">
                        0655334728
                      </a>{" "}
                      (Ella)
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isBrochureDialogOpen} onOpenChange={setIsBrochureDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline">{cms?.cta_button_2 || "Download brochure"}</Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl gap-0 overflow-hidden border-0 bg-[#f7f3ea] p-0 shadow-2xl">
                <div className="grid max-h-[85vh] grid-cols-1 overflow-y-auto md:grid-cols-[1.08fr_0.92fr]">
                  <div className="p-6 sm:p-8 md:p-10">
                    <DialogHeader className="mb-6 space-y-3 text-left">
                      <DialogTitle className="font-['Lora',Georgia,serif] text-3xl leading-tight text-[#1c2826] md:text-4xl">
                        Download onze bedrijfstrajecten brochure
                      </DialogTitle>
                      <DialogDescription className="text-sm text-[#4f5b58]">
                        Vul je gegevens in en download direct de brochure.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleBrochureDownload} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">Voornaam *</Label>
                          <Input
                            id="first-name"
                            value={formData.firstName}
                            onChange={(event) => updateField("firstName", event.target.value)}
                            placeholder="Voornaam"
                            aria-invalid={Boolean(errors.firstName)}
                          />
                          {errors.firstName ? (
                            <p className="text-sm text-red-600">{errors.firstName}</p>
                          ) : null}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Achternaam *</Label>
                          <Input
                            id="last-name"
                            value={formData.lastName}
                            onChange={(event) => updateField("lastName", event.target.value)}
                            placeholder="Achternaam"
                            aria-invalid={Boolean(errors.lastName)}
                          />
                          {errors.lastName ? (
                            <p className="text-sm text-red-600">{errors.lastName}</p>
                          ) : null}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mailadres *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(event) => updateField("email", event.target.value)}
                          placeholder="jij@bedrijf.nl"
                          aria-invalid={Boolean(errors.email)}
                        />
                        {errors.email ? (
                          <p className="text-sm text-red-600">{errors.email}</p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Bedrijf *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(event) => updateField("company", event.target.value)}
                          placeholder="Naam organisatie"
                          aria-invalid={Boolean(errors.company)}
                        />
                        {errors.company ? (
                          <p className="text-sm text-red-600">{errors.company}</p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label>Mijn rol binnen de organisatie is</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) => updateField("role", value as RoleOption)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Maak een keuze (optioneel)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hr-people-culture">HR / People & Culture</SelectItem>
                            <SelectItem value="learning-development">
                              Learning & Development / Talentontwikkeling
                            </SelectItem>
                            <SelectItem value="directie-founder">Directie / Founder</SelectItem>
                            <SelectItem value="anders">Anders</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {brochureSubmitError ? (
                        <p className="text-sm text-red-600">{brochureSubmitError}</p>
                      ) : null}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmittingBrochure}
                        className="mt-2 w-full bg-primary text-white hover:bg-accent"
                      >
                        {isSubmittingBrochure ? "Bezig met verzenden..." : "Download brochure"}
                      </Button>
                    </form>
                  </div>

                  <div className="relative hidden min-h-[380px] md:block">
                    <img loading="lazy"
                      src="/incompany-training-vrouw.png"
                      alt="Young Wise Women bedrijfstrajecten programma"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1c2826]/45 via-transparent to-[#8f7360]/40" />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  );
}
