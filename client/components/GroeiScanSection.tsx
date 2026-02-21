import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type AnswerValue = "low" | "medium" | "high";

type QuestionOption = {
  label: string;
  value: AnswerValue;
  weekendWeight: number;
  workshopWeight: number;
};

type Question = {
  id: string;
  label: string;
  options: QuestionOption[];
};

const questions: Question[] = [
  {
    id: "focus_area",
    label: "Waar wil je nu het meeste in groeien?",
    options: [
      { label: "Rust en energie", value: "medium", weekendWeight: 1, workshopWeight: 2 },
      { label: "Leiderschap en zichtbaarheid", value: "high", weekendWeight: 2, workshopWeight: 2 },
      { label: "Richting en diepere keuzes", value: "high", weekendWeight: 3, workshopWeight: 1 },
    ],
  },
  {
    id: "urgency",
    label: "Hoe urgent voelt dit voor je?",
    options: [
      { label: "Ik oriënteer me rustig", value: "low", weekendWeight: 1, workshopWeight: 2 },
      { label: "Ik wil binnen 1-2 maanden bewegen", value: "medium", weekendWeight: 2, workshopWeight: 2 },
      { label: "Ik wil nu echt een doorbraak", value: "high", weekendWeight: 3, workshopWeight: 1 },
    ],
  },
  {
    id: "time_space",
    label: "Welke tijdsinvestering past nu het best?",
    options: [
      { label: "1 dag", value: "low", weekendWeight: 1, workshopWeight: 3 },
      { label: "1-2 dagen", value: "medium", weekendWeight: 2, workshopWeight: 2 },
      { label: "Een volledig weekend", value: "high", weekendWeight: 3, workshopWeight: 1 },
    ],
  },
  {
    id: "group_preference",
    label: "Wat helpt jou het meest in een groep?",
    options: [
      { label: "Korte, praktische sessies", value: "low", weekendWeight: 1, workshopWeight: 3 },
      { label: "Mix van oefenen en reflectie", value: "medium", weekendWeight: 2, workshopWeight: 2 },
      { label: "Diepe verdieping met langdurige focus", value: "high", weekendWeight: 3, workshopWeight: 1 },
    ],
  },
  {
    id: "current_energy",
    label: "Hoe is je energieniveau op dit moment?",
    options: [
      { label: "Best stabiel", value: "low", weekendWeight: 1, workshopWeight: 2 },
      { label: "Wisselend", value: "medium", weekendWeight: 2, workshopWeight: 2 },
      { label: "Ik voel me structureel leeg of onrustig", value: "high", weekendWeight: 3, workshopWeight: 1 },
    ],
  },
  {
    id: "change_goal",
    label: "Waar wil je over 3 maanden staan?",
    options: [
      { label: "Meer praktische handvatten", value: "low", weekendWeight: 1, workshopWeight: 3 },
      { label: "Meer regie en rust", value: "medium", weekendWeight: 2, workshopWeight: 2 },
      { label: "Een duidelijke koerswijziging", value: "high", weekendWeight: 3, workshopWeight: 1 },
    ],
  },
  {
    id: "next_step",
    label: "Wat past het best als eerste stap?",
    options: [
      { label: "Eerst een laagdrempelige kennismaking", value: "low", weekendWeight: 1, workshopWeight: 3 },
      { label: "Ik twijfel nog tussen beide", value: "medium", weekendWeight: 2, workshopWeight: 2 },
      { label: "Ik ben klaar voor een intensiever traject", value: "high", weekendWeight: 3, workshopWeight: 1 },
    ],
  },
  {
    id: "pain_point",
    label: "Wat houdt je op dit moment het meest wakker?",
    options: [
      { label: "Ik twijfel aan mijn richting in werk of leven", value: "high", weekendWeight: 3, workshopWeight: 1 },
      { label: "Ik ben vaak moe of overprikkeld", value: "high", weekendWeight: 2, workshopWeight: 2 },
      { label: "Ik vind grenzen stellen lastig", value: "medium", weekendWeight: 2, workshopWeight: 2 },
      { label: "Ik wil zichtbaarder en steviger leiderschap tonen", value: "medium", weekendWeight: 1, workshopWeight: 3 },
      { label: "Ik wil mijn authenticiteit vinden", value: "high", weekendWeight: 3, workshopWeight: 1 },
      { label: "Iets anders speelt nu het meest", value: "low", weekendWeight: 2, workshopWeight: 2 },
    ],
  },
];

const calendlyKennismakingUrl = "https://calendly.com/youngwisewomen/kennismaking";

