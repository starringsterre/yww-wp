import { FormEvent, useEffect, useMemo, useState } from "react";
import { Send, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

type IntakeQuestion = {
  id: string;
  label: string;
  options: string[];
};

type WidgetState = {
  messages: ChatMessage[];
  userMessageCount: number;
  intakeStep: number;
  intakeAnswers: Record<string, string>;
  profile: {
    name: string;
    email: string;
    completed: boolean;
  };
};

const STORAGE_KEY = "yww_vraagbaak_state_v1";
const calendlyKennismakingUrl = "https://calendly.com/youngwisewomen/kennismaking";
const ellaAvatarUrl =
  "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fedaf553c26414cd5af248f8c42bec4bb?format=webp&width=4000";

const intakeQuestions: IntakeQuestion[] = [
  {
    id: "nu_fase",
    label: "Waar sta je nu het meest in?",
    options: [
      "Ik voel veel druk en weinig rust",
      "Ik twijfel over richting in werk of leven",
      "Ik wil steviger worden in leiderschap",
    ],
  },
  {
    id: "drie_maanden",
    label: "Wat wil je over 3 maanden bereikt hebben?",
    options: [
      "Meer rust en energie",
      "Duidelijke keuzes en focus",
      "Meer zichtbaarheid en regie",
    ],
  },
  {
    id: "vorm",
    label: "Welke vorm past nu het best?",
    options: [
      "Eerst laagdrempelig starten",
      "Direct intensiever verdiepen",
      "Ik wil nog even overleggen",
    ],
  },
  {
    id: "tijdspad",
    label: "Wanneer wil je starten?",
    options: [
      "Binnen 2 weken",
      "Binnen 1-2 maanden",
      "Later dit kwartaal",
    ],
  },
  {
    id: "contact_voorkeur",
    label: "Hoe wil je het liefst vervolgen?",
    options: [
      "Direct een vrijblijvende intake plannen",
      "Eerst nog wat vragen stellen",
      "Ik wil een passende datum kiezen met Ella",
    ],
  },
];

const knowledgeBase = [
  {
    keywords: ["weekend", "weekendtraining", "retreat", "intensief"],
    answer:
      "De Weekend Training is meerdaags en bedoeld voor diepere persoonlijke groei met rust, reflectie en duurzame verandering.",
  },
  {
    keywords: ["dag workshop", "workshop", "1 dag"],
    answer:
      "Dag Workshops zijn praktisch en direct toepasbaar. Veel deelnemers gebruiken dit als sterke eerste stap richting een weekendtraining.",
  },
  {
    keywords: ["prijs", "kosten", "investering"],
    answer:
      "Investering verschilt per programma. Op de pagina's vind je richtprijzen; voor een exacte match met jouw situatie kun je ook direct een intake plannen.",
  },
  {
    keywords: ["datum", "kalender", "wanneer"],
    answer:
      "De eerstvolgende data staan in de eventkalender. Als je wilt, kan ik je ook direct doorsturen naar een vrijblijvende intake met Ella.",
  },
  {
    keywords: ["voor wie", "doelgroep", "geschikt"],
    answer:
      "De trajecten richten zich op jonge vrouwelijke professionals die willen groeien in rust, richting, leiderschap en persoonlijke effectiviteit.",
  },
];

function createAssistantMessage(text: string): ChatMessage {
  return { id: `assistant-${Date.now()}-${Math.random()}`, role: "assistant", text };
}

function createUserMessage(text: string): ChatMessage {
  return { id: `user-${Date.now()}-${Math.random()}`, role: "user", text };
}

function getKnowledgeReply(input: string): string {
  const normalized = input.toLowerCase();
  const match = knowledgeBase.find((item) =>
    item.keywords.some((keyword) => normalized.includes(keyword)),
  );

  if (match) {
    return match.answer;
  }

  return "Ik weet dit niet zeker op basis van onze huidige website-informatie. Stel je vraag iets specifieker, of plan gelijk een intake.";
}

export default function VraagbaakWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    createAssistantMessage(
      "Hoi, ik ben Ella. Stel gerust je vraag. Als je wilt, start ik daarna ook een korte intake van 5 vragen.",
    ),
  ]);
  const [input, setInput] = useState("");
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [intakeStep, setIntakeStep] = useState(0);
  const [intakeStarted, setIntakeStarted] = useState(false);
  const [intakeAnswers, setIntakeAnswers] = useState<Record<string, string>>({});
  const [hasProfile, setHasProfile] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const intakeAnswerList = useMemo(
    () =>
      Object.entries(intakeAnswers).map(([questionId, answer]) => {
        const question = intakeQuestions.find((item) => item.id === questionId);
        return {
          question: question?.label ?? questionId,
          answer,
        };
      }),
    [intakeAnswers],
  );

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as WidgetState;
      if (parsed.messages?.length) {
        setMessages(parsed.messages);
      }
      setUserMessageCount(parsed.userMessageCount ?? 0);
      setIntakeStep(parsed.intakeStep ?? 0);
      setIntakeAnswers(parsed.intakeAnswers ?? {});
      setIntakeStarted((parsed.intakeStep ?? 0) > 0 || Object.keys(parsed.intakeAnswers ?? {}).length > 0);
      setName(parsed.profile?.name ?? "");
      setEmail(parsed.profile?.email ?? "");
      setHasProfile(Boolean(parsed.profile?.completed));
    } catch (_error) {
      // ignore corrupted local storage and continue with defaults
    }
  }, []);

  useEffect(() => {
    const payload: WidgetState = {
      messages,
      userMessageCount,
      intakeStep,
      intakeAnswers,
      profile: {
        name,
        email,
        completed: hasProfile,
      },
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [messages, userMessageCount, intakeStep, intakeAnswers, name, email, hasProfile]);

  const interactionCount = userMessageCount + intakeStep;
  const leadTrigger = interactionCount >= 3;
  const intakeComplete = intakeStep >= intakeQuestions.length;
  const currentIntakeQuestion = intakeQuestions[intakeStep];

  const submitLeadSnapshot = async (
    payload: {
      name: string;
      email: string;
      chatMessages: ChatMessage[];
      intakeAnswers: Array<{ question: string; answer: string }>;
      contactPreference: string;
    },
    options?: { silent?: boolean },
  ) => {
    const response = await fetch("/api/vraagbaak/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Lead submit failed");
    }

    if (!options?.silent) {
      toast({
        title: "Top, je bent gestart",
        description: "Stel je vraag of start direct de intake van 5 vragen.",
      });
    }
  };

  const handleAsk = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    const userMessage = createUserMessage(trimmed);
    const assistantReply = createAssistantMessage(getKnowledgeReply(trimmed));
    const updatedMessages = [...messages, userMessage, assistantReply];
    setMessages(updatedMessages);
    setUserMessageCount((prev) => prev + 1);
    setInput("");

    if (hasProfile) {
      try {
        await submitLeadSnapshot(
          {
            name: name.trim(),
            email: email.trim(),
            chatMessages: updatedMessages,
            intakeAnswers: intakeAnswerList,
            contactPreference: "Eerst nog wat vragen stellen",
          },
          { silent: true },
        );
      } catch (_error) {
        // Keep the chat usable, even when lead syncing fails.
      }
    }
  };

  const startIntake = () => {
    if (intakeStarted) {
      return;
    }
    setIntakeStarted(true);
    setMessages((prev) => [
      ...prev,
      createAssistantMessage(
        "Top, we starten. Ik stel 5 korte vragen. Je kunt elke vraag overslaan.",
      ),
    ]);
  };

  const answerIntake = async (answer: string) => {
    if (!currentIntakeQuestion) {
      return;
    }

    const updatedIntakeAnswers = { ...intakeAnswers, [currentIntakeQuestion.id]: answer };
    setIntakeAnswers(updatedIntakeAnswers);
    setIntakeStep((prev) => prev + 1);
    const updatedMessages = [...messages, createUserMessage(answer)];
    setMessages(updatedMessages);

    if (hasProfile) {
      const updatedIntakeAnswerList = Object.entries(updatedIntakeAnswers).map(([questionId, selected]) => {
        const question = intakeQuestions.find((item) => item.id === questionId);
        return {
          question: question?.label ?? questionId,
          answer: selected,
        };
      });
      try {
        await submitLeadSnapshot(
          {
            name: name.trim(),
            email: email.trim(),
            chatMessages: updatedMessages,
            intakeAnswers: updatedIntakeAnswerList,
            contactPreference: "Passende suggesties per e-mail",
          },
          { silent: true },
        );
      } catch (_error) {
        // Keep intake flow usable when backend sync fails.
      }
    }
  };

  const skipIntakeQuestion = async () => {
    if (!currentIntakeQuestion) {
      return;
    }
    setIntakeStep((prev) => prev + 1);
    const updatedMessages = [...messages, createUserMessage("Overgeslagen")];
    setMessages(updatedMessages);

    if (hasProfile) {
      try {
        await submitLeadSnapshot(
          {
            name: name.trim(),
            email: email.trim(),
            chatMessages: updatedMessages,
            intakeAnswers: intakeAnswerList,
            contactPreference: "Ik wil een passende datum kiezen met Ella",
          },
          { silent: true },
        );
      } catch (_error) {
        // Keep intake flow usable when backend sync fails.
      }
    }
  };

  const submitProfile = async () => {
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Vul je naam en e-mail in",
        description: "Dan kan ik je beter helpen in de vraagbaak.",
        variant: "destructive",
      });
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      toast({
        title: "Gebruik een geldig e-mailadres",
        description: "Controleer je e-mailadres en probeer het opnieuw.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    setHasProfile(true);
    try {
      await submitLeadSnapshot({
        name: trimmedName,
        email: trimmedEmail,
        chatMessages: messages,
        intakeAnswers: intakeAnswerList,
        contactPreference: "vraagbaak-start",
      });
    } catch (_error) {
      toast({
        title: "Start opgeslagen, koppeling lukt nu niet",
        description: "Je kunt gewoon doorgaan in de vraagbaak. We proberen later opnieuw te synchroniseren.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open vraagbaak met Ella"
        className="fixed bottom-4 right-4 z-[66] h-16 w-16 overflow-visible rounded-full shadow-xl transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B46555] focus-visible:ring-offset-2"
      >
        <img
          loading="lazy"
          src={ellaAvatarUrl}
          alt="Ella"
          className="h-full w-full rounded-full border-2 border-white object-cover"
        />
        <span className="absolute -top-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#B46555] text-xs font-semibold text-white">
          1
        </span>
        <span className="sr-only">Vraagbaak met Ella</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 z-[67] w-[calc(100vw-2rem)] max-w-md rounded-2xl border border-[#B46555]/30 bg-[#FBF9F5] shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#B46555]/20 px-4 py-3">
            <div className="flex items-center gap-3">
              <img loading="lazy"
                src={ellaAvatarUrl}
                alt="Ella"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Ella</p>
                <p className="text-xs text-gray-600">Vraagbaak Young Wise Women</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {!hasProfile ? (
            <div className="px-4 py-4 space-y-3">
              <p className="text-sm text-gray-700">
                Voor we starten: wat is je naam en e-mailadres?
              </p>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Je naam"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
              />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Je e-mailadres"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
              />
              <Button onClick={submitProfile} disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Versturen..." : "Start vraagbaak"}
              </Button>
            </div>
          ) : (
            <>
              <div className="max-h-[52vh] overflow-y-auto px-4 py-3 space-y-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[90%] rounded-xl px-3 py-2 text-sm ${
                      message.role === "assistant"
                        ? "bg-white text-gray-800 border border-gray-200"
                        : "ml-auto bg-[#B46555] text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                ))}

                {intakeStarted && !intakeComplete && currentIntakeQuestion && (
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="text-xs text-gray-500 mb-1">
                      Intakevraag {intakeStep + 1} van {intakeQuestions.length}
                    </p>
                    <p className="text-sm font-medium text-gray-900 mb-2">{currentIntakeQuestion.label}</p>
                    <div className="space-y-2">
                      {currentIntakeQuestion.options.map((option) => (
                        <button
                          key={`${currentIntakeQuestion.id}-${option}`}
                          type="button"
                          onClick={() => answerIntake(option)}
                          className="w-full rounded-lg border border-gray-200 bg-[rgba(184,183,163,0.5)] px-3 py-2 text-left text-sm transition-all duration-300 hover:border-[#B46555] hover:bg-[#B46555] hover:text-white"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={skipIntakeQuestion}
                      className="mt-2 text-xs text-gray-600 underline underline-offset-2"
                    >
                      Sla over
                    </button>
                  </div>
                )}

                {intakeComplete && (
                  <div className="rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800">
                    Intake afgerond. Je kunt nu direct plannen met Ella.
                  </div>
                )}
              </div>

              <div className="border-t border-[#B46555]/20 px-4 py-3 space-y-3">
                {!intakeStarted && (
                  <button
                    type="button"
                    onClick={startIntake}
                    className="w-full rounded-lg border border-[#1C2826]/25 bg-white px-3 py-2 text-sm font-medium text-[#1C2826] transition-all duration-300 hover:scale-[1.01] hover:border-[#B46555] hover:text-[#B46555]"
                  >
                    Start intake (5 vragen)
                  </button>
                )}

                <form onSubmit={handleAsk} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Stel je vraag..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                  />
                  <Button type="submit" size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>

                {leadTrigger && (
                  <div className="rounded-xl border border-[#B46555]/30 bg-[#B46555]/10 p-3">
                    <p className="text-sm text-gray-800 mb-2">
                      Ik weet dit niet volledig zeker op basis van de website. Wil je sneller duidelijkheid, of plan gelijk een intake.
                    </p>
                    <a
                      href={calendlyKennismakingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block rounded-lg bg-[#6B705C] px-3 py-2 text-xs font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#B46555]"
                    >
                      Plan vrijblijvende intake
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