export default function GroeiScanSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuestionOption>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const { toast } = useToast();

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  const recommendation = useMemo(() => {
    const selected = Object.values(answers);
    const lowThresholdStart = answers.next_step?.value === "low";
    const weekendScore = selected.reduce((sum, item) => sum + item.weekendWeight, 0);
    const workshopScore = selected.reduce((sum, item) => sum + item.workshopWeight, 0);
    const readinessDelta = weekendScore - workshopScore;
    const introAdvice =
      readinessDelta >= 5
        ? "Je bent klaar voor verdieping. Weekend Training past het best als hoofdroute."
        : "Je profiel past bij een groeipad via dagworkshop naar weekendtraining.";

    return {
      lowThresholdStart,
      weekendScore,
      workshopScore,
      introAdvice,
      pathLabel: "Start met een Dag Workshop als voorproefje en plan daarna de Weekend Training.",
      primaryCta: lowThresholdStart
        ? "/groepstrainingen/ontwikkeling-workshops"
        : "/persoonlijke-ontwikkeling-weekend-training",
      primaryCtaLabel: lowThresholdStart ? "Bekijk Dag Workshops" : "Bekijk Weekend Trainingen",
    };
  }, [answers]);

  const currentQuestion = questions[step];

  const selectOption = (option: QuestionOption) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const submitLead = async () => {
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Vul je naam en e-mail in",
        description: "Dan sturen we je groeiscan-advies en passende data.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/groeiscan/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          answers: questions.map((question) => ({
            questionId: question.id,
            questionLabel: question.label,
            answerLabel: answers[question.id]?.label ?? "",
            answerValue: answers[question.id]?.value ?? "",
          })),
          recommendation: {
            primaryTrack: recommendation.lowThresholdStart ? "dag-workshop" : "weekend-training",
            bridgeTrack: "dag-workshop",
            summary: recommendation.pathLabel,
            weekendScore: recommendation.weekendScore,
            workshopScore: recommendation.workshopScore,
          },
          consent: {
            marketingEmail: true,
            doubleOptIn: true,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Lead submission failed");
      }

      setLeadSubmitted(true);
      toast({
        title: "Dankjewel! Check je inbox.",
        description: "Je ontvangt je advies en passende vervolgstap per e-mail.",
      });
    } catch (_error) {
      toast({
        title: "Versturen lukte niet",
        description: "Probeer het opnieuw of neem contact met ons op.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetScan = () => {
    setStep(0);
    setAnswers({});
    setName("");
    setEmail("");
    setLeadSubmitted(false);
  };

  return (
    <section className="min-h-screen py-10 md:py-12 px-4 md:px-8 bg-[#FBF9F5] flex items-center">
      <div className="w-full max-w-4xl mx-auto">
        <div className="w-full rounded-3xl bg-[#B46555]/25 p-6 md:p-8 border border-[#B46555]/30 min-h-[570px] md:min-h-[590px] flex flex-col text-sm">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
              2-minuten Groeiscan
            </h2>
            <p className="text-gray-700 text-sm md:text-[15px] max-w-2xl mx-auto">
              Ontdek welke route nu het beste past: een dagworkshop als voorproefje en daarna weekend training.
            </p>
          </div>

          {!allAnswered ? (
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 flex flex-col min-h-[390px] md:min-h-[410px]">
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>Vraag {step + 1} van {questions.length}</span>
                  <span>{progressPercent}% voltooid</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-[#B46555] transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-4 min-h-[56px] md:min-h-[64px]">{currentQuestion.label}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 content-start min-h-[124px] md:min-h-[132px]">
                {currentQuestion.options.map((option) => (
                  <button
                    key={`${currentQuestion.id}-${option.label}`}
                    type="button"
                    onClick={() => selectOption(option)}
                    className="text-left text-sm p-4 rounded-xl border border-gray-200 bg-[rgba(184,183,163,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#B46555] hover:bg-[#B46555] hover:text-white"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="mt-auto pt-3">
                <Button
                  variant="outline"
                  onClick={goBack}
                  disabled={step === 0}
                >
                  Vorige vraag
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200">
                <h3 className="text-2xl font-light text-gray-900 mb-2">Jouw uitslag</h3>
                <p className="text-gray-700 text-sm md:text-[15px] mb-2">{recommendation.introAdvice}</p>
                <p className="text-gray-800 text-sm md:text-[15px] font-medium">{recommendation.pathLabel}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to={recommendation.primaryCta}
                    className="inline-block px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-primary transition-all duration-300 hover:scale-105 hover:bg-accent"
                  >
                    {recommendation.primaryCtaLabel}
                  </Link>
                  {recommendation.lowThresholdStart ? (
                    <a
                      href={calendlyKennismakingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-6 py-2.5 rounded-lg text-sm font-medium text-[#1C2826] border border-[#1C2826]/30 bg-white transition-all duration-300 hover:scale-105 hover:border-[#1C2826]"
                    >
                      Plan een vrijblijvende kennismaking in
                    </a>
                  ) : (
                    <Link
                      to="/groepstrainingen/ontwikkeling-workshops"
                      className="inline-block px-6 py-2.5 rounded-lg text-sm font-medium text-[#1C2826] border border-[#1C2826]/30 bg-white transition-all duration-300 hover:scale-105 hover:border-[#1C2826]"
                    >
                      Bekijk Dag Workshops
                    </Link>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200">
                <h4 className="text-xl font-light text-gray-900 mb-3">Ontvang persoonlijk advies, of plan een kennismaking in</h4>
                {!leadSubmitted ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Je naam"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Je e-mailadres"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <p className="text-sm md:text-[15px] text-gray-700 mt-3">
                      Liever direct schakelen?{" "}
                      <a
                        href={calendlyKennismakingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#1C2826] underline underline-offset-2"
                      >
                        Plan een kennismaking
                      </a>
                      .
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <Button onClick={submitLead} disabled={isSubmitting}>
                        {isSubmitting ? "Versturen..." : "Stuur mijn advies"}
                      </Button>
                      <Button variant="outline" onClick={resetScan}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Opnieuw
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="text-sm md:text-[15px] text-gray-700">
                    Gelukt. Je staat op de lijst en ontvangt je advies per e-mail. Wil je sneller schakelen?{" "}
                    <a
                      href={calendlyKennismakingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#1C2826] underline underline-offset-2"
                    >
                      Plan een kennismaking
                    </a>
                    .
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
